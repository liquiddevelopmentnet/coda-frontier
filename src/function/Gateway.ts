import { ApiResponse, useApi } from './GatewayWrapper'
import { atom, useRecoilValue } from 'recoil'

import SilentSettings from './SilentSettings'
import { tokenState } from '../recoil/atoms'
import { tokenToUUID } from './Utils'

const userState = atom<User | null>({
  key: 'userState',
  default: null,
})

export function useGateway() {
  const wrapper = useApi()
  const token = useRecoilValue(tokenState)

  return {
    ping: async (): Promise<boolean> => {
      const result = await wrapper.make(['Gateway', 'Root'], 'GET', {})
      return result.error === false && result.statusCode === 200
    },
    signUp: async (data: {
      username: string
      email: string
      password: string
      captcha: string
    }): Promise<[boolean, string]> => {
      const result = await wrapper.make(
        ['Gateway', 'SignUp'],
        'POST',
        { username: data.username, email: data.email, password: data.password },
        { 'g-recaptcha-response': data.captcha }
      )

      if (result.error) {
        return [false, result.errorMessage!]
      }

      return [true, result.data]
    },
    login: async (data: {
      username: string
      password: string
    }): Promise<[boolean, string, string, string] | [boolean, string]> => {
      const result = await wrapper.make(['Gateway', 'LogIn'], 'POST', {
        username: data.username,
        password: data.password,
      })

      if (result.error) {
        return [false, result.errorMessage!]
      }

      return [
        true,
        result.data.uuid,
        result.data.refreshToken,
        result.data.authToken,
      ]
    },
    getUser: async (data: {
      uuid: string
    }): Promise<[boolean, User] | [boolean, string]> => {
      return getUser({ wrapper: wrapper, uuid: data.uuid })
    },
    getLocalUser: async (): Promise<[boolean, User] | [boolean, string]> => {
      return getUser({
        wrapper: wrapper,
        uuid: tokenToUUID(token.refresh || ''),
      })
    },
  }
}

const getUser = async (data: {
  wrapper: any
  uuid: string
}): Promise<[boolean, User] | [boolean, string]> => {
  const result: ApiResponse = await data.wrapper.make(
    ['Gateway', 'User'],
    'GET',
    {},
    {},
    {},
    [data.uuid]
  )

  if (result.error) {
    return [false, result.errorMessage!]
  }

  return [true, result.data]
}

export interface User {
  username: string
  uuid: string
  bio: string
  badges: Badge[]
  rating: number
  rank: Rank
  permissions: Permission[]
  email: string
  avatar: string
  friends: string[]
  won: number
  totalPlayed: number
}

export type Badge =
  | 'staff.admin'
  | 'staff.moderator'
  | 'special.friend'
  | 'special.tester'
  | 'general.devil'
  | 'general.patron'
  | 'play.top3'
  | 'play.taskcreator'
  | 'play.codar'

export type Rank = 'SP' | 'S' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'UNRANKED'

export type Permission =
  | 'dev.projectcoda.gateway.user'
  | 'dev.projectcoda.gateway.moderator'
  | 'dev.projectcoda.gateway.admin'

/*
 * Copyright Project Coda, LLC, 2022.
 * All rights reserved.
 */

import {
  flashState,
  rootViewState,
  taskbarState,
  tokenState,
} from '../recoil/atoms'
import { useEffect, useRef, useState } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'

import ClassicPanel from '../components/ClassicPanel'
import CommonButton from '../components/CommonButton'
import CommonInput from '../components/CommonInput'
import Dashboard from './Dashboard'
import HintWithLinkAfter from '../components/HintWithLinkAfter'
import SignUp from './SignUp'
import SilentSettings from '../function/SilentSettings'
import logo from '../assets/images/logo.svg'
import { useDiscordRpc } from '../function/DiscordRpc'
import { useGateway } from '../function/Gateway'
import { useTranslations } from '../i18n/i18n'

function LogIn({ signUpReferred = false }: { signUpReferred?: boolean }) {
  const t = useTranslations()

  const username = useRef<HTMLInputElement>(null)
  const password = useRef<HTMLInputElement>(null)

  const [usernameError, setUsernameError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const [error, setError] = useState('')

  const [flash, setFlash] = useRecoilState(flashState)
  const setRootView = useSetRecoilState(rootViewState)

  const [loggingIn, setLoggingIn] = useState(false)

  const gateway = useGateway()
  const setToken = useSetRecoilState(tokenState)
  const setTaskbar = useSetRecoilState(taskbarState)

  const drpc = useDiscordRpc()

  useEffect(() => {
    ;(async () => {
      drpc('Start', '')
    })()
    if (signUpReferred) {
      setTimeout(() => {
        setFlash(false)
        setTaskbar(true)
      }, 1000)
    }
  }, [])

  return (
    <div className='w-full h-full flex select-none font-mono'>
      <ClassicPanel error={error}>
        <img src={logo} className='w-12 mb-6 my-4' alt='logo' />
        <div className='text-center'>
          <p className='text-black text-3xl font-bold mb-1'>
            {t('LogIn.Title')}
          </p>
          <p className='text-gray-800 text-base mb-12'>{t('LogIn.Subtitle')}</p>
        </div>
        <CommonInput
          type='text'
          placeholder={t('LogIn.Username')}
          ref={username}
          error={usernameError}
          aborter={() => {
            setUsernameError('')
          }}
        />
        <div className='mb-5' />
        <CommonInput
          type='password'
          placeholder={t('LogIn.Password')}
          ref={password}
          error={passwordError}
          aborter={() => {
            setPasswordError('')
          }}
        />
        <div className='mb-16' />
        <CommonButton
          type='primary'
          label={t('LogIn.SubmitButton')}
          dominant
          loading={loggingIn}
          onClick={async () => {
            if (loggingIn) return
            var exec = true
            if (username.current?.value.trim() === '') {
              setUsernameError(t('General.FormFieldEmptyError'))
              exec = false
            }
            if (password.current?.value.trim() === '') {
              setPasswordError(t('General.FormFieldEmptyError'))
              exec = false
            }
            if (
              !exec ||
              username.current == undefined ||
              password.current == undefined
            )
              return

            setLoggingIn(true)
            setError('')

            const loginResult = await gateway.login({
              username: username.current.value,
              password: password.current.value,
            })

            if (loginResult[0] == false) {
              setError(t(loginResult[1]))
              setLoggingIn(false)
              return
            }

            const userDetails = await gateway.getUser({
              uuid: loginResult[1],
            })

            if (userDetails[0] == false) {
              setError('Failed to get user details.')
              setLoggingIn(false)
              return
            }

            console.log(loginResult)
            console.log(userDetails)

            SilentSettings.set('refreshToken', loginResult[2])
            SilentSettings.set('accessToken', loginResult[3])

            setToken({
              refresh: loginResult[2]!,
              access: loginResult[3]!,
            })

            setLoggingIn(false)
            setFlash(true)
            setTimeout(() => {
              setRootView(<Dashboard finishFlash />)
            }, 1000)
          }}
        />
        <div className='mb-6' />
        <HintWithLinkAfter
          hint={t('LogIn.Hint')}
          linkText={t('LogIn.HintLink')}
          onClick={() => {
            setFlash(true)
            setTaskbar(false)
            setTimeout(() => {
              setRootView(<SignUp loginReferred />)
            }, 1000)
          }}
        />
      </ClassicPanel>
    </div>
  )
}

export default LogIn

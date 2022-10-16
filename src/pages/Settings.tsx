import React, { useEffect, useState } from 'react'
import { User, useGateway } from '../function/Gateway'
import { atom, useRecoilState, useSetRecoilState } from 'recoil'
import {
  rootViewState,
  settingsWindowState,
  showRootContentState,
  tokenState,
} from '../recoil/atoms'

import AdvancedSettings from './settings/tabs/appSettings/AdvancedSettings'
import AppearanceSettings from './settings/tabs/appSettings/AppearanceSettings'
import { CgClose } from 'react-icons/cg'
import ConnectionsSettings from './settings/tabs/userSettings/ConnectionsSettings'
import DeveloperOptions from './settings/tabs/DeveloperOptions'
import { FaDiscord } from 'react-icons/fa'
import FriendRequestsSettings from './settings/tabs/userSettings/FriendRequestsSettings'
import { IoLogOut } from 'react-icons/io5'
import LanguageSettings from './settings/tabs/appSettings/LanguageSettings'
import Licenses from './settings/tabs/Licenses'
import LogIn from './LogIn'
import ProfileSettings from './settings/tabs/userSettings/ProfileSettings'
import SecuritySettings from './settings/tabs/userSettings/SecuritySettings'
import SilentSettings from '../function/SilentSettings'
import SoundSettings from './settings/tabs/appSettings/SoundSettings'
import { codaToast } from '../function/Toaster'
import { invoke } from '@tauri-apps/api/tauri'
import { useLinkOpener } from '../function/LinkOpener'
import { useTranslations } from '../i18n/i18n'
import version from '../data/version.json'

declare const window: any

const activeTabState = atom<{ id: string; node: React.ReactNode }>({
  key: 'activeTabState',
  default: { id: 'profile', node: <ProfileSettings /> },
})

export const settingsUserState = atom<User | null>({
  key: 'settingsUserState',
  default: null,
})

function Settings() {
  const t = useTranslations()
  const linkOpener = useLinkOpener()

  const [user, setUser] = useRecoilState(settingsUserState)

  const setSettingsWindow = useSetRecoilState(settingsWindowState)
  const setShowRootContent = useSetRecoilState(showRootContentState)
  const [activeTab, setActiveTab] = useRecoilState(activeTabState)
  const setRootView = useSetRecoilState(rootViewState)
  const [token, setToken] = useRecoilState(tokenState)
  const [discord, setDiscord] = useState<DiscordMeta | undefined>(undefined)

  const gw = useGateway()

  useEffect(() => {
    ;(async () => {
      const result = await gw.getLocalUser()
      if (result[0] == false) {
        codaToast({ message: result[1] as string, type: 'error' })
      }
      setUser(result[1] as User)
    })()

    invoke('get_discord_user').then(result => {
      if (result != 'null') {
        setDiscord(JSON.parse(result as string))
      }
    })

    window.onkeydown = (e: any) => {
      if (e.key === 'Escape') {
        setSettingsWindow(false)
        setShowRootContent(true)
      }
    }

    return () => {
      window.onkeydown = null
    }
  }, [])

  return (
    <div
      className={`w-full h-full absolute left-0 z-30 bg-transparent ${
        window.__TAURI__ ? 'top-[22px]' : 'top-0'
      }`}
    >
      <div className='flex w-full h-full'>
        <div className='flex flex-col min-w-min p-4 bg-gradient-to-r from-[#1e293b] via-[#1e293bf1] to-[#1e293be2]'>
          <SettingsTabGroup title={t('Settings.UserSettings')}>
            <SettingsTab
              id='profile'
              name={t('Settings.UserSettings.Profile')}
              target={<ProfileSettings />}
            />
            <SettingsTab
              id='security'
              name={t('Settings.UserSettings.Security')}
              target={<SecuritySettings />}
            />
            <SettingsTab
              id='connections'
              name={t('Settings.UserSettings.Connections')}
              target={<ConnectionsSettings />}
            />
            <SettingsTab
              id='friend_requests'
              name={t('Settings.UserSettings.FriendRequests')}
              target={<FriendRequestsSettings />}
            />
          </SettingsTabGroup>
          <SettingsTabGroup title={t('Settings.AppSettings')}>
            <SettingsTab
              id='appearance'
              name={t('Settings.AppSettings.Appearance')}
              target={<AppearanceSettings />}
            />
            <SettingsTab id='sound' name='Sound' target={<SoundSettings />} />
            <SettingsTab
              id='language'
              name={t('Settings.AppSettings.Language')}
              target={<LanguageSettings />}
            />
            <SettingsTab
              id='advanced'
              name={t('Settings.AppSettings.Advanced')}
              target={<AdvancedSettings />}
            />
          </SettingsTabGroup>
          {user?.permissions.includes('dev.projectcoda.gateway.admin') && (
            <SettingsTabGroup title={null}>
              <SettingsTab
                id='dev'
                name='Developer Options'
                target={<DeveloperOptions />}
              />
            </SettingsTabGroup>
          )}
          {token.access != null && token.refresh != null && (
            <SettingsTabGroup title={null}>
              <SettingsTab
                id='logout'
                name={t('Settings.LogOut')}
                icon={<IoLogOut color='white' size={20} />}
                customAction={() => {
                  SilentSettings.set('refreshToken', undefined)
                  SilentSettings.set('accessToken', undefined)

                  setToken({
                    refresh: null,
                    access: null,
                  })

                  setSettingsWindow(false)
                  setShowRootContent(true)
                  setRootView(<LogIn />)
                  codaToast({ type: 'success', message: 'Logged out' })
                }}
              />
            </SettingsTabGroup>
          )}
          <div className='flex mt-3'>
            <FaDiscord
              color='white'
              size={20}
              className='cursor-pointer hover:opacity-80'
              onClick={() => {
                linkOpener.open('https://discord.gg/KvVJ2PJsjj')
              }}
            />
          </div>
          <p className='text-xxs text-gray-500 mt-3'>{`coda (${version.stage}) ${version.id} (${version.rev})`}</p>
          <p className='text-xxs text-gray-500 mt-1'>{`discord: ${discord?.username}#${discord?.discriminator}`}</p>
          <p
            onClick={() => {
              setActiveTab({ id: 'osl', node: <Licenses /> })
            }}
            className='text-xxs text-gray-500 hover:text-gray-600 mt-1 cursor-pointer select-none underline'
          >{`open source licenses`}</p>
        </div>
        <div className='w-full h-full'>
          <div className='w-full h-[94%] bg-[#1e293be2] p-6 pb-24 overflow-y-auto custom-scrollbar select-none'>
            <div className='mr-24'>{activeTab.node}</div>
          </div>
          <div className='w-full h-[6%] bg-[#1e293be2] flex justify-end items-center' />
        </div>
        <div className='w-16 bg-[#1e293be2] p-4'>
          <CgClose
            color='white'
            size={25}
            className='cursor-pointer hover:opacity-80'
            onClick={() => {
              setSettingsWindow(false)
              setShowRootContent(true)
            }}
          />
        </div>
      </div>
    </div>
  )
}

const SettingsTabGroup = (props: {
  title: string | null
  children: React.ReactNode
}) => {
  return (
    <div className={`mb-2 select-none ${props.title != null && 'mt-3'}`}>
      <div className='mb-2'>
        {props.title != null && (
          <div className='text-gray-400 font-bold text-xs-c mb-2 ml-3 uppercase'>
            {props.title}
          </div>
        )}
        <div className='w-full h-full flex flex-col space-y-1'>
          {props.children}
        </div>
      </div>
      <div className='w-full h-[1px] bg-gray-700' />
    </div>
  )
}

const SettingsTab = (props: {
  id: string
  name: string
  target?: React.ReactNode | undefined
  icon?: React.ReactNode | undefined
  customAction?: () => void
}) => {
  const [activeTab, setActiveTab] = useRecoilState(activeTabState)
  return (
    <div
      className={`bg-gradient-to-r to-transparent ${
        activeTab.id == props.id
          ? 'from-gray-900'
          : 'from-transparent hover:from-[#111827b3] cursor-pointer'
      } h-8 w-52 rounded-[4px] items-center px-3 flex justify-between`}
      onClick={() => {
        if (props.customAction == undefined)
          setActiveTab({ id: props.id, node: props.target ?? <></> })
        else props.customAction()
      }}
    >
      <p className='my-auto text-gray-200 text-sm'>{props.name}</p>
      {props.icon != undefined && <>{props.icon}</>}
    </div>
  )
}

export default Settings

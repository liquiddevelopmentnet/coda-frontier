import React, { useEffect } from 'react'
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { electronState, settingsWindowState } from '../recoil/atoms'

import AdvancedSettings from './settings/tabs/appSettings/AdvancedSettings'
import AppearanceSettings from './settings/tabs/appSettings/AppearanceSettings'
import { CgClose } from 'react-icons/cg'
import ConnectionsSettings from './settings/tabs/userSettings/ConnectionsSettings'
import { FaDiscord } from 'react-icons/fa'
import FriendRequestsSettings from './settings/tabs/userSettings/FriendRequestsSettings'
import { IoLogOut } from 'react-icons/io5'
import ProfileSettings from './settings/tabs/userSettings/ProfileSettings'
import SecuritySettings from './settings/tabs/userSettings/SecuritySettings'
import SoundSettings from './settings/tabs/appSettings/SoundSettings'
import { useLinkOpener } from '../function/LinkOpener'
import version from '../data/version.json'

const activeTabState = atom<{ id: string; node: React.ReactNode }>({
  key: 'activeTabState',
  default: { id: 'profile', node: <ProfileSettings /> },
})

function Settings() {
  const linkOpener = useLinkOpener()

  const setSettingsWindow = useSetRecoilState(settingsWindowState)
  const electron = useRecoilValue(electronState)
  const activeTab = useRecoilValue(activeTabState)

  useEffect(() => {
    window.onkeydown = e => {
      if (e.key === 'Escape') {
        setSettingsWindow(false)
      }
    }

    return () => {
      window.onkeydown = null
    }
  }, [])

  return (
    <div
      className={`w-full h-full z-30 bg-transparent ${
        electron.is && 'mt-[0px]'
      }`}
    >
      <div className='flex w-full h-full'>
        <div className='flex flex-col min-w-min p-4 bg-gradient-to-r from-[#1e293b] via-[#1e293bf1] to-[#1e293be2]'>
          <SettingsTabGroup title='user settings'>
            <SettingsTab
              id='profile'
              name='Profile'
              target={<ProfileSettings />}
            />
            <SettingsTab
              id='security'
              name='Security'
              target={<SecuritySettings />}
            />
            <SettingsTab
              id='connections'
              name='Connections'
              target={<ConnectionsSettings />}
            />
            <SettingsTab
              id='friend_requests'
              name='Friend Requests'
              target={<FriendRequestsSettings />}
            />
          </SettingsTabGroup>
          <SettingsTabGroup title='app settings'>
            <SettingsTab
              id='appearance'
              name='Appearance'
              target={<AppearanceSettings />}
            />
            <SettingsTab id='sound' name='Sound' target={<SoundSettings />} />
            <SettingsTab
              id='advanced'
              name='Advanced'
              target={<AdvancedSettings />}
            />
          </SettingsTabGroup>
          <SettingsTabGroup title={null}>
            <SettingsTab
              id='logout'
              name='Logout'
              icon={<IoLogOut color='white' size={20} />}
              customAction={() => {
                console.log('logout')
              }}
            />
          </SettingsTabGroup>
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
        </div>
        <div className='w-full h-full bg-[#1e293be2] p-6 pb-24 overflow-y-auto custom-scrollbar'>
          <div className='mr-24'>{activeTab.node}</div>
        </div>
        <div className='w-16 bg-[#1e293be2] p-4'>
          <CgClose
            color='white'
            size={25}
            className='cursor-pointer hover:opacity-80'
            onClick={() => {
              setSettingsWindow(false)
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

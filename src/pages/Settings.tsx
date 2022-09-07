import { atom, useRecoilState, useSetRecoilState } from 'recoil'

import { CgClose } from 'react-icons/cg'
import { FaDiscord } from 'react-icons/fa'
import { IoLogOut } from 'react-icons/io5'
import { settingsWindowState } from '../recoil/atoms'
import { useEffect } from 'react'
import { useLinkOpener } from '../function/LinkOpener'
import version from '../data/version.json'

const activeTabState = atom({
  key: 'activeTabState',
  default: 'profile',
})

function Settings() {
  const linkOpener = useLinkOpener()

  const setSettingsWindow = useSetRecoilState(settingsWindowState)

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
    <div className='w-full h-full absolute top-0 left-0 mt-[22px] z-30 bg-transparent'>
      <CgClose
        color='white'
        size={25}
        className='cursor-pointer hover:opacity-80 absolute right-4 top-4'
        onClick={() => {
          setSettingsWindow(false)
        }}
      />
      <div className='flex w-full h-full'>
        <div className='flex flex-col min-w-min p-4 bg-[#1e293bec]'>
          <SettingsTabGroup title='user settings'>
            <SettingsTab id='profile' name='Profile' />
            <SettingsTab id='security' name='Security' />
            <SettingsTab id='connections' name='Connections' />
            <SettingsTab id='friend_requests' name='Friend Requests' />
          </SettingsTabGroup>
          <SettingsTabGroup title='app settings'>
            <SettingsTab id='appearance' name='Appearance' />
            <SettingsTab id='sound' name='Sound' />
            <SettingsTab id='advanced' name='Advanced' />
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
        <div className='w-full h-full bg-[#1e293be2]'>
          {/* TODO: Tab content */}
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
  icon?: React.ReactNode | undefined
  customAction?: () => void
}) => {
  const [activeTab, setActiveTab] = useRecoilState(activeTabState)
  return (
    <div
      className={`bg-gradient-to-r to-transparent ${
        activeTab == props.id
          ? 'from-gray-900'
          : 'from-transparent hover:from-[#111827b3] cursor-pointer'
      } h-8 w-52 rounded-[4px] items-center px-3 flex justify-between`}
      onClick={() => {
        if (props.customAction == undefined) setActiveTab(props.id)
        else props.customAction()
      }}
    >
      <p className='my-auto text-gray-200 text-sm'>{props.name}</p>
      {props.icon != undefined && <>{props.icon}</>}
    </div>
  )
}

export default Settings

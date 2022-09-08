/*
 * Copyright Project Coda, LLC, 2022.
 * All rights reserved.
 */

import '../transitions.css'

import {
  electronState,
  flashState,
  rootViewState,
  settingsState,
  settingsWindowState,
  showRootContentState,
  taskbarState,
  tokenState,
} from '../recoil/atoms'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import BackgroundWrapper from '../common/BackgroundWrapper'
import { CSSTransition } from 'react-transition-group'
import DesktopHeader from '../components/DesktopHeader'
import NoBackgroundReplacement from '../common/NoBackgroundReplacement'
import Settings from './Settings'
import SilentSettings from '../function/SilentSettings'
import Taskbar from '../components/Taskbar'
import { useApi } from '../function/ApiWrapper'
import { useEffect } from 'react'
import { useSafeSettings } from './settings/SafeSettingsHook'
import { useSettings } from './settings/Settings'

const Root = () => {
  const settingsController = useSettings()

  const settings = useSafeSettings()

  const setElectron = useSetRecoilState(electronState)
  const [token, setToken] = useRecoilState(tokenState)
  const [rootView, setRootView] = useRecoilState(rootViewState)
  const taskbar = useRecoilValue(taskbarState)
  const settingsWindow = useRecoilValue(settingsWindowState)
  const showRootContent = useRecoilValue(showRootContentState)
  const flash = useRecoilValue(flashState)

  const api = useApi()

  useEffect(() => {
    settingsController.init()

    SilentSettings.conf('refreshToken', null)
    SilentSettings.conf('accessToken', null)

    /*const refreshTokenPresent = SilentSettings.present('refreshToken')

    if (refreshTokenPresent) {
      setRootView(<LogIn />) // xTODO: Change to game mode selection

      api
        .make(
          ['Gateway', 'Validate'],
          'POST',
          { token: SilentSettings.get('refreshToken') },
          err => {}
        )
        .then(res => {
          if (res.error) {
          } else if (res.data.valid) {
            console.log(res.data.type + ' validated')
          } else {
            SilentSettings.set('refreshToken', null)
            console.log('refresh token expired')
            // x! TODO - let the user log in again
          }
        })

      api
        .make(
          ['Gateway', 'Validate'],
          'POST',
          { token: SilentSettings.get('accessToken') },
          err => {}
        )
        .then(res => {
          if (res.error) {
          } else if (res.data.valid) {
            console.log(res.data.type + ' validated')
          } else {
            SilentSettings.set('accessToken', null)

            console.log('access token expired')

            api
              .make(
                ['Gateway', 'Refresh'],
                'POST',
                { refreshToken: SilentSettings.get('refreshToken') },
                err => {
                  // x! TODO - let the user log in again
                }
              )
              .then(res => {
                console.log('access token refreshed')
                console.log(res.data.authToken)
                SilentSettings.set('accessToken', res.data.authToken)
              })
          }
        })

      setToken({
        refresh: SilentSettings.get('refreshToken'),
        access: SilentSettings.get('accessToken'),
      })
    }*/

    const isElectron = window.require !== undefined
    if (isElectron) {
      setElectron({
        is: isElectron,
        ipc: window.require('electron').ipcRenderer,
      })
    }
  }, [])

  return (
    <div className='w-screen h-screen overflow-hidden'>
      <DesktopHeader />
      <CSSTransition
        classNames={'l-opacity'}
        timeout={500}
        in={flash}
        unmountOnExit
      >
        <div className='bg-white w-full h-full absolute pointer-events-none z-30' />
      </CSSTransition>
      {settings('appearance.backgroundImages', true) ? (
        <BackgroundWrapper />
      ) : (
        <NoBackgroundReplacement />
      )}
      <div className='w-full h-full'>
        <CSSTransition
          classNames={'simple-popup'}
          timeout={200}
          in={settingsWindow}
          unmountOnExit
        >
          <Settings />
        </CSSTransition>
        <CSSTransition
          classNames={'s-opacity'}
          timeout={200}
          in={showRootContent}
          unmountOnExit
        >
          <div className='w-full h-full'>{rootView}</div>
        </CSSTransition>
        <CSSTransition
          classNames={'l-opacity'}
          timeout={500}
          in={taskbar}
          unmountOnExit
        >
          <Taskbar />
        </CSSTransition>
      </div>
    </div>
  )
}

export default Root

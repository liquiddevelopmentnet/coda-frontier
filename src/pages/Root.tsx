/*
 * Copyright Project Coda, LLC, 2022.
 * All rights reserved.
 */

import '../transitions.css'

import {
  electronState,
  rootViewState,
  settingsWindowState,
  taskbarState,
  tokenState,
} from '../recoil/atoms'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import { CSSTransition } from 'react-transition-group'
import DesktopHeader from '../components/DesktopHeader'
import LogIn from './LogIn'
import React from 'react'
import Settings from './Settings'
import SilentSettings from '../function/SilentSettings'
import Taskbar from '../components/Taskbar'
import { useApi } from '../function/ApiWrapper'

const Root = () => {
  const setElectron = useSetRecoilState(electronState)
  const [token, setToken] = useRecoilState(tokenState)
  const [rootView, setRootView] = useRecoilState(rootViewState)
  const taskbar = useRecoilValue(taskbarState)
  const settingsWindow = useRecoilValue(settingsWindowState)

  const api = useApi()

  React.useEffect(() => {
    SilentSettings.conf('refreshToken', null)
    SilentSettings.conf('accessToken', null)

    const refreshTokenPresent = SilentSettings.present('refreshToken')

    if (refreshTokenPresent) {
      setRootView(<LogIn />) // TODO: Change to game mode selection

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
            // ! TODO - let the user log in again
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
                  // ! TODO - let the user log in again
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
    }

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
      <div className='w-full h-full'>
        <CSSTransition
          classNames={'simple-popup'}
          timeout={500}
          in={settingsWindow}
          unmountOnExit
        >
          <Settings />
        </CSSTransition>
        {rootView}
        <CSSTransition
          classNames={'simple-opacity'}
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

/*
 * Copyright Project Coda, LLC, 2022.
 * All rights reserved.
 */

import '../transitions.css'

import {
  electronState,
  rootViewState,
  taskbarState,
  tokenState,
} from '../recoil/atoms'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import { CSSTransition } from 'react-transition-group'
import DesktopHeader from '../components/DesktopHeader'
import React from 'react'
import SilentSettings from '../function/SilentSettings'
import Taskbar from '../components/Taskbar'
import { useApi } from '../function/ApiWrapper'

const Root = () => {
  const setElectron = useSetRecoilState(electronState)
  const [token, setToken] = useRecoilState(tokenState)
  const rootView = useRecoilValue(rootViewState)
  const taskbar = useRecoilValue(taskbarState)

  const api = useApi()

  React.useEffect(() => {
    SilentSettings.conf('refreshToken', null)
    SilentSettings.conf('accessToken', null)

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
  )
}

export default Root

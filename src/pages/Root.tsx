/*
 * Copyright github.com/liquiddevelopmentnet, 2022.
 * All rights reserved. Do not distribute without permission.
 */

import '../transitions.css'

import {
  flashState,
  rootViewState,
  settingsWindowState,
  showRootContentState,
  taskbarState,
  tokenState,
} from '../recoil/atoms'
import { useRecoilState, useRecoilValue } from 'recoil'

import BackgroundWrapper from '../common/BackgroundWrapper'
import { CSSTransition } from 'react-transition-group'
import NoBackgroundReplacement from '../common/NoBackgroundReplacement'
import Settings from './Settings'
import Taskbar from '../components/Taskbar'
import { useApi } from '../function/GatewayWrapper'
import { useEffect } from 'react'
import { useSafeSettings } from './settings/SafeSettingsHook'

const Root = () => {
  const settings = useSafeSettings()

  const [token, setToken] = useRecoilState(tokenState)
  const [rootView, setRootView] = useRecoilState(rootViewState)
  const taskbar = useRecoilValue(taskbarState)
  const settingsWindow = useRecoilValue(settingsWindowState)
  const showRootContent = useRecoilValue(showRootContentState)
  const flash = useRecoilValue(flashState)

  const api = useApi()

  useEffect(() => {
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
  }, [])

  return (
    <div className='w-screen h-screen overflow-hidden'>
      <CSSTransition
        classNames={'l-opacity'}
        timeout={500}
        in={flash}
        unmountOnExit
      >
        <div className='bg-white w-full h-full absolute z-30' />
      </CSSTransition>
      <NoBackgroundReplacement />
      <CSSTransition
        classNames={'l-opacity'}
        timeout={500}
        in={settings('appearance.backgroundImages', true)}
        mountOnEnter
      >
        <BackgroundWrapper />
      </CSSTransition>
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
          mountOnEnter
        >
          <div className='w-full h-full'>{rootView}</div>
        </CSSTransition>
        <CSSTransition
          classNames={'l-opacity'}
          timeout={500}
          in={taskbar}
          mountOnEnter
        >
          <Taskbar />
        </CSSTransition>
      </div>
    </div>
  )
}

export default Root

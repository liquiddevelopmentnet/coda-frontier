/*
 * Copyright Project Coda, LLC, 2022.
 * All rights reserved.
 */

import DesktopHeader from '../components/DesktopHeader'
import LogIn from './LogIn'
import React from 'react'
import Taskbar from '../components/Taskbar'
import { electronState } from '../recoil/atoms'
import { useSetRecoilState } from 'recoil'

const Root = () => {
  const setElectron = useSetRecoilState(electronState)

  React.useEffect(() => {
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
      <LogIn />
      <Taskbar />
    </div>
  )
}

export default Root

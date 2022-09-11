import { useEffect, useState } from 'react'

import DesktopHeader from './components/DesktopHeader'
import Loader from './pages/Loader'
import Root from './pages/Root'
import SilentSettings from './function/SilentSettings'
import { Toaster } from 'react-hot-toast'
import { electronState } from './recoil/atoms'
import { useSetRecoilState } from 'recoil'
import { useSettings } from './pages/settings/Settings'

const RootProvider = () => {
  const [loaded, setLoaded] = useState(false)

  const settingsController = useSettings()

  const setElectron = useSetRecoilState(electronState)

  useEffect(() => {
    settingsController.init()

    SilentSettings.conf('refreshToken', null)
    SilentSettings.conf('accessToken', null)

    const isElectron = window.require !== undefined
    if (isElectron) {
      const isDev =
        typeof window.process.env.CODA_DEVELOPMENT_ENVIRONMENT != 'undefined' &&
        window.process.env.CODA_DEVELOPMENT_ENVIRONMENT === 'true'
      setElectron({
        is: isElectron,
        ipc: window.require('electron').ipcRenderer,
        dev: isDev,
      })
    }
  }, [])

  return (
    <div className='w-screen h-screen'>
      <Toaster />
      <DesktopHeader />
      {loaded ? <Root /> : <Loader setLoaded={setLoaded} />}
    </div>
  )
}

export default RootProvider

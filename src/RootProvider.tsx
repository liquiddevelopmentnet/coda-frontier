import { useEffect, useState } from 'react'

import DesktopHeader from './components/DesktopHeader'
import Loader from './pages/Loader'
import Root from './pages/Root'
import SilentSettings from './function/SilentSettings'
import { Toaster } from 'react-hot-toast'
import { useSetRecoilState } from 'recoil'
import { useSettings } from './pages/settings/Settings'

const RootProvider = () => {
  const [loaded, setLoaded] = useState(false)

  const settingsController = useSettings()

  useEffect(() => {
    settingsController.init()

    SilentSettings.conf('refreshToken', null)
    SilentSettings.conf('accessToken', null)
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

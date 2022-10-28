/*
 * Copyright github.com/liquiddevelopmentnet, 2022.
 * All rights reserved. Do not distribute without permission.
 */

import {
  hostState,
  rootViewState,
  taskbarState,
  tokenState,
} from '../recoil/atoms'
import { useEffect, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import Dashboard from './Dashboard'
import DefaultPopup from '../components/DefaultPopup'
import { IoIosWarning } from 'react-icons/io'
import SilentSettings from '../function/SilentSettings'
import { sleep } from '../function/AsyncUtils'
import { useDiscordRpc } from '../function/DiscordRpc'
import { useGateway } from '../function/Gateway'
import { usePopups } from '../components/Popuper'

declare const window: any

function Loader({ setLoaded }: { setLoaded: (loaded: boolean) => void }) {
  const [percentage, setPercentage] = useState(0)
  const [error, setError] = useState<string>('')
  const gateway = useGateway()
  const setRootView = useSetRecoilState(rootViewState)
  const setToken = useSetRecoilState(tokenState)
  const setTaskbar = useSetRecoilState(taskbarState)
  const host = useRecoilValue(hostState)
  const drpc = useDiscordRpc()
  const popup = usePopups()

  const steps = [
    async () => {
      drpc('Loading', '')
      await new Promise(resolve => {
        if (!host.secure) {
          popup.dispatch(
            <DefaultPopup
              buttons='gotit'
              icon={<IoIosWarning className='text-2xl text-white opacity-90' />}
              title='Unsecure connection!'
              description='The connection to the server is not secure. This means that your data can be stolen by a third party by intercepting the connection. This is a fatal error, please contact the developer of this application if you are using it in a public release. You can ignore this warning if you are using this application in a development environment or as tester.'
              closeOnDocumentClick={false}
              closeOnEscape={false}
              onOk={() => {
                resolve(true)
              }}
            />
          )
        }
      })
      await sleep(1123)
    },
    async () => {
      await sleep(1111)
      const gatewayAvailable = await gateway.ping()
      if (!gatewayAvailable) {
        return "Can't reach gateway server. Try again later."
      }
    },
    async () => {
      if (
        SilentSettings.present('refreshToken') &&
        SilentSettings.present('accessToken')
      ) {
        setToken({
          refresh: SilentSettings.get('refreshToken'),
          access: SilentSettings.get('accessToken'),
        })
        setTaskbar(true)
        setRootView(<Dashboard />)
      }
    },
  ]

  useEffect(() => {
    const runSteps = async () => {
      var mathPercentage = percentage
      for (const step of steps) {
        const failed = await step()
        const newPercentage = mathPercentage + 100 / steps.length
        if (failed === undefined) {
          if (newPercentage >= 100) {
            setPercentage(newPercentage)
            await sleep(1500)
            setLoaded(true)
          } else {
            setPercentage(newPercentage)
            mathPercentage = newPercentage
          }
        } else {
          setError(failed)
          break
        }
      }
    }

    runSteps()
  }, [])

  return (
    <div className='w-full h-full bg-gradient-to-b from-slate-800 to-slate-900 flex'>
      <div className='m-auto'>
        <div className={`${window.__TAURI__ && 'mb-[22px]'}`}>
          {error === '' ? (
            <div className='flex flex-col text-center space-y-5'>
              <p className='text-white'>Loading...</p>
              <div className='flex h-[1px] w-96 flex-row rounded-full bg-slate-700'>
                <div
                  className='h-full rounded-l-full bg-gradient-to-r from-red-500 to-pink-500 transition-all ease-in-out duration-1000'
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          ) : (
            <>
              <IoIosWarning className='text-5xl text-red-500 mx-auto opacity-90 mb-2' />
              <p className='text-red-500 opacity-90 text-sm'>{error}</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Loader

/*
 * Copyright github.com/liquiddevelopmentnet, 2022.
 * All rights reserved. Do not distribute without permission.
 */

import ReactCommonmark from 'react-commonmark'
import Slider from 'rc-slider'
import { settingsState } from '../../../recoil/atoms'
import { useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { useSafeSettings } from '../SafeSettingsHook'
import { useSettings } from '../Settings'

function OptionBase(props: {
  inherit: {
    title: string
    description: string
    default: any
    identifier: string
    dependsOn?: string
  }
  children: React.ReactNode
}) {
  const settings = useSettings()
  const safeSettings = useSafeSettings()

  useEffect(() => {
    settings.conf(props.inherit.identifier, props.inherit.default)
  }, [])

  const settingsRec = useRecoilValue(settingsState)

  return (
    <div
      className={`space-y-5 overflow-visible mr-3 ${
        props.inherit.dependsOn != undefined &&
        (settingsRec[props.inherit.dependsOn] == false ||
          safeSettings(props.inherit.dependsOn!, []).size === 0)
          ? 'opacity-30 pointer-events-none'
          : ''
      }`}
    >
      <div className='mt-4 bg-gray-500 opacity-20 h-[1px] w-full' />
      <div className='flex justify-between overflow-visible'>
        <div>
          <p className='text-gray-400 font-bold text-xs-c uppercase'>
            {props.inherit.title}
          </p>
          <div className='text-gray-400 text-xs mt-2 w-[500px]'>
            <ReactCommonmark
              source={props.inherit.description}
              skipHtml={true}
            />
          </div>
        </div>
        <div className='flex overflow-visible ml-auto'>{props.children}</div>
      </div>
    </div>
  )
}

export default OptionBase

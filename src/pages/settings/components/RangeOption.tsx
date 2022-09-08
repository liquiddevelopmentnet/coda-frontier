import OptionBase from './OptionBase'
import ReactCommonmark from 'react-commonmark'
import Slider from 'rc-slider'
import { settingsState } from '../../../recoil/atoms'
import { useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { useSettings } from '../Settings'

// This provides a range between 0.0 and 10.0

function RangeOption(props: {
  title: string
  description: string
  default: number
  identifier: string
  dependsOn?: string
}) {
  const settings = useSettings()
  const settingsRec = useRecoilValue(settingsState)

  const debounce = (func: () => any, timeout = 300) => {
    let timer: NodeJS.Timeout
    return (...args: any[]) => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        // @ts-ignore
        func.apply(this, args)
      }, timeout)
    }
  }

  return (
    <OptionBase inherit={props}>
      <div className='w-32 h-16'>
        <Slider
          onChange={(nextValues: any) => {
            debounce(
              settings.set(
                props.identifier,
                Math.round(nextValues * 10 * 10) / 10
              ),
              300
            )
          }}
          min={0}
          max={1}
          defaultValue={
            settingsRec[props.identifier] == undefined
              ? props.default
              : settingsRec[props.identifier] / 10
          }
          step={0.01}
          className='mt-[18px]'
        />
      </div>
    </OptionBase>
  )
}

export default RangeOption

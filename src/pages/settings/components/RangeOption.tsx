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

  useEffect(() => {
    settings.conf(props.identifier, props.default)
  }, [])

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
    <div
      className={`space-y-5 overflow-visible mr-3 ${
        props.dependsOn != undefined && settingsRec[props.dependsOn] == false
          ? 'opacity-30 pointer-events-none'
          : ''
      }`}
    >
      <div className='mt-4 bg-gray-500 opacity-20 h-[1px] w-full' />
      <div className='flex justify-between overflow-visible'>
        <div>
          <p className='text-gray-400 font-bold text-xs-c uppercase'>
            {props.title}
          </p>
          <div className='text-gray-400 text-xs mt-2 w-[500px]'>
            <ReactCommonmark source={props.description} skipHtml={true} />
          </div>
        </div>
        <div className='w-32 h-16 flex overflow-visible'>
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
      </div>
    </div>
  )
}

export default RangeOption

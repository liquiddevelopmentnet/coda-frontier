import ReactCommonmark from 'react-commonmark'
import Toggle from 'react-toggle'
import { settingsState } from '../../../recoil/atoms'
import { useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { useSettings } from '../Settings'

function BooleanOption(props: {
  title: string
  description: string
  default: boolean
  identifier: string
}) {
  const settings = useSettings()

  useEffect(() => {
    settings.conf(props.identifier, props.default)
  }, [])

  const settingsRec = useRecoilValue(settingsState)

  return (
    <div className='space-y-5'>
      <div className='mt-4 bg-gray-500 opacity-20 h-[1px] w-full' />
      <div className='flex justify-between'>
        <div>
          <p className='text-gray-400 font-bold text-xs-c uppercase'>
            {props.title}
          </p>
          <div className='text-gray-400 text-xs mt-2 w-[500px]'>
            <ReactCommonmark source={props.description} skipHtml={true} />
          </div>
        </div>
        <div className='flex items-center'>
          <Toggle
            checked={
              settingsRec[props.identifier] == undefined
                ? props.default
                : settingsRec[props.identifier]
            }
            className='opacity-90'
            name={props.identifier}
            onChange={e => {
              settings.set(props.identifier, e.target.checked)
            }}
            icons={false}
          />
        </div>
      </div>
    </div>
  )
}

export default BooleanOption

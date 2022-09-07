import ReactCommonmark from 'react-commonmark'
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

  useEffect(() => {
    const iv = setInterval(() => {
      console.log(settingsRec)
    }, 2000)
    return () => clearInterval(iv)
  }, [settingsRec])

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
          <input
            type='checkbox'
            className='h-5 w-5 text-gray-400'
            checked={
              settingsRec[props.identifier] == undefined
                ? props.default
                : settingsRec[props.identifier]
            }
            onChange={e => {
              settings.set(props.identifier, e.target.checked)
            }}
          />
        </div>
      </div>
      <div className='bg-gray-500 opacity-20 h-[1px] w-full' />
    </div>
  )
}

export default BooleanOption

import OptionBase from './OptionBase'
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

  const settingsRec = useRecoilValue(settingsState)

  return (
    <OptionBase inherit={props}>
      <Toggle
        checked={
          settingsRec[props.identifier] == undefined
            ? props.default
            : settingsRec[props.identifier]
        }
        className='opacity-90 mt-[18px]'
        name={props.identifier}
        onChange={e => {
          settings.set(props.identifier, e.target.checked)
        }}
        icons={false}
      />
    </OptionBase>
  )
}

export default BooleanOption

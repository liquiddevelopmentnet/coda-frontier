import { IoMdAdd, IoMdRemove } from 'react-icons/io'
import { atom, useRecoilState, useRecoilValue } from 'recoil'
import { useEffect, useState } from 'react'

import { CSSTransition } from 'react-transition-group'
import CommonButton from '../../../components/CommonButton'
import OptionBase from './OptionBase'
import { settingsState } from '../../../recoil/atoms'
import { useSettings } from '../Settings'

const internalState = atom<string[]>({
  key: 'internal',
  default: [],
})

function ListOption(props: {
  title: string
  description: string
  default: any[]
  identifier: string
  dependsOn?: string
}) {
  const settings = useSettings()
  const settingsRec = useRecoilValue(settingsState)

  const [saveButtonVisible, setSaveButtonVisible] = useState(false)
  const [internal, setInternal] = useRecoilState(internalState)

  useEffect(() => {
    setInternal(
      settingsRec[props.identifier] === undefined
        ? props.default
        : settingsRec[props.identifier]
    )
  }, [])

  useEffect(() => {
    setSaveButtonVisible(
      JSON.stringify(internal) !== JSON.stringify(settingsRec[props.identifier])
    )
  }, [internal])

  return (
    <>
      <OptionBase inherit={props}>
        <div className='flex items-center space-x-3'>
          <CSSTransition
            in={saveButtonVisible}
            timeout={200}
            classNames='s-opacity'
            unmountOnExit
          >
            <CommonButton
              label='Save'
              type='secondary'
              onClick={() => {
                settings.set(props.identifier, internal)
                setSaveButtonVisible(false)
              }}
            />
          </CSSTransition>
          <IoMdAdd
            size={20}
            className='text-green-500 cursor-pointer hover:opacity-80'
            onClick={() => {
              setInternal([...internal, ''])
              setSaveButtonVisible(true)
            }}
          />
        </div>
      </OptionBase>
      <Entries />
    </>
  )
}

const Entries = () => {
  const [internal, setInternal] = useRecoilState(internalState)
  return (
    <div className='space-y-3 mt-3 mr-3 ml-2 overflow-visible'>
      {internal.map((entry, index) => (
        <div
          key={index}
          className='flex items-center space-x-3 overflow-visible'
        >
          <input
            className='w-full py-2 px-3 text-white focus:ring focus:ring-pink-500 bg-slate-900 bg-opacity-60 rounded-[4px]'
            type={'url'}
            value={entry}
            onChange={e => {
              const newInternal = [...internal]
              newInternal[index] = e.target.value
              setInternal(newInternal)
            }}
          />
          <IoMdRemove
            size={20}
            className='text-red-500 cursor-pointer hover:opacity-80'
            onClick={() => {
              setInternal(internal.filter((_, i) => i !== index))
            }}
          />
        </div>
      ))}
    </div>
  )
}

export default ListOption

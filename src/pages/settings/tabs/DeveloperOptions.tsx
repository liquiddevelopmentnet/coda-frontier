import CommonButton from '../../../components/CommonButton'
import DefaultPopup from '../../../components/DefaultPopup'
import { IoIosWarning } from 'react-icons/io'
import SettingsSection from '../components/SettingsSection'
import { codaToast } from '../../../function/Toaster'
import { invoke } from '@tauri-apps/api/tauri'
import { usePopups } from '../../../components/Popuper'

// ! Note: This component is *not* internationalized because it is only used for development purposes.

function DeveloperOptions() {
  const popup = usePopups()
  return (
    <div className='w-full ml-1 overflow-visible'>
      <SettingsSection title='networking' />
      <SettingsSection title='discord rpc' />
      <div className='flex items-center justify-center w-3/4 space-x-5 overflow-visible'>
        <input
          type='text'
          id='dev-drpc-state'
          placeholder='State'
          className='w-1/2 p-[8px] px-4 text-white focus:ring focus:ring-pink-500 bg-slate-900 bg-opacity-60 rounded-[4px] text-xs'
        />
        <input
          type='text'
          id='dev-drpc-details'
          placeholder='Details'
          className='w-1/2 p-[8px] px-4 text-white focus:ring focus:ring-pink-500 bg-slate-900 bg-opacity-60 rounded-[4px] text-xs'
        />
        <CommonButton
          label='Invoke'
          onClick={async () => {
            const state = document.getElementById(
              'dev-drpc-state'
            ) as HTMLInputElement
            const details = document.getElementById(
              'dev-drpc-details'
            ) as HTMLInputElement

            await invoke('set_rpc', {
              state: state.value,
              detail: details.value,
            })

            codaToast({
              type: 'success',
              message: 'Successfully invoked Discord RPC',
            })
          }}
          type='secondary'
        />
      </div>
      <SettingsSection title='tests' />
      <div className='flex space-x-3'>
        <CommonButton
          label='Show Success Toast'
          type='success'
          onClick={() => {
            codaToast({
              message: 'This is a example success toast',
              type: 'success',
            })
          }}
        />
        <CommonButton
          label='Show Error Toast'
          type='error'
          onClick={() => {
            codaToast({
              message: 'This is a example error toast',
              type: 'error',
            })
          }}
        />
        <CommonButton
          label='Show Info Toast'
          type='secondary'
          onClick={() => {
            codaToast({
              message: 'This is a example info toast',
              type: 'info',
            })
          }}
        />
      </div>
      <div className='flex space-x-3 mt-3'>
        <CommonButton
          label='Show Test Popup'
          type='secondary'
          onClick={() => {
            popup.dispatch(
              <DefaultPopup
                buttons='yesno'
                icon={
                  <IoIosWarning className='text-2xl text-white opacity-90' />
                }
                title='Test Popup'
                description='This is a test popup'
                onYes={() => {
                  codaToast({
                    type: 'success',
                    message: 'You clicked yes!',
                  })
                }}
                onNo={() => {
                  codaToast({
                    type: 'error',
                    message: 'You clicked no!',
                  })
                }}
              />
            )
          }}
        />
      </div>
    </div>
  )
}

export default DeveloperOptions

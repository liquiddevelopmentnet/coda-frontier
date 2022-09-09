import CommonButton from '../../../components/CommonButton'
import SettingsSection from '../components/SettingsSection'
import { codaToast } from '../../../function/Toaster'

// ! Note: This component is *not* internationalized because it is only used for development purposes.n

function DeveloperOptions() {
  return (
    <div className='w-full'>
      <SettingsSection title='networking' />
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
    </div>
  )
}

export default DeveloperOptions

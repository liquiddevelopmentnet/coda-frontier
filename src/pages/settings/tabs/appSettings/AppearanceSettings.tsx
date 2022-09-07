import BooleanOption from '../../components/BooleanOption'
import SettingsSection from '../../components/SettingsSection'

function AppearanceSettings() {
  return (
    <div className='w-full'>
      <SettingsSection title='background images' />
      <BooleanOption
        title='enabled'
        description='Background images are specific images selected by our team that will displayed behind the main content, they are designed to be **relaxing** and not **distracting**'
        default={true}
        identifier='appearance.backgroundImages'
      />
    </div>
  )
}

export default AppearanceSettings

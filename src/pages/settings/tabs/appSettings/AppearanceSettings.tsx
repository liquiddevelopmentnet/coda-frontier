import BooleanOption from '../../components/BooleanOption'
import RangeOption from '../../components/RangeOption'
import SettingsSection from '../../components/SettingsSection'

function AppearanceSettings() {
  return (
    <div className='w-full'>
      <SettingsSection title='background images' />
      <BooleanOption
        title='enabled'
        description='Background images are specific images selected by our team that will be displayed behind the main content, they are designed to be **relaxing** and not **distracting**'
        default={true}
        identifier='appearance.backgroundImages'
      />
      <RangeOption
        title='blur'
        description='The blur amount of the background image'
        default={0.3}
        identifier='appearance.backgroundImages.blur'
        dependsOn='appearance.backgroundImages'
      />
      <RangeOption
        title='dim'
        description='The amount of dim applied to the background image'
        default={0.1}
        identifier='appearance.backgroundImages.dim'
        dependsOn='appearance.backgroundImages'
      />
    </div>
  )
}

export default AppearanceSettings

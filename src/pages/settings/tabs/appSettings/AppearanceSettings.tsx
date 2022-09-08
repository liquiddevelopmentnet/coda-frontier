import BooleanOption from '../../components/BooleanOption'
import RangeOption from '../../components/RangeOption'
import SettingsSection from '../../components/SettingsSection'
import { useTranslations } from '../../../../i18n/i18n'

function AppearanceSettings() {
  const t = useTranslations().t

  return (
    <div className='w-full'>
      <SettingsSection
        title={t('Settings.AppSettings.Appearance.BackgroundImages')}
      />
      <BooleanOption
        title={t('Settings.AppSettings.Appearance.BackgroundImages.Enabled')}
        description={t(
          'Settings.AppSettings.Appearance.BackgroundImages.Enabled.Description'
        )}
        default={true}
        identifier='appearance.backgroundImages'
      />
      <RangeOption
        title={t('Settings.AppSettings.Appearance.BackgroundImages.Blur')}
        description={t(
          'Settings.AppSettings.Appearance.BackgroundImages.Blur.Description'
        )}
        default={0.3}
        identifier='appearance.backgroundImages.blur'
        dependsOn='appearance.backgroundImages'
      />
      <RangeOption
        title={t('Settings.AppSettings.Appearance.BackgroundImages.Dim')}
        description={t(
          'Settings.AppSettings.Appearance.BackgroundImages.Dim.Description'
        )}
        default={0.1}
        identifier='appearance.backgroundImages.dim'
        dependsOn='appearance.backgroundImages'
      />
    </div>
  )
}

export default AppearanceSettings

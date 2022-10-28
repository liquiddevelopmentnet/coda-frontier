/*
 * Copyright github.com/liquiddevelopmentnet, 2022.
 * All rights reserved. Do not distribute without permission.
 */

import BooleanOption from '../../components/BooleanOption'
import ListOption from '../../components/ListOption'
import RangeOption from '../../components/RangeOption'
import SettingsSection from '../../components/SettingsSection'
import { useTranslations } from '../../../../i18n/i18n'

function AppearanceSettings() {
  const t = useTranslations()

  return (
    <div className='w-full'>
      <SettingsSection
        title={t('Settings.AppSettings.Appearance.BackgroundImages')}
        f
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
      <ListOption
        title='Custom Backgrounds'
        description='Custom background image links'
        default={[]}
        identifier='appearance.backgroundImages.custom'
        dependsOn='appearance.backgroundImages'
      />
      <BooleanOption
        title='Add Included Backgrounds'
        description='Add the included backgrounds to the rotation'
        default={true}
        identifier='appearance.backgroundImages.included'
        dependsOn='appearance.backgroundImages.custom'
      />
    </div>
  )
}

export default AppearanceSettings

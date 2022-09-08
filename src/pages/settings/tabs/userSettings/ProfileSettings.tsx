import SettingsNotice from '../../components/SettingsNotice'
import { useTranslations } from '../../../../i18n/i18n'

function ProfileSettings() {
  const t = useTranslations().t

  return (
    <div className='w-full'>
      <SettingsNotice text={t('Settings.UserSettings.Profile.NotLoggedIn')} />
    </div>
  )
}

export default ProfileSettings

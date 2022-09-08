import SettingsNotice from '../../components/SettingsNotice'
import { useTranslations } from '../../../../i18n/i18n'

function FriendRequestsSettings() {
  const t = useTranslations().t

  return (
    <div className='w-full'>
      <SettingsNotice text={t('Settings.Extra.NotAvailableYet')} />
    </div>
  )
}

export default FriendRequestsSettings

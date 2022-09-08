import SettingsNotice from '../../components/SettingsNotice'
import { useTranslations } from '../../../../i18n/i18n'

function SecuritySettings() {
  const t = useTranslations().t

  return (
    <div className='w-full'>
      <SettingsNotice text={t('Settings.Extra.NotAvailableYet')} />
    </div>
  )
}

export default SecuritySettings

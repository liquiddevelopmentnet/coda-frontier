/*
 * Copyright github.com/liquiddevelopmentnet, 2022.
 * All rights reserved. Do not distribute without permission.
 */

import SettingsNotice from '../../components/SettingsNotice'
import { useTranslations } from '../../../../i18n/i18n'

function ConnectionsSettings() {
  const t = useTranslations()

  return (
    <div className='w-full'>
      <SettingsNotice text={t('Settings.Extra.NotAvailableYet')} />
    </div>
  )
}

export default ConnectionsSettings

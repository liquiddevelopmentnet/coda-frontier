import { atom, useRecoilState } from 'recoil'

import Flags from 'country-flag-icons/react/3x2'
import SettingsNotice from '../../components/SettingsNotice'
import SettingsSection from '../../components/SettingsSection'
import languageSettings from '../../../../i18n/language/_settings.json'
import { useEffect } from 'react'
import { useSafeSettings } from '../../SafeSettingsHook'
import { useSettings } from '../../Settings'
import { useTranslations } from '../../../../i18n/i18n'

const selectedLanguageState = atom<string>({
  key: 'selectedLanguageState',
  default: 'us',
})

function LanguageSettings() {
  const t = useTranslations()
  const settings = useSettings()
  const safeSettings = useSafeSettings()

  const [selectedLanguage, setSelectedLanguage] = useRecoilState(
    selectedLanguageState
  )

  useEffect(() => {
    setSelectedLanguage(safeSettings('language', 'us'))
  }, [])

  useEffect(() => {
    settings.set('language', selectedLanguage)
  }, [selectedLanguage])

  return (
    <div className='w-full space-y-2'>
      <SettingsSection title={t('Settings.AppSettings.Language')} />
      {Object.keys(languageSettings.languageNames).map((lang, index) => {
        return (
          <div key={index}>
            <LanguagePanel
              lang={lang /* @ts-ignore */}
              name={languageSettings.languageNames[lang]}
            />
          </div>
        )
      })}
    </div>
  )
}

const LanguagePanel = (props: { lang: string; name: string }) => {
  const [selectedLanguage, setSelectedLanguage] = useRecoilState(
    selectedLanguageState
  )

  // @ts-ignore
  const Flag: React.ReactNode = Flags[props.lang.toUpperCase()]

  return (
    <div
      className={`flex ${
        selectedLanguage == props.lang
          ? 'bg-gradient-to-r from-red-500 to-pink-500'
          : 'bg-gray-600 bg-opacity-50 hover:bg-opacity-70 cursor-pointer'
      } p-3 rounded-[4px] space-x-3 items-center select-none`}
      onClick={() => {
        setSelectedLanguage(props.lang)
      }}
    >
      {/* @ts-ignore */}
      <Flag className='w-7 rounded-[3px]' />
      <p className='text-white'>{props.name}</p>
    </div>
  )
}

export default LanguageSettings

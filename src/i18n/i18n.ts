import React, { useEffect } from 'react'

import { languageState } from '../recoil/atoms'
import settings from './language/_settings.json'
import { useRecoilValue } from 'recoil'

export function useTranslations() {
  const languageValue = useRecoilValue(languageState)
  var translations = require(`./language/${languageValue}.json`)

  useEffect(() => {
    translations = require(`./language/${languageValue}.json`)
  }, [languageValue])

  const [languageProvider, setLanguageProvider] = React.useState<{
    t: (key: string) => string
  }>({
    t: (key: string): string => {
      var translation = translations[key]
      if (translation === undefined) {
        translation = require(`./language/${settings['defaultLanguage']}.json`)[
          key
        ]
      }
      return translation
    },
  })

  return languageProvider
}

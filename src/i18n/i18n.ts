/*
 * Copyright Project Coda, LLC, 2022.
 * All rights reserved.
 */

import React, { useEffect } from 'react'

import settings from './language/_settings.json'
import { useSafeSettings } from '../pages/settings/SafeSettingsHook'

export function useTranslations() {
  const appSettings = useSafeSettings()
  var translations = require(`./language/${appSettings('language', 'us')}.json`)

  useEffect(() => {
    translations = require(`./language/${appSettings('language', 'us')}.json`)
  }, [appSettings('language', 'us')])

  return (key: string): string => {
    var translation = translations[key]
    if (translation === undefined) {
      translation = require(`./language/${settings['defaultLanguage']}.json`)[
        key
      ]
      if (translation === undefined) {
        translation = key
      }
    }
    return translation
  }
}

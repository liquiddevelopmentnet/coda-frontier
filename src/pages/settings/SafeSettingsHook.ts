/*
 * Copyright github.com/liquiddevelopmentnet, 2022.
 * All rights reserved. Do not distribute without permission.
 */

import { settingsState } from '../../recoil/atoms'
import { useRecoilValue } from 'recoil'

export function useSafeSettings() {
  const settings = useRecoilValue(settingsState)

  return (key: string, defaultValue: any) => {
    return settings[key] == null || settings[key] == undefined
      ? defaultValue
      : settings[key]
  }
}

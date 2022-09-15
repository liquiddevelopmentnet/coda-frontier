/*
 * Copyright Project Coda, LLC, 2022.
 * All rights reserved.
 */

import base64url from 'base64url'
import { settingsState } from '../../recoil/atoms'
import { useSetRecoilState } from 'recoil'
import { useState } from 'react'

const _init = () => {
  var settings = window.localStorage.getItem('_set')
  if (settings == null || settings == undefined) {
    window.localStorage.setItem(
      '_set',
      'Y29kYQ' + base64url(JSON.stringify({}))
    )
    return { rec: null, ret: {} }
  }
  var obj = JSON.parse(base64url.decode(settings.substring(6)))
  return { rec: obj, ret: {} }
}

const _get = (
  key: string,
  def: string | boolean | number | undefined | any[]
) => {
  var settings = window.localStorage.getItem('_set')
  if (settings == null) {
    _init()
    return { rec: null, ret: def }
  }
  var obj = JSON.parse(base64url.decode(settings.substring(6)))
  return { rec: null, ret: obj[key] == undefined ? def : obj[key] }
}

const _set = (
  key: string,
  value: string | boolean | number | undefined | any[]
) => {
  var settings = window.localStorage.getItem('_set')
  if (settings == null) {
    _init()
    return { rec: null, ret: undefined }
  }
  var obj = JSON.parse(base64url.decode(settings.substring(6)))
  obj[key] = value
  window.localStorage.setItem('_set', 'Y29kYQ' + base64url(JSON.stringify(obj)))
  return { rec: obj, ret: undefined }
}

const _conf = (
  key: string,
  value: string | boolean | number | undefined | any[]
) => {
  if (_get(key, undefined).ret == undefined) {
    return _set(key, value)
  }
  return { rec: null, ret: undefined }
}

export function useSettings() {
  const setRecSettings = useSetRecoilState(settingsState)

  const [functionProvider, setFunctionProvider] = useState<{
    init: () => any
    get: (
      key: string,
      def: string | boolean | number | undefined | any[]
    ) => any
    set: (
      key: string,
      value: string | boolean | number | undefined | any[]
    ) => any
    conf: (
      key: string,
      value: string | boolean | number | undefined | any[]
    ) => any
  }>({
    init: () => {
      const result = _init()
      if (result.rec != null) {
        setRecSettings(result.rec)
      }
      return result.ret
    },
    get: (key: string, def: string | boolean | number | undefined | any[]) => {
      const result = _get(key, def)
      if (result.rec != null) {
        setRecSettings(result.rec)
      }
      return result.ret
    },
    set: (
      key: string,
      value: string | boolean | number | undefined | any[]
    ) => {
      const result = _set(key, value)
      if (result.rec != null) {
        setRecSettings(result.rec)
      }
      return result.ret
    },
    conf: (
      key: string,
      value: string | boolean | number | undefined | any[]
    ) => {
      const result = _conf(key, value)
      if (result.rec != null) {
        setRecSettings(result.rec)
      }
      return result.ret
    },
  })

  return functionProvider
}

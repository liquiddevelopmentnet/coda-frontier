/*
 * Copyright Project Coda, LLC, 2022.
 * All rights reserved.
 */

import base64url from 'base64url'

const init = () => {
  var settings = window.localStorage.getItem('_silset')
  if (settings == null || settings == undefined) {
    window.localStorage.setItem(
      '_silset',
      'Y29kYQ' + base64url(JSON.stringify({}))
    )
    return {}
  }
}

const get = (key: string) => {
  var settings = window.localStorage.getItem('_silset')
  if (settings == null) {
    init()
    return undefined
  }
  var obj = JSON.parse(base64url.decode(settings.substring(6)))
  return obj[key]
}

const set = (key: string, value: any) => {
  var settings = window.localStorage.getItem('_silset')
  if (settings == null) {
    init()
    return undefined
  }
  var obj = JSON.parse(base64url.decode(settings.substring(6)))
  obj[key] = value
  window.localStorage.setItem(
    '_silset',
    'Y29kYQ' + base64url(JSON.stringify(obj))
  )
}

const conf = (key: string, value: any) => {
  if (get(key) == undefined) {
    set(key, value)
  }
}

const present = (key: string) => {
  var settings = window.localStorage.getItem('_silset')
  if (settings == null) {
    init()
    return false
  }
  var obj = JSON.parse(base64url.decode(settings.substring(6)))
  return obj[key] != undefined
}

export default { init, get, set, conf, present }

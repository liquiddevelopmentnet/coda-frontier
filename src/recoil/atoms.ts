/*
 * Copyright Project Coda, LLC, 2022.
 * All rights reserved.
 */

import { atom } from 'recoil'

export const tokenState = atom<{
  refresh: string | null
  access: string | null
}>({
  key: 'tokenState',
  default: {
    refresh: null,
    access: null,
  },
})

export const electronState = atom<{ is: boolean; ipc: any }>({
  key: 'electronState',
  default: {
    is: false,
    ipc: null,
  },
})

export const hostState = atom<ProvidedHostState>({
  key: 'hostState',
  default: {
    secure: false,
    host: 'localhost',
    suffix: '',
    port: 8080,
  },
})

export const languageState = atom<string>({
  key: 'languageState',
  default: 'en',
})

/*
 * Copyright Project Coda, LLC, 2022.
 * All rights reserved.
 */

import SignUp from '../pages/SignUp'
import { atom } from 'recoil'

// electron

export const electronState = atom<{ is: boolean; ipc: any }>({
  key: 'electronState',
  default: {
    is: false,
    ipc: null,
  },
})

// api

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

export const hostState = atom<ProvidedHostState>({
  key: 'hostState',
  default: {
    secure: false,
    host: 'localhost',
    suffix: '',
    port: 8080,
  },
})

// routing

export const rootViewState = atom<any>({
  key: 'rootViewState',
  default: <SignUp />,
})

// additional views

export const taskbarState = atom<boolean>({
  key: 'taskbarState',
  default: false,
})

export const settingsWindowState = atom<boolean>({
  key: 'settingsWindowState',
  default: false,
})

// settings that need live updates

export const languageState = atom<string>({
  key: 'languageState',
  default: 'en',
})

// vfx

export const flashState = atom<boolean>({
  key: 'flashState',
  default: false,
})

/*
 * Copyright Project Coda, LLC, 2022.
 * All rights reserved.
 */

import SignUp from '../pages/SignUp'
import { atom } from 'recoil'

// electron

export const electronState = atom<{ is: boolean; ipc: any; dev: boolean }>({
  key: 'electronState',
  default: {
    is: false,
    ipc: null,
    dev: false,
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
    host: '42.60.221.133',
    suffix: '',
    port: 20560,
  },
})

// settings

export const settingsState = atom<any>({
  key: 'settingsState',
  default: {},
})

// routing

export const rootViewState = atom<any>({
  key: 'rootViewState',
  default: <SignUp />,
})

export const showRootContentState = atom<boolean>({
  key: 'hideRootContentState',
  default: true,
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

// vfx

export const flashState = atom<boolean>({
  key: 'flashState',
  default: false,
})

/*
 * Copyright github.com/liquiddevelopmentnet, 2022.
 * All rights reserved. Do not distribute without permission.
 */

import { invoke } from '@tauri-apps/api/tauri'

declare const window: any

export function useDiscordRpc() {
  return async function open(state: string, detail: string) {
    if (window.__TAURI__) {
      await invoke('set_rpc', { state, detail })
    }
    return null
  }
}

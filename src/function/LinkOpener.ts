/*
 * Copyright github.com/liquiddevelopmentnet, 2022.
 * All rights reserved. Do not distribute without permission.
 */

import { open } from '@tauri-apps/api/shell'
import { useState } from 'react'

declare const window: any

export function useLinkOpener() {
  const [functionProvider, setFunctionProvider] = useState<{
    open: (link: string) => any
  }>({
    open: (link: string) => {
      if (window.__TAURI__) {
        open(link)
      } else {
        window.open(link, '_blank')
      }

      return null
    },
  })

  return functionProvider
}

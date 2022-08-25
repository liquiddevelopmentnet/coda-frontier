import { electronState } from '../recoil/atoms'
import { useRecoilValue } from 'recoil'
import { useState } from 'react'

export function useLinkOpener() {
  const electron = useRecoilValue(electronState)

  const [functionProvider, setFunctionProvider] = useState<{
    open: (link: string) => any
  }>({
    open: (link: string) => {
      if (electron.is) {
        electron.ipc.send('open_url', link)
      } else {
        window.open(link, '_blank')
      }

      return null
    },
  })

  return functionProvider
}

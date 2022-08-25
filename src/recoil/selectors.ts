/*
 * Copyright Project Coda, LLC, 2022.
 * All rights reserved.
 */

import { hostState } from './atoms'
import { selector } from 'recoil'

export const hostUrlState = selector({
  key: 'hostUrlState',
  get: ({ get }) => {
    const host: ProvidedHostState = get(hostState)
    var hostString = ''
    hostString += host.secure ? 'https' : 'http'
    hostString += '://'
    hostString += host.host
    hostString += host.port != null ? ':' + host.port : ''
    hostString += '/'
    hostString += host.suffix
    return hostString
  },
})

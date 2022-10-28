/*
 * Copyright github.com/liquiddevelopmentnet, 2022.
 * All rights reserved. Do not distribute without permission.
 */

declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.mp3'
declare module '*.mp4'
declare module '*.webm'
declare module '*.ogg'
declare module '*.svg'
declare module '*.md'

declare module 'react-crossfade-image'

type ProvidedHostState = {
  secure: boolean
  host: string
  suffix: string
  port: number | null
}

type DiscordMeta = {
  username: string
  discriminator: string
  id: number
}

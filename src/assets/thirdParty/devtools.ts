/*!
devtools-detect
https://github.com/sindresorhus/devtools-detect
By Sindre Sorhus
MIT License
*/

const devtools: {
  isOpen: boolean
  orientation: string | undefined
} = {
  isOpen: false,
  orientation: undefined,
}

const threshold = 160

const emitEvent = (isOpen: boolean, orientation: string | undefined) => {
  globalThis.dispatchEvent(
    new globalThis.CustomEvent('devtoolschange', {
      detail: {
        isOpen,
        orientation,
      },
    })
  )
}

const main = ({ emitEvents = true } = {}) => {
  const widthThreshold =
    globalThis.outerWidth - globalThis.innerWidth > threshold
  const heightThreshold =
    globalThis.outerHeight - globalThis.innerHeight > threshold
  const orientation = widthThreshold ? 'vertical' : 'horizontal'

  if (
    !(heightThreshold && widthThreshold) &&
    // @ts-ignore
    ((globalThis.Firebug &&
      // @ts-ignore
      globalThis.Firebug.chrome &&
      // @ts-ignore
      globalThis.Firebug.chrome.isInitialized) ||
      widthThreshold ||
      heightThreshold)
  ) {
    if (
      (!devtools.isOpen || devtools.orientation !== orientation) &&
      emitEvents
    ) {
      emitEvent(true, orientation)
    }

    devtools.isOpen = true
    devtools.orientation = orientation
  } else {
    if (devtools.isOpen && emitEvents) {
      emitEvent(false, undefined)
    }

    devtools.isOpen = false
    devtools.orientation = undefined
  }
}

main({ emitEvents: false })
setInterval(main, 500)

export default devtools

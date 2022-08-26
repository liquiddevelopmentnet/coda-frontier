/*
 * Copyright Project Coda, LLC, 2022.
 * All rights reserved.
 */

import React, { useEffect, useRef } from 'react'

function CrossfadeImage({
  duration = 1000,
  src,
}: {
  duration: number
  src: string
}) {
  const [topSrc, setTopSrc] = React.useState<string>(src)
  const [bottomSrc, setBottomSrc] = React.useState<string>(src)

  const top = useRef<HTMLImageElement>(null)
  const bottom = useRef<HTMLImageElement>(null)

  useEffect(() => {
    let tosrc = src
    setBottomSrc(tosrc)
    const fadeOut = setInterval(() => {
      if (top.current) {
        if (
          bottom.current &&
          (!bottom.current.complete || bottom.current.naturalHeight === 0)
        )
          return
        top.current.style.opacity = (
          parseFloat(top.current.style.opacity) - 0.01
        ).toString()
      }
      if (top.current && parseFloat(top.current.style.opacity) <= 0) {
        clearInterval(fadeOut)
        setTimeout(() => {
          setTopSrc(tosrc)
          if (top.current) {
            top.current.style.opacity = '1'
          }
          setBottomSrc(tosrc)
        }, 50)
      }
    }, duration / 50)
  }, [src])

  return (
    <div
      className='w-full h-full flex'
      style={{
        filter: 'blur(3px)',
        transform: 'scale(1.05)',
      }}
    >
      <img
        className='w-full h-full absolute z-0'
        style={{ opacity: '1' }}
        src={bottomSrc}
        ref={bottom}
        alt=''
      />
      <img
        className='w-full h-full absolute z-10'
        style={{ opacity: '1' }}
        src={topSrc}
        ref={top}
        alt=''
      />
    </div>
  )
}

export default CrossfadeImage

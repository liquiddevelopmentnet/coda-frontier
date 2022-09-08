/*
 * Copyright Project Coda, LLC, 2022.
 * All rights reserved.
 */

import { useEffect, useState } from 'react'

import CrossfadeImage from './CrossfadeImage'
import includedBackgrounds from '../function/BackgroundImages'
import { useSafeSettings } from '../pages/settings/SafeSettingsHook'

function BackgroundWrapper() {
  const [imageIndex, setImageIndex] = useState(
    Math.floor(Math.random() * includedBackgrounds.length)
  )

  const settings = useSafeSettings()

  useEffect(() => {
    const itv = setInterval(() => {
      let currentIndex = imageIndex
      while (currentIndex === imageIndex) {
        currentIndex = Math.floor(Math.random() * includedBackgrounds.length)
      }
      setImageIndex(currentIndex)
    }, 20000)

    return () => {
      clearInterval(itv)
    }
  }, [])

  return (
    <div className='-z-10'>
      <div
        className='w-full h-full absolute -z-10 bg-black'
        style={{ opacity: settings('appearance.backgroundImages.dim', 0) / 10 }}
      />
      <div className='w-full h-full absolute -z-20'>
        <CrossfadeImage duration={1000} src={includedBackgrounds[imageIndex]} />
      </div>
    </div>
  )
}

export default BackgroundWrapper

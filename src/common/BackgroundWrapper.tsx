/*
 * Copyright github.com/liquiddevelopmentnet, 2022.
 * All rights reserved. Do not distribute without permission.
 */

import { useEffect, useState } from 'react'

import CrossfadeImage from './CrossfadeImage'
import includedBackgrounds from '../function/BackgroundImages'
import { useSafeSettings } from '../pages/settings/SafeSettingsHook'

function BackgroundWrapper() {
  const [imageIndex, setImageIndex] = useState(0)
  const [imageSrc, setImageSrc] = useState(null)

  const settings = useSafeSettings()
  const customBackgrounds = settings('appearance.backgroundImages.custom', [])

  useEffect(() => {
    if (customBackgrounds.length > 0) {
      setImageIndex(Math.floor(Math.random() * customBackgrounds.length))
      setImageSrc(customBackgrounds[imageIndex])
    }
    const itv = setInterval(() => {
      let currentIndex = imageIndex
      if (
        customBackgrounds.length > 0 &&
        !settings('appearance.backgroundImages.included', true)
      ) {
        currentIndex = Math.floor(Math.random() * customBackgrounds.length)
      }
      if (
        customBackgrounds.length > 0 &&
        settings('appearance.backgroundImages.included', true)
      ) {
        var useCustom = Math.random() < 0.5
        if (useCustom) {
          currentIndex = Math.floor(Math.random() * customBackgrounds.length)
        } else {
          currentIndex = Math.floor(Math.random() * includedBackgrounds.length)
        }
      }
      if (
        customBackgrounds.length === 0 &&
        settings('appearance.backgroundImages.included', true)
      ) {
        currentIndex = Math.floor(Math.random() * includedBackgrounds.length)
      }
      setImageIndex(currentIndex)
    }, 20000)

    return () => {
      clearInterval(itv)
    }
  }, [customBackgrounds])

  return (
    <div className='-z-10'>
      <div
        className='w-full h-full absolute -z-10 bg-black'
        style={{ opacity: settings('appearance.backgroundImages.dim', 0) / 10 }}
      />
      <div className='w-full h-full absolute -z-20'>
        <CrossfadeImage
          duration={1000}
          src={
            customBackgrounds.length > 0
              ? customBackgrounds[imageIndex]
              : includedBackgrounds[imageIndex]
          }
        />
      </div>
    </div>
  )
}

export default BackgroundWrapper

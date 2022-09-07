/*
 * Copyright Project Coda, LLC, 2022.
 * All rights reserved.
 */

import { useEffect, useState } from 'react'

import CrossfadeImage from './CrossfadeImage'
import includedBackgrounds from '../function/BackgroundImages'

function BackgroundWrapper() {
  const [imageIndex, setImageIndex] = useState(
    Math.floor(Math.random() * includedBackgrounds.length)
  )

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
    <div className='w-full h-full absolute -z-10'>
      <CrossfadeImage duration={1000} src={includedBackgrounds[imageIndex]} />
    </div>
  )
}

export default BackgroundWrapper

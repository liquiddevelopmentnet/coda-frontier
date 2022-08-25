/*
 * Copyright Project Coda, LLC, 2022.
 * All rights reserved.
 */

import { useEffect, useState } from 'react'

import CrossfadeImage from './CrossfadeImage'
import a from '../../assets/includedBackgrounds/a.png'
import b from '../../assets/includedBackgrounds/b.png'
import c from '../../assets/includedBackgrounds/c.png'

const includedBackgrounds = [a, b, c]

function BackgroundWrapper() {
  const [imageIndex, setImageIndex] = useState(0)

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
    <div className='w-full h-full absolute'>
      <CrossfadeImage duration={1000} src={includedBackgrounds[imageIndex]} />
    </div>
  )
}

export default BackgroundWrapper

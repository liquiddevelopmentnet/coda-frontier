/*
 * Copyright Project Coda, LLC, 2022.
 * All rights reserved.
 */

import 'rc-slider/assets/index.css'

import {
  BsGearFill,
  BsMusicNoteBeamed,
  BsPlayFill,
  BsSkipEndFill,
  BsStopFill,
  BsVolumeDownFill,
  BsVolumeMuteFill,
  BsVolumeUpFill,
} from 'react-icons/bs'
import React, { useRef, useState } from 'react'

import ReactHowler from 'react-howler'
import SilentSettings from '../function/SilentSettings'
import Slider from 'rc-slider'
import TextTime from './TextTime'
import downtownNewYork from '../assets/soundtrack/downtown-newyork.mp3'
import justAnotherBeautiful from '../assets/soundtrack/just-another-beautiful.mp3'
import ostCoconutBeach from '../assets/soundtrack/coconut-beach.mp3'
import ostSx from '../assets/soundtrack/sx.mp3'
import { useLinkOpener } from '../function/LinkOpener'
import { useTranslations } from '../i18n/i18n'

const soundtracks = [
  {
    name: 'Six',
    src: ostSx,
    artist: 'lazafard',
  },
  {
    name: 'Coconut Beach',
    src: ostCoconutBeach,
    artist: 'lazafard',
  },
  {
    name: 'Downtown New York',
    src: downtownNewYork,
    artist: 'lazafard',
  },
  {
    name: 'Just another beautiful',
    src: justAnotherBeautiful,
    artist: 'lazafard',
  },
]

function Taskbar() {
  const t = useTranslations().t
  const linkOpener = useLinkOpener()

  const [currentSoundtrack, setCurrentSoundtrack] = React.useState<{
    name: string
    src: string | string[]
    artist: string
  }>(soundtracks[Math.floor(Math.random() * soundtracks.length)])

  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.3)
  const howler = useRef<ReactHowler>(null)

  const nextSong = () => {
    setIsPlaying(false)
    howler.current?.howler.stop()
    let currentSong = currentSoundtrack
    while (currentSong === currentSoundtrack) {
      currentSong = soundtracks[Math.floor(Math.random() * soundtracks.length)]
    }
    setCurrentSoundtrack(currentSong)
    howler.current?.howler.play()
    setIsPlaying(true)
  }

  React.useEffect(() => {
    SilentSettings.conf('background_music', true)
    setIsPlaying(SilentSettings.get('background_music'))

    howler.current?.howler.on('end', () => {
      nextSong()
    })

    return () => {
      setIsPlaying(false)
    }
  }, [])

  return (
    <>
      <ReactHowler
        src={currentSoundtrack.src}
        playing={isPlaying}
        volume={0.3}
        ref={howler}
      />
      <div className='h-[30px] fixed bottom-0 w-screen bg-slate-800 flex justify-between px-3 gap-2 z-20'>
        <div className='h-full flex items-center gap-1'>
          <BsMusicNoteBeamed color='white' className='my-auto mr-1' />
          <div className='flex mr-3 ml-2'>
            {isPlaying ? (
              <BsStopFill
                color='white'
                className='my-auto cursor-pointer hover:opacity-80'
                onClick={() => {
                  setIsPlaying(false)
                  SilentSettings.set('background_music', false)
                }}
              />
            ) : (
              <BsPlayFill
                color='white'
                className='my-auto cursor-pointer hover:opacity-80'
                onClick={() => {
                  setIsPlaying(true)
                  SilentSettings.set('background_music', true)
                }}
              />
            )}
            <BsSkipEndFill
              color='white'
              className='my-auto cursor-pointer hover:opacity-80'
              onClick={() => {
                nextSong()
              }}
            />
            <div className='ml-3' />
            {volume === 0 && <BsVolumeMuteFill color='white' />}
            {volume > 0 && volume < 0.4 && <BsVolumeDownFill color='white' />}
            {volume >= 0.4 && <BsVolumeUpFill color='white' />}
            <div className='h-3 w-14 my-auto ml-2 overflow-visible'>
              <Slider
                onChange={(nextValues: any) => {
                  let targetVolume = Math.round(nextValues * 10) / 10
                  setVolume(targetVolume)
                  howler.current?.howler.volume(targetVolume)
                }}
                min={0}
                max={1}
                defaultValue={volume}
                step={0.01}
              />
            </div>
          </div>
          <p className='text-white my-auto text-sm'>
            {isPlaying
              ? t('Taskbar.Music.NowPlaying')
              : t('Taskbar.Music.Paused')}
            : <span className='font-bold'>{currentSoundtrack.name}</span>
            {` ${t('Taskbar.Music.By')} `}
            <span className='font-bold'>{currentSoundtrack.artist}</span>
          </p>
        </div>
        <div className='h-full flex items-center gap-3'>
          <BsGearFill
            color='white'
            className='my-auto mr-1 w-3 cursor-pointer hover:opacity-80'
          />
          <Divider />
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='27'
            height='11'
            viewBox='0 0 71 55'
            fill='none'
            className='my-auto cursor-pointer hover:opacity-80'
            onClick={() => {
              linkOpener.open('https://discord.gg/KvVJ2PJsjj')
            }}
          >
            <g clipPath='url(#clip0)'>
              <path
                d='M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z'
                fill='#ffffff'
              />
            </g>
            <defs>
              <clipPath id='clip0'>
                <rect width='71' height='55' fill='white' />
              </clipPath>
            </defs>
          </svg>
          <Divider />
          <TextTime />
        </div>
      </div>
    </>
  )
}

const Divider = () => {
  return <div className='w-[1px] h-[15px] my-auto ml-4 mr-4 bg-slate-700' />
}

export default Taskbar

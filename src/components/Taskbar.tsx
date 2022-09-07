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

import { FaDiscord } from 'react-icons/fa'
import ReactHowler from 'react-howler'
import SilentSettings from '../function/SilentSettings'
import Slider from 'rc-slider'
import TextTime from './TextTime'
import downtownNewYork from '../assets/soundtrack/downtown-newyork.mp3'
import justAnotherBeautiful from '../assets/soundtrack/just-another-beautiful.mp3'
import ostCoconutBeach from '../assets/soundtrack/coconut-beach.mp3'
import ostSx from '../assets/soundtrack/sx.mp3'
import { settingsWindowState } from '../recoil/atoms'
import { useLinkOpener } from '../function/LinkOpener'
import { useRecoilState } from 'recoil'
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

  const [settingsWindow, setSettingsWindow] =
    useRecoilState(settingsWindowState)

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

    return () => {
      setIsPlaying(false)
    }
  }, [])

  return (
    <div>
      <ReactHowler
        src={currentSoundtrack.src}
        playing={isPlaying}
        volume={0.3}
        ref={howler}
        onEnd={nextSong}
      />
      <div className='h-[30px] fixed bottom-0 w-screen bg-slate-800 flex justify-between px-3 gap-2 z-40'>
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
          <p className='text-white my-auto text-xs'>
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
            size={12}
            className='my-auto mr-1 cursor-pointer hover:opacity-80'
            onClick={() => {
              setSettingsWindow(!settingsWindow)
            }}
          />
          <Divider />
          <FaDiscord
            color='white'
            size={16}
            className='my-auto cursor-pointer hover:opacity-80'
            onClick={() => {
              linkOpener.open('https://discord.gg/KvVJ2PJsjj')
            }}
          />
          <Divider />
          <TextTime />
        </div>
      </div>
    </div>
  )
}

const Divider = () => {
  return <div className='w-[1px] h-[15px] my-auto ml-4 mr-4 bg-slate-700' />
}

export default Taskbar

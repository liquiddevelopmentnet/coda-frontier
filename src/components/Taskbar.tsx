/*
 * Copyright github.com/liquiddevelopmentnet, 2022.
 * All rights reserved. Do not distribute without permission.
 */

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
import { settingsWindowState, showRootContentState } from '../recoil/atoms'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import { FaDiscord } from 'react-icons/fa'
import ReactHowler from 'react-howler'
import SilentSettings from '../function/SilentSettings'
import Slider from 'rc-slider'
import TextTime from './TextTime'
import soundtracks from '../function/Soundtrack'
import { useLinkOpener } from '../function/LinkOpener'
import { useTranslations } from '../i18n/i18n'

function Taskbar() {
  const t = useTranslations()
  const linkOpener = useLinkOpener()

  const [settingsWindow, setSettingsWindow] =
    useRecoilState(settingsWindowState)

  const setShowRootContent = useSetRecoilState(showRootContentState)

  const [currentSoundtrack, setCurrentSoundtrack] = React.useState<{
    name: string
    src: string | string[]
    artist: string
  }>(soundtracks[0])

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
    <div
      onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'MediaTrackNext') {
          e.preventDefault()
          nextSong()
        } else if (e.key === 'MediaPlayPause') {
          e.preventDefault()
          SilentSettings.set('background_music', !isPlaying)
          setIsPlaying(!isPlaying)
        } else if (e.key === 'MediaStop') {
          e.preventDefault()
          setIsPlaying(false)
          SilentSettings.set('background_music', false)
        }
      }}
      tabIndex={10000}
    >
      <ReactHowler
        src={currentSoundtrack.src}
        playing={isPlaying}
        volume={0.3}
        ref={howler}
        onEnd={nextSong}
      />
      <div className='h-[30px] fixed bottom-0 w-screen flex justify-between px-3 gap-2 z-40 select-none'>
        <div className='h-full flex items-center gap-1'>
          <BsMusicNoteBeamed color='white' className='my-auto mr-1' />
          <div className='flex mr-3 ml-2 overflow-visible'>
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
            <div className='h-3 w-14 my-auto mb-[4px] ml-2 overflow-visible'>
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
        <div className='h-full flex items-center'>
          <BsGearFill
            color='white'
            size={12}
            className='my-auto mr-1 cursor-pointer hover:opacity-80'
            onClick={() => {
              setShowRootContent(settingsWindow)
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
  return <div className='w-[1px] h-[15px] my-auto ml-4 mr-4 bg-gray-400' />
}

export default Taskbar

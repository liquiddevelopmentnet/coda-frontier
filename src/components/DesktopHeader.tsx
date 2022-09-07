/*
 * Copyright Project Coda, LLC, 2022.
 * All rights reserved.
 */

import { CgClose } from 'react-icons/cg'
import { GiSquare } from 'react-icons/gi'
import { VscChromeMinimize } from 'react-icons/vsc'
import { electronState } from '../recoil/atoms'
import { useRecoilValue } from 'recoil'
import { useTranslations } from '../i18n/i18n'

function DesktopHeader() {
  const t = useTranslations().t

  const electron = useRecoilValue(electronState)

  return (
    <>
      {electron.is && (
        <div className='h-[22px] w-screen drag-region bg-slate-800 flex justify-between'>
          <p className='text-white jetbrains-regular text-xs ml-2 my-auto'>
            {t('Header.AppName')}
          </p>
          <div className='flex h-full drag-region-reserve'>
            <div
              onClick={() => {
                electron.ipc.send('window_minimize')
              }}
              className='h-full flex w-7 hover:bg-slate-700 cursor-pointer'
            >
              <VscChromeMinimize color='white' className='m-auto' />
            </div>
            <div
              onClick={() => {
                electron.ipc.send('window_toggle_maximize')
              }}
              className='h-full flex w-7 hover:bg-slate-700 cursor-pointer'
            >
              <GiSquare color='white' size={10} className='m-auto' />
            </div>
            <div
              onClick={() => {
                electron.ipc.send('window_close')
              }}
              className='h-full flex w-7 hover:bg-red-500 cursor-pointer'
            >
              <CgClose color='white' className='m-auto' />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default DesktopHeader

/*
 * Copyright Project Coda, LLC, 2022.
 * All rights reserved.
 */

import {
  VscChromeClose,
  VscChromeMaximize,
  VscChromeMinimize,
} from 'react-icons/vsc'

import { appWindow } from '@tauri-apps/api/window'
import { useTranslations } from '../i18n/i18n'

declare const window: any

function DesktopHeader() {
  const t = useTranslations()

  return (
    <>
      {window.__TAURI__ && (
        <div
          data-tauri-drag-region
          className='h-[22px] w-screen drag-region bg-slate-800 flex justify-between z-50'
        >
          <p className='text-white jetbrains-regular text-xs ml-2 my-auto'>
            {t('Header.AppName')}
          </p>
          <div className='flex h-full drag-region-reserve'>
            <div
              onClick={() => {
                appWindow.minimize()
              }}
              className='h-full flex w-7 hover:bg-slate-700 cursor-pointer'
            >
              <VscChromeMinimize color='white' className='m-auto' />
            </div>
            <div
              onClick={() => {
                appWindow.toggleMaximize()
              }}
              className='h-full flex w-7 hover:bg-slate-700 cursor-pointer'
            >
              <VscChromeMaximize color='white' className='m-auto' />
            </div>
            <div
              onClick={() => {
                appWindow.close()
              }}
              className='h-full flex w-7 hover:bg-red-500 cursor-pointer'
            >
              <VscChromeClose color='white' size={16} className='m-auto' />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default DesktopHeader

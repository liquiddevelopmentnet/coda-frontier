/*
 * Copyright github.com/liquiddevelopmentnet, 2022.
 * All rights reserved. Do not distribute without permission.
 */

import { useRecoilState, useRecoilValue } from 'recoil'

import ActivityIndicator from '../../../../components/ActivityIndicator'
import Badge from '../../../../components/Badge'
import CommonButton from '../../../../components/CommonButton'
import ReactCommonmark from 'react-commonmark'
import SettingsNotice from '../../components/SettingsNotice'
import SettingsSection from '../../components/SettingsSection'
import { User } from '../../../../function/Gateway'
import { codaToast } from '../../../../function/Toaster'
import { settingsUserState } from '../../../Settings'
import { tokenState } from '../../../../recoil/atoms'
import { useMemo } from 'react'
import { useTranslations } from '../../../../i18n/i18n'

function ProfileSettings() {
  const t = useTranslations()
  const [token, setToken] = useRecoilState(tokenState)
  const user = useRecoilValue(settingsUserState)

  return (
    <div className='w-full h-full flex flex-col'>
      <SettingsSection title='Profile' f />
      {token.access == null && token.refresh == null ? (
        <SettingsNotice text={t('Settings.UserSettings.Profile.NotLoggedIn')} />
      ) : (
        <div className='flex flex-col w-full h-full'>
          {user == null ? (
            <ActivityIndicator />
          ) : (
            <div className='w-full'>
              <div className='bg-slate-900 bg-opacity-60 rounded-[4px] flex flex-col p-7 space-y-5'>
                <div className='items-center flex w-full gap-4'>
                  <img
                    src={user.avatar}
                    className='w-14 h-14 rounded-full shadow-lg border-2 border-pink-500'
                  />
                  <div>
                    <p className='text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500 text-2xl font-bold'>
                      {user.username}
                    </p>
                    <p className='text-gray-400 text-xs mb-auto'>
                      {user.email}
                    </p>
                  </div>
                  <div className='flex ml-7'>
                    {user.badges.map((badge, index) => (
                      <Badge key={index} badge={badge} />
                    ))}
                  </div>
                </div>
                <div className='text-gray-400 text-sm'>
                  <ReactCommonmark source={user.bio} skipHtml />
                </div>
              </div>
            </div>
          )}
          <div className='mt-4 mb-4 bg-gray-500 opacity-20 h-[1px] w-full' />
          <div className='flex space-x-4 mb-10'>
            <CommonButton
              label='Change Password'
              type='secondary'
              onClick={() => {
                codaToast({ type: 'error', message: 'indev' })
              }}
            />
          </div>
          <SettingsSection title='Danger Zone' />
          <div className='flex space-x-4'>
            <div className='bg-red-500 bg-opacity-20 rounded-[4px] flex flex-col p-4 space-y-2 w-full'>
              <div className='flex'>
                <CommonButton
                  label='Delete Account'
                  type='error'
                  onClick={() => {
                    codaToast({ type: 'error', message: 'indev' })
                  }}
                />
              </div>
              <SettingsNotice
                opacity={50}
                text='**Note:** This will delete your account, this action is irreversible.'
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProfileSettings

/*
 * Copyright Project Coda, LLC, 2022.
 * All rights reserved.
 */

import { useRef, useState } from 'react'

import BackgroundWrapper from '../common/BackgroundWrapper'
import ClassicPanel from '../components/ClassicPanel'
import CommonButton from '../components/CommonButton'
import CommonInput from '../components/CommonInput'
import HintWithLinkAfter from '../components/HintWithLinkAfter'
import SilentSettings from '../function/SilentSettings'
import logo from '../assets/images/logo.png'
import { tokenState } from '../recoil/atoms'
import { useApi } from '../function/ApiWrapper'
import { useSetRecoilState } from 'recoil'
import { useTranslations } from '../i18n/i18n'

function LogIn() {
  const t = useTranslations().t

  const username = useRef<HTMLInputElement>(null)
  const password = useRef<HTMLInputElement>(null)

  const [usernameError, setUsernameError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const [error, setError] = useState('')

  const api = useApi()

  const setToken = useSetRecoilState(tokenState)

  return (
    <div className='w-full h-full flex select-none font-mono'>
      <BackgroundWrapper />
      <ClassicPanel error={error}>
        <img src={logo} className='w-12 mb-4 my-auto' alt='logo' />
        <div className='text-center'>
          <p className='text-black text-3xl font-bold mb-1'>
            {t('LogIn.Title')}
          </p>
          <p className='text-gray-800 text-base mb-10'>{t('LogIn.Subtitle')}</p>
        </div>
        <CommonInput
          type='text'
          placeholder={t('LogIn.Username')}
          ref={username}
          error={usernameError}
          aborter={() => {
            setUsernameError('')
          }}
        />
        <CommonInput
          type='password'
          placeholder={t('LogIn.Password')}
          ref={password}
          error={passwordError}
          aborter={() => {
            setPasswordError('')
          }}
        />
        <div className='mb-12' />
        {/*<ReCAPTCHA
              sitekey="6LeJm2ghAAAAABTf-6uB-MAv7CDoX6v2KIZSFH4Z"
              onChange={onChange}
            />*/}
        <CommonButton
          type='primary'
          label={t('LogIn.SubmitButton')}
          onClick={() => {
            setError('')
            var exec = true
            if (username.current?.value.trim() === '') {
              setUsernameError(t('General.FormFieldEmptyError'))
              exec = false
            }
            if (password.current?.value.trim() === '') {
              setPasswordError(t('General.FormFieldEmptyError'))
              exec = false
            }
            if (!exec) return
            api
              .make(
                ['Gateway', 'LogIn'],
                'POST',
                {
                  username: username.current?.value,
                  password: password.current?.value,
                },
                err => {
                  setError(err)
                }
              )
              .then(result => {
                if (result.error) {
                  setError(result.errorMessage!)
                  return
                }

                SilentSettings.set('refreshToken', result.data.refreshToken!)
                SilentSettings.set('accessToken', result.data.authToken!)

                setToken({
                  refresh: result.data.refreshToken!,
                  access: result.data.authToken!,
                })

                console.log('Successfully logged in')
              })
          }}
        />
        <HintWithLinkAfter
          hint={t('LogIn.Hint')}
          linkText={t('LogIn.HintLink')}
          link='/signup'
        />
      </ClassicPanel>
    </div>
  )
}

export default LogIn

/*
 * Copyright Project Coda, LLC, 2022.
 * All rights reserved.
 */

import {
  flashState,
  rootViewState,
  taskbarState,
  tokenState,
} from '../recoil/atoms'
import { useEffect, useRef, useState } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'

import ClassicPanel from '../components/ClassicPanel'
import CommonButton from '../components/CommonButton'
import CommonInput from '../components/CommonInput'
import HintWithLinkAfter from '../components/HintWithLinkAfter'
import SignUp from './SignUp'
import SilentSettings from '../function/SilentSettings'
import logo from '../assets/images/blk_logo.png'
import { useApi } from '../function/ApiWrapper'
import { useTranslations } from '../i18n/i18n'

function LogIn({ signUpReferred = false }: { signUpReferred?: boolean }) {
  const t = useTranslations()

  const username = useRef<HTMLInputElement>(null)
  const password = useRef<HTMLInputElement>(null)

  const [usernameError, setUsernameError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const [error, setError] = useState('')

  const [flash, setFlash] = useRecoilState(flashState)
  const setRootView = useSetRecoilState(rootViewState)

  const api = useApi()

  const setToken = useSetRecoilState(tokenState)
  const setTaskbar = useSetRecoilState(taskbarState)

  useEffect(() => {
    if (signUpReferred) {
      setTimeout(() => {
        setFlash(false)
        setTaskbar(true)
      }, 1000)
    }
  }, [])

  return (
    <div className='w-full h-full flex select-none font-mono'>
      <ClassicPanel error={error}>
        <img src={logo} className='w-12 mb-4 my-auto' alt='logo' />
        <div className='text-center'>
          <p className='text-black text-3xl font-bold mb-1'>
            {t('LogIn.Title')}
          </p>
          <p className='text-gray-800 text-base mb-12'>{t('LogIn.Subtitle')}</p>
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
        <div className='mb-5' />
        <CommonInput
          type='password'
          placeholder={t('LogIn.Password')}
          ref={password}
          error={passwordError}
          aborter={() => {
            setPasswordError('')
          }}
        />
        <div className='mb-16' />
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
        <div className='mb-6' />
        <HintWithLinkAfter
          hint={t('LogIn.Hint')}
          linkText={t('LogIn.HintLink')}
          onClick={() => {
            setFlash(true)
            setTaskbar(false)
            setTimeout(() => {
              setRootView(<SignUp loginReferred />)
            }, 1000)
          }}
        />
      </ClassicPanel>
    </div>
  )
}

export default LogIn

/*
 * Copyright Project Coda, LLC, 2022.
 * All rights reserved.
 */

import { useRef, useState } from 'react'

import ApiWrapper from '../function/ApiWrapper'
import BackgroundWrapper from '../common/BackgroundWrapper'
import ClassicPanel from '../components/ClassicPanel'
import CommonButton from '../components/CommonButton'
import HintWithLinkAfter from '../components/HintWithLinkAfter'
import { hostUrlState } from '../recoil/selectors'
import logo from '../assets/images/logo.png'
import { useRecoilValue } from 'recoil'
import { useTranslations } from '../i18n/i18n'

function LogIn() {
  const t = useTranslations().t

  const username = useRef<HTMLInputElement>(null)
  const password = useRef<HTMLInputElement>(null)

  const [error, setError] = useState('')

  const host = useRecoilValue(hostUrlState)

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
        <input
          className='w-[400px] transition-colors duration-200 p-2 border-b-2 border-gray-300 focus:outline-none focus:border-pink-500'
          type='text'
          placeholder={t('LogIn.Username')}
          ref={username}
        />
        <input
          className='w-[400px] transition-colors duration-200 p-2 border-b-2 border-gray-300 focus:outline-none focus:border-pink-500 mb-12'
          type='password'
          placeholder={t('LogIn.Password')}
          ref={password}
        />
        {/*<ReCAPTCHA
              sitekey="6LeJm2ghAAAAABTf-6uB-MAv7CDoX6v2KIZSFH4Z"
              onChange={onChange}
            />*/}
        <CommonButton
          type='primary'
          label={t('LogIn.SubmitButton')}
          onClick={() => {
            ApiWrapper.ApiCall(host, ['Gateway', 'LogIn'], 'POST', {
              username: username.current?.value,
              password: password.current?.value,
            })
              .then(res => {
                console.log(res)
              })
              .catch(err => {
                setError(err.message)
              })
              .finally(() => {
                // TODO: Finish login process
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

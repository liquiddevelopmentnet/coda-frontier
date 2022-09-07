/*
 * Copyright Project Coda, LLC, 2022.
 * All rights reserved.
 */

import 'reactjs-popup/dist/index.css'

import Terminal, {
  captcha,
  ermt,
  print,
  prmt,
  type,
} from '../components/Terminal'
import { useEffect, useState } from 'react'

import { CSSTransition } from 'react-transition-group'
import LogIn from './LogIn'
import { rootViewState } from '../recoil/atoms'
import { useSetRecoilState } from 'recoil'
import { useTranslations } from '../i18n/i18n'
import version from '../data/version.json'

function SignUp() {
  const t = useTranslations().t

  const [flash, setFlash] = useState(false)
  const setRootView = useSetRecoilState(rootViewState)

  useEffect(() => {
    if (flash) {
      setTimeout(() => {
        setRootView(<LogIn signUpReferred />)
      }, 1000)
    }
  }, [flash])

  return (
    <div className='bg-black w-full h-full'>
      <CSSTransition
        classNames={'simple-opacity'}
        timeout={500}
        in={flash}
        unmountOnExit
      >
        <div className='bg-white w-full h-full absolute pointer-events-none z-30' />
      </CSSTransition>
      <Terminal
        cycle={[
          print(`Coda Host (${version.stage}) ${version.id} (${version.rev})`),
          print('(c) Project Coda, LLC. All rights reserved.'),
          print(''),
          ermt(
            `${t('SignUp.Prompt.AlreadyHaveAccount')} [Y/n]`,
            (val, print) => {
              if (val.toLowerCase() == 'y') {
                setTimeout(() => setFlash(true), 10)
                return false
              } else {
                return true
              }
            }
          ),
          type(t('SignUp.Welcome')),
          type(''),
          prmt(t('SignUp.Prompt.Username'), 'name'),
          prmt(t('SignUp.Prompt.Email'), 'email'),
          prmt(t('SignUp.Prompt.Password'), 'password'),
          prmt(t('SignUp.Prompt.PasswordConfirm'), 'passwordRepeat'),
          type(t('SignUp.Captcha.Announcement')),
          1000,
          captcha(t('SignUp.Captcha.Prompt'), val => {
            console.log('captcha val:')
            console.log(val)
          }),
          type(t('SignUp.Captcha.Success')),
          type(''),
          type(t('SignUp.Done')),
        ]}
        promptText='coda:~ $'
        callback={data => {
          console.log('from signup > ', data)
          setTimeout(() => setFlash(true), 1000)
        }}
      />
    </div>
  )
}

export default SignUp

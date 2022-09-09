/*
 * Copyright Project Coda, LLC, 2022.
 * All rights reserved.
 */

import 'reactjs-popup/dist/index.css'

import Terminal, {
  captcha,
  clear,
  ermt,
  print,
  prmt,
  type,
} from '../components/Terminal'
import { flashState, rootViewState } from '../recoil/atoms'
import { useRecoilState, useSetRecoilState } from 'recoil'

import LogIn from './LogIn'
import languageSettings from '../i18n/language/_settings.json'
import { useEffect } from 'react'
import { useSettings } from './settings/Settings'
import { useTranslations } from '../i18n/i18n'
import version from '../data/version.json'

function SignUp({ loginReferred = false }: { loginReferred?: boolean }) {
  const t = useTranslations()

  const [flash, setFlash] = useRecoilState(flashState)
  const setRootView = useSetRecoilState(rootViewState)

  const settings = useSettings()

  useEffect(() => {
    if (loginReferred) {
      setTimeout(() => {
        setFlash(false)
      }, 1000)
    }
  }, [])

  const languages = Object.keys(languageSettings.languageNames).map(
    // @ts-ignore
    x => print(`[${x}] ${languageSettings.languageNames[x]}`)
  )

  return (
    <div className='bg-black w-full h-full'>
      <Terminal
        cycle={[
          print(`Coda Host (${version.stage}) ${version.id} (${version.rev})`),
          print('(c) Project Coda, LLC. All rights reserved.'),
          print(''),
          print('You can press Ctrl+C at any time to cancel the wizard.'),
          print(''),
          ermt(
            `${t('SignUp.Prompt.AlreadyHaveAccount')} [Y/n]`,
            (val, print) => {
              if (val.toLowerCase() == 'y') {
                setTimeout(() => {
                  setFlash(true)
                  setTimeout(() => {
                    setRootView(<LogIn signUpReferred />)
                  }, 1000)
                }, 1000)
                return false
              } else if (val.toLowerCase() == 'n') {
                return true
              } else {
                print('Invalid input. Please try again.')
                return false
              }
            }
          ),
          type('Please select a language, following options are available:'),
          ...languages,
          ermt(``, (val, print) => {
            if (Object.keys(languageSettings.languageNames).includes(val)) {
              settings.set('language', val)
              return true
            } else {
              print('Invalid language selected, please try again.')
              return false
            }
          }),
          type('Okay...'),
          1000,
          clear(),
          type('SignUp.Welcome'),
          type(''),
          prmt('SignUp.Prompt.Username', 'name'),
          prmt('SignUp.Prompt.Email', 'email'),
          prmt('SignUp.Prompt.Password', 'password'),
          prmt('SignUp.Prompt.PasswordConfirm', 'passwordRepeat'),
          type('SignUp.Captcha.Announcement'),
          1000,
          captcha('SignUp.Captcha.Prompt', val => {
            console.log('captcha val:')
            console.log(val)
          }),
          type('SignUp.Captcha.Success'),
          type(''),
          type('SignUp.Done'),
        ]}
        promptText='coda:~ $'
        callback={data => {
          console.log('from signup > ', data)
          setTimeout(
            () => {
              setFlash(true)
              setTimeout(() => {
                setRootView(<LogIn signUpReferred />)
              }, 1000)
            },
            data != null ? 1000 : 0
          )
        }}
      />
    </div>
  )
}

export default SignUp

/*
 * Copyright Project Coda, LLC, 2022.
 * All rights reserved.
 */

import 'reactjs-popup/dist/index.css'

import Terminal, {
  captcha,
  clear,
  ermt,
  getData,
  print,
  prmt,
  type,
} from '../components/Terminal'
import { flashState, rootViewState, tokenState } from '../recoil/atoms'
import { useRecoilState, useSetRecoilState } from 'recoil'

import Dashboard from './Dashboard'
import LogIn from './LogIn'
import SilentSettings from '../function/SilentSettings'
import languageSettings from '../i18n/language/_settings.json'
import { useDiscordRpc } from '../function/DiscordRpc'
import { useEffect } from 'react'
import { useGateway } from '../function/Gateway'
import { useSettings } from './settings/Settings'
import { useTranslations } from '../i18n/i18n'
import version from '../data/version.json'

function SignUp({ loginReferred = false }: { loginReferred?: boolean }) {
  const t = useTranslations()

  const [flash, setFlash] = useRecoilState(flashState)
  const setRootView = useSetRecoilState(rootViewState)

  const settings = useSettings()

  const drpc = useDiscordRpc()

  useEffect(() => {
    drpc('Sign Up Wizard', '')
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

  var initialData: any = {}

  const gateway = useGateway()
  const setToken = useSetRecoilState(tokenState)

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
                return 'break'
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
          prmt('SignUp.Prompt.Username', 'username'),
          prmt('SignUp.Prompt.Email', 'email'),
          ermt('SignUp.Prompt.Password', (val, print) => {
            initialData['password'] = val
            return true
          }),
          ermt('SignUp.Prompt.PasswordConfirm', (val, print) => {
            if (val == initialData['password']) {
              return true
            } else {
              return false
            }
          }),
          type('SignUp.Captcha.Announcement'),
          1000,
          captcha('SignUp.Captcha.Prompt', val => {
            initialData['captcha'] = val
            console.log(val)
          }),
          type('SignUp.Captcha.Success'),
          type(''),
          type('SignUp.SignUpProcess'),
          getData(async data => {
            data = { ...data, ...initialData }

            const signUpResult = await gateway.signUp(data)
            if (signUpResult[0] == true) {
              const loginResult = await gateway.login({
                username: data.username,
                password: data.password,
              })
              const userDetails = await gateway.getUser({
                uuid: loginResult[1],
              })

              console.log(signUpResult)
              console.log(loginResult)
              console.log(userDetails)

              SilentSettings.set('refreshToken', loginResult[2])
              SilentSettings.set('accessToken', loginResult[3])

              setToken({
                refresh: loginResult[2]!,
                access: loginResult[3]!,
              })
            }
          }),
          type('SignUp.SignUpProcess.Success'),
          type(''),
          type('SignUp.Done'),
        ]}
        promptText='coda:~ $'
        callback={async d => {
          setTimeout(
            () => {
              setFlash(true)
              setTimeout(() => {
                setRootView(
                  d == null ? (
                    <LogIn signUpReferred />
                  ) : (
                    <Dashboard finishFlash />
                  )
                )
              }, 1000)
            },
            d != null ? 1000 : 0
          )
        }}
      />
    </div>
  )
}

export default SignUp

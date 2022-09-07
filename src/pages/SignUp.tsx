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

function SignUp() {
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
          print('Coda Host [Version 10.0.19044.1889]'),
          print('(c) Project Coda, LLC. All rights reserved.'),
          print(''),
          ermt('Do you already have an account? [Y/n]', (val, print) => {
            if (val.toLowerCase() == 'y') {
              setTimeout(() => setFlash(true), 10)
              return false
            } else {
              return true
            }
          }),
          type('Welcome to the sign up wizard.'),
          type(''),
          prmt('Please enter your new username: ', 'name'),
          prmt('Please enter your email address: ', 'email'),
          prmt('Please enter your new password: ', 'password'),
          prmt('Please confirm your new password: ', 'passwordRepeat'),
          type('Initializing verification sequence...'),
          1000,
          captcha(val => {
            console.log('captcha val:')
            console.log(val)
          }),
          type('Verification sequence... done.'),
          type(''),
          type('Initializing teleportation sequence...'),
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

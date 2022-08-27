/*
 * Copyright Project Coda, LLC, 2022.
 * All rights reserved.
 */

import Terminal, { clear, ermt, prmt, type } from '../components/Terminal'
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
          type('Coda Host [Version 10.0.19044.1889]'),
          type('(c) Project Coda, LLC. All rights reserved.'),
          type(''),
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
          prmt('Please enter your full name: ', 'name'),
          prmt('Please enter your email address: ', 'email'),
          prmt('Please enter your new password: ', 'password'),
          prmt('Please confirm your new password: ', 'passwordRepeat'),
          type(''),
          type('Injecting databases... 25%'),
          1000,
          type('Injecting databases... 75%'),
          1000,
          type('Injecting databases... done.'),
          type(''),
          type('Creating user...'),
          1000,
          type('Creating user... done.'),
          type(''),
          type('Creating session...'),
          1000,
          type('Creating session... done.'),
          3000,
          clear(),
          100,
          type('Welcome to Project Coda!'),
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

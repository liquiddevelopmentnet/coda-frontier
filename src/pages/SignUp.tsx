/*
 * Copyright Project Coda, LLC, 2022.
 * All rights reserved.
 */

import Terminal, { clear, ermt, prmt, type } from '../components/Terminal'

function SignUp() {
  return (
    <div className='bg-black w-full h-full'>
      <div className='bg-white w-full h-full absolute opacity-0 pointer-events-none' />
      {/* TODO: flash overlay */}
      <Terminal
        cycle={[
          type('Coda Host [Version 10.0.19044.1889]'),
          type('(c) Project Coda, LLC. All rights reserved.'),
          type(''),
          ermt('Do you already have an account? [Y/n]', (val, print) => {
            print(`You entered ${val}`)
            return val.toLowerCase() == 'n'
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
        }}
      />
    </div>
  )
}

export default SignUp

/*
 * Copyright Project Coda, LLC, 2022.
 * All rights reserved.
 */

import Terminal from '../components/Terminal'

function SignUp() {
  return (
    <div className='bg-black w-full h-full'>
      <div className='bg-white w-full h-full absolute opacity-0 pointer-events-none' />
      {/* TODO: flash overlay */}
      <Terminal />
    </div>
  )
}

export default SignUp

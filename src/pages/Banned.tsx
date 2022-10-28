/*
 * Copyright github.com/liquiddevelopmentnet, 2022.
 * All rights reserved. Do not distribute without permission.
 */

// DEPRECATED: This may be replaced by a more robust solution soon(tm).
function Banned() {
  return (
    <div className='w-full h-full bg-gradient-to-br from-red-500 to-pink-500 flex select-none font-mono'>
      <div className='m-auto flex flex-col items-center gap-2 text-black bg-white p-14 px-24 rounded-[4px]'>
        <svg
          className='w-16'
          fill='currentColor'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
        >
          <path d='M18 10v-4c0-3.313-2.687-6-6-6s-6 2.687-6 6v4h-3v14h18v-14h-3zm-10 0v-4c0-2.206 1.794-4 4-4s4 1.794 4 4v4h-8z' />
        </svg>
        <p className='font-bold text-2xl mt-10'>Banned</p>
        <p className='text-lg'>You are banned from multiplayer mode.</p>
        <p className='text-lg mt-5'>
          <span className='font-bold'>Reason:</span> Inappropriate chat
          behaviour
        </p>
        <div className='p-2 w-full bg-gradient-to-br from-red-500 to-pink-500 rounded-[4px] mt-12 cursor-pointer hover:opacity-80 transition-opacity duration-200 shadow-lg'>
          <p className='text-white pointer-events-none text-center'>Go back</p>
        </div>
      </div>
    </div>
  )
}

export default Banned

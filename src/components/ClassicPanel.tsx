/*
 * Copyright github.com/liquiddevelopmentnet, 2022.
 * All rights reserved. Do not distribute without permission.
 */

import React from 'react'

function ClassicPanel({
  error,
  children,
}: {
  error: any
  children: React.ReactNode
}) {
  return (
    <div className='bg-white bg-opacity-80 m-auto p-7 rounded-[4px] flex flex-col items-center z-20 shadow-2xl'>
      {children}
      <p className='text-xs text-red-500 mt-4'>{error}</p>
    </div>
  )
}

export default ClassicPanel

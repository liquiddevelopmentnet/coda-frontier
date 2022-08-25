/*
 * Copyright Project Coda, LLC, 2022.
 * All rights reserved.
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
    <div className='bg-white m-auto p-7 rounded-[4px] flex flex-col gap-4 items-center z-20 shadow-2xl'>
      {children}
      <p className='text-xs text-red-500'>{error}</p>
    </div>
  )
}

export default ClassicPanel

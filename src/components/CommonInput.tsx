/*
 * Copyright Project Coda, LLC, 2022.
 * All rights reserved.
 */

import React from 'react'

const CommonInput = React.forwardRef((props: any, ref: any) => (
  <div>
    <input
      className='w-[400px] bg-transparent transition-colors duration-200 p-2 border-b-2 border-gray-400 focus:outline-none focus:border-pink-500 placeholder-gray-600'
      type={props.type}
      placeholder={props.placeholder}
      required
      ref={ref}
      onInput={props.aborter}
    />
    <p className='text-red-500 text-xs mt-2'>{props.error}</p>
  </div>
))

export default CommonInput

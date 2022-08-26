import React from 'react'

const CommonInput = React.forwardRef((props: any, ref: any) => (
  <div>
    <input
      className='w-[400px] transition-colors duration-200 p-2 border-b-2 border-gray-300 focus:outline-none focus:border-pink-500'
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

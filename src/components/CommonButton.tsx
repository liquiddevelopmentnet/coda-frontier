/*
 * Copyright Project Coda, LLC, 2022.
 * All rights reserved.
 */

import { CgSpinner } from 'react-icons/cg'

function CommonButton({
  type,
  label,
  onClick,
  loading = false,
  disabled = false,
  dominant = false,
  scaleOnHover = false,
}: {
  type: 'primary' | 'secondary' | 'success' | 'error'
  label: string
  onClick: () => void
  loading?: boolean
  disabled?: boolean
  dominant?: boolean
  scaleOnHover?: boolean
}) {
  const primaryClasses = 'bg-gradient-to-r from-red-500 to-pink-500'
  const secondaryClasses = 'bg-gray-500 bg-opacity-50'
  const successClasses = 'bg-green-400 bg-opacity-60'
  const errorClasses = 'bg-red-500 bg-opacity-90'

  var classes

  switch (type) {
    case 'primary':
      classes = primaryClasses
      break
    case 'secondary':
      classes = secondaryClasses
      break
    case 'success':
      classes = successClasses
      break
    case 'error':
      classes = errorClasses
      break
    default:
      classes = primaryClasses
      break
  }

  return (
    <div
      className={`${
        dominant
          ? 'w-full h-[40px] px-4 text-base'
          : 'min-w-fit p-[30px] px-4 text-sm'
      } rounded-[4px] duration-200 shadow-xl flex ${
        loading || disabled
          ? 'cursor-not-allowed'
          : 'cursor-pointer hover:opacity-80'
      } ${
        scaleOnHover ? 'hover:scale-105 transition-all' : 'transition-opacity'
      } ${classes}`}
      onClick={() => {
        if (!loading && !disabled) {
          onClick()
        }
      }}
    >
      <p className='text-white pointer-events-none text-center m-auto'>
        {loading == false ? (
          label
        ) : (
          <CgSpinner
            size={20}
            className='animate-spin text-white text-2xl mx-auto'
          />
        )}
      </p>
    </div>
  )
}

export default CommonButton

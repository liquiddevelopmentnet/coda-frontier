/*
 * Copyright Project Coda, LLC, 2022.
 * All rights reserved.
 */

function CommonButton({
  type,
  label,
  onClick,
  loading = false,
  disabled = false,
  dominant = false,
}: {
  type: 'primary' | 'secondary' | 'success' | 'error'
  label: string
  onClick: () => void
  loading?: boolean
  disabled?: boolean
  dominant?: boolean
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
          ? 'w-full p-2 px-4 text-base'
          : 'min-w-fit p-[6px] px-4 text-sm'
      } rounded-[4px] cursor-pointer hover:opacity-80 transition-opacity duration-200 shadow-xl ${classes}`}
      onClick={onClick}
    >
      <p className='text-white pointer-events-none text-center'>{label}</p>
    </div>
  )
}

export default CommonButton

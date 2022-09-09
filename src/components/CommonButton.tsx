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
}: {
  type: 'primary' | 'secondary'
  label: string
  onClick: () => void
  loading?: boolean
  disabled?: boolean
}) {
  const primaryClasses = 'bg-gradient-to-r from-red-500 to-pink-500'
  const secondaryClasses = 'bg-gradient-to-r from-gray-500 to-slate-600'

  var classes

  switch (type) {
    case 'primary':
      classes = primaryClasses
      break
    case 'secondary':
      classes = secondaryClasses
      break
    default:
      classes = primaryClasses
      break
  }

  return (
    <div
      className={`p-2 w-full rounded-[4px] cursor-pointer hover:opacity-80 transition-opacity duration-200 shadow-xl ${classes}`}
      onClick={onClick}
    >
      <p className='text-white pointer-events-none text-center'>{label}</p>
    </div>
  )
}

export default CommonButton

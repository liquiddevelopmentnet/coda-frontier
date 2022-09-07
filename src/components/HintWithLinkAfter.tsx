/*
 * Copyright Project Coda, LLC, 2022.
 * All rights reserved.
 */

function HintWithLinkAfter({
  hint,
  linkText,
  onClick,
}: {
  hint: string
  linkText: string
  onClick: () => void
}) {
  return (
    <p className='text-sm'>
      {hint}{' '}
      <span
        onClick={onClick}
        className='text-blue-500 cursor-pointer hover:text-blue-600'
      >
        {linkText}
      </span>
    </p>
  )
}

export default HintWithLinkAfter

/*
 * Copyright Project Coda, LLC, 2022.
 * All rights reserved.
 */

function HintWithLinkAfter({
  hint,
  linkText,
  link,
}: {
  hint: string
  linkText: string
  link: string
}) {
  return (
    <p className='text-sm'>
      {hint}{' '}
      <span className='text-blue-500 cursor-pointer hover:text-blue-600'>
        {linkText}
      </span>
    </p>
  )
}

export default HintWithLinkAfter

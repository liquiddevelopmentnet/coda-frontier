import { useEffect, useState } from 'react'

import ReactCommonmark from 'react-commonmark'
import licenses from '../../../data/licenses.md'

function Licenses() {
  const [licensesText, setLicensesText] = useState('')
  useEffect(() => {
    ;(async () => {
      const response = await fetch(licenses)
      const text = await response.text()
      setLicensesText(text)
    })()
  }, [])

  return (
    <div className='text-white text-sm'>
      <h1 className='text-xl font-bold mb-2'>Licenses</h1>
      <br />
      <ReactCommonmark source={'---'} skipHtml={false} />
      <br />
      <div className='text-gray-300 bigh1'>
        <ReactCommonmark source={licensesText} skipHtml={false} />
      </div>
    </div>
  )
}

export default Licenses

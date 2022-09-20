import ReactCommonmark from 'react-commonmark'

function SettingsNotice({
  text,
  opacity = 100,
}: {
  text: string
  opacity?: number
}) {
  return (
    <div className='text-gray-300 text-xs' style={{ opacity: opacity / 100 }}>
      <ReactCommonmark source={text} skipHtml={true} />
    </div>
  )
}

export default SettingsNotice

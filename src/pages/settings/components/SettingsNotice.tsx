import ReactCommonmark from 'react-commonmark'

function SettingsNotice({ text }: { text: string }) {
  return (
    <div className='text-gray-300 text-xs'>
      <ReactCommonmark source={text} skipHtml={true} />
    </div>
  )
}

export default SettingsNotice

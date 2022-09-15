import React from 'react'

function SettingsSection({ title, f = false }: { title: string; f?: boolean }) {
  return (
    <div className={`space-y-3 mb-5 ${!f && 'mt-10'}`}>
      <div className='bg-gradient-to-r from-gray-400 via-[#9ca3af3e] to-transparent h-[1px] w-full' />
      <p className='text-gray-400 font-bold text-sm uppercase'>{title}</p>
    </div>
  )
}

export default SettingsSection

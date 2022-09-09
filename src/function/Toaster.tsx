import { BsCheckLg, BsXLg } from 'react-icons/bs'
import { useEffect, useState } from 'react'

import { IoInformation } from 'react-icons/io5'
import toast from 'react-hot-toast'

export function codaToast(props: {
  message: string
  type: 'success' | 'error' | 'info'
  duration?: number
}) {
  toast.custom(
    t => (
      <Toast
        message={props.message}
        type={props.type}
        duration={props.duration}
        t={t}
      />
    ),
    { position: 'bottom-right', duration: props.duration ?? 5000 }
  )
}

const Toast = (props: {
  message: string
  type: 'success' | 'error' | 'info'
  duration?: number
  t: any
}) => {
  const duration = props.duration ?? 5000
  const [percent, setPercent] = useState(100)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const iv = setInterval(() => {
      if (hovered) return
      setPercent(p => {
        if (p <= 0) {
          clearInterval(iv)
          return 0
        } else {
          return p - 10 / (duration / 100)
        }
      })
    }, 10)

    return () => {
      clearInterval(iv)
    }
  }, [hovered])

  return (
    <div
      className={`${
        props.t.visible ? 'animate-enter' : 'animate-leave'
      } mb-5 bg-gray-600 bg-opacity-50 rounded-[4px] flex flex-col cursor-default select-none`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className='flex space-x-3 items-center p-2 px-4'>
        {props.type == 'success' && (
          <BsCheckLg className='text-green-400' size={15} />
        )}
        {props.type == 'error' && <BsXLg className='text-red-400' size={15} />}
        {props.type == 'info' && (
          <IoInformation className='text-blue-400' size={20} />
        )}
        <p className='text-white'>{props.message}</p>
      </div>
      <div
        className='bg-gradient-to-r from-red-500 to-pink-500 h-[2px]'
        style={{ width: percent + '%' }}
      />
    </div>
  )
}

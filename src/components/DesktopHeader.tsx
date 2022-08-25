import { electronState } from '../recoil/atoms'
import { useRecoilValue } from 'recoil'

function DesktopHeader() {
  const electron = useRecoilValue(electronState)

  return (
    <>
      {electron.is && (
        <div className='h-[22px] w-screen drag-region bg-slate-800 flex justify-between'>
          <p className='text-white font-mono text-xs ml-2 my-auto'>coda</p>
          <div className='flex h-full drag-region-reserve'>
            <div
              onClick={() => {
                electron.ipc.send('window_minimize')
              }}
              className='h-full flex w-7 hover:bg-slate-700 cursor-pointer'
            >
              <svg
                className='text-white m-auto pointer-events-none'
                aria-hidden='false'
                width='12'
                height='12'
                viewBox='0 0 12 12'
              >
                <rect
                  fill='currentColor'
                  width='10'
                  height='1'
                  x='1'
                  y='6'
                ></rect>
              </svg>
            </div>
            <div
              onClick={() => {
                electron.ipc.send('window_toggle_maximize')
              }}
              className='h-full flex w-7 hover:bg-slate-700 cursor-pointer'
            >
              <svg
                className='text-white m-auto'
                aria-hidden='false'
                width='12'
                height='12'
                viewBox='0 0 12 12'
              >
                <rect
                  width='9'
                  height='9'
                  x='1.5'
                  y='1.5'
                  fill='none'
                  stroke='currentColor'
                ></rect>
              </svg>
            </div>
            <div
              onClick={() => {
                electron.ipc.send('window_close')
              }}
              className='h-full flex w-7 hover:bg-red-500 cursor-pointer'
            >
              <svg
                className='text-white m-auto'
                aria-hidden='false'
                width='12'
                height='12'
                viewBox='0 0 12 12'
              >
                <polygon
                  fill='currentColor'
                  fillRule='evenodd'
                  points='11 1.576 6.583 6 11 10.424 10.424 11 6 6.583 1.576 11 1 10.424 5.417 6 1 1.576 1.576 1 6 5.417 10.424 1'
                ></polygon>
              </svg>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default DesktopHeader

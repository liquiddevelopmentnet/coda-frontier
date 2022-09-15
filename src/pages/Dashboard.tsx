import { User, useGateway } from '../function/Gateway'
import { flashState, taskbarState } from '../recoil/atoms'
import { useEffect, useState } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'

import Badge from '../components/Badge'
import CommonButton from '../components/CommonButton'
import RankImages from '../function/RankImages'
import { codaToast } from '../function/Toaster'

function Dashboard({ finishFlash = false }: { finishFlash?: boolean }) {
  const [flash, setFlash] = useRecoilState(flashState)
  const [user, setUser] = useState<User | null>(null)
  const setTaskbar = useSetRecoilState(taskbarState)
  const gw = useGateway()

  useEffect(() => {
    ;(async () => {
      const result = await gw.getLocalUser()
      if (result[0] == false) {
        codaToast({ message: result[1] as string, type: 'error' })
      }
      setUser(result[1] as User)
    })()

    if (finishFlash) {
      setTimeout(() => {
        setFlash(false)
        setTaskbar(true)
      }, 1000)
    }
  }, [])

  return (
    <div className='w-full h-full bg-[#1e293b91]'>
      {user != null && (
        <div className='w-full h-full flex flex-col'>
          <div className='w-full h-[80px] bg-slate-900 bg-opacity-90 flex pl-5 gap-3 items-center'>
            <img
              src={user.avatar}
              className='w-10 h-10 rounded-full shadow-lg border border-pink-500'
            />
            <div>
              <p className='text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500 text-lg font-bold'>
                {user.username}
              </p>
              <p className='text-gray-400 text-xs'>{user.email}</p>
            </div>
            <div className='flex ml-7'>
              {user.badges.map(badge => (
                <Badge badge={badge} />
              ))}
            </div>
            <div
              className={`ml-auto ${
                user.rank == 'UNRANKED'
                  ? 'pr-5'
                  : `flex -rotate-45 h-[2000px] overflow-visible ${
                      RankImages[user.rank][1]
                    }`
              }`}
            >
              {user.rank == 'UNRANKED' ? (
                <p className='text-gray-400 text-xs'>Unranked</p>
              ) : (
                <img src={RankImages[user.rank][0]} className='w-[70px]' />
              )}
            </div>
          </div>
          <div className='w-full h-full p-4 flex'>
            <div className='mt-auto mb-[53px]'>
              <div className='bg-slate-900 bg-opacity-90 p-5 max-w-min rounded-[4px] flex items-center'>
                <div className='w-[300px] transition-all duration-300 space-y-4 overflow-visible'>
                  <p className='text-gray-500 text-xs'>Click to play</p>
                  <CommonButton
                    label='Play'
                    type='primary'
                    dominant
                    scaleOnHover
                    onClick={() => {}}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard

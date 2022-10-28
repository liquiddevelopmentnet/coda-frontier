/*
 * Copyright github.com/liquiddevelopmentnet, 2022.
 * All rights reserved. Do not distribute without permission.
 */

import BadgeImages from '../function/BadgeImages'
import Popup from 'reactjs-popup'
import { codaToast } from '../function/Toaster'
import { useTranslations } from '../i18n/i18n'

function Badge(props: {
  badge:
    | 'staff.admin'
    | 'staff.developer'
    | 'staff.moderator'
    | 'special.friend'
    | 'special.tester'
    | 'general.devil'
    | 'general.patron'
    | 'play.top3'
    | 'play.taskcreator'
    | 'play.codar'
}) {
  const t = useTranslations()
  return (
    <div className='overflow-visible'>
      <Popup
        trigger={
          <img
            src={BadgeImages[props.badge]}
            className='w-8 cursor-pointer hover:opacity-80'
            onClick={() => {
              codaToast({
                type: 'info',
                message: t('Badges.' + props.badge + '.Description'),
              })
            }}
          />
        }
        className='transition-all duration-300 overflow-visible shadow-2xl'
        position='bottom center'
        on='hover'
        arrow={true}
        closeOnDocumentClick
      >
        <div className='p-2 text-white text-xs bg-gray-800 rounded-[4px]'>
          {t('Badges.' + props.badge)}
        </div>
      </Popup>
    </div>
  )
}

export default Badge

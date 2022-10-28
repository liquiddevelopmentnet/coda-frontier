/*
 * Copyright github.com/liquiddevelopmentnet, 2022.
 * All rights reserved. Do not distribute without permission.
 */

import { CgSpinner } from 'react-icons/cg'
import React from 'react'

function ActivityIndicator() {
  return (
    <CgSpinner size={20} className='animate-spin text-white text-2xl m-auto' />
  )
}

export default ActivityIndicator

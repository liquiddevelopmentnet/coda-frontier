/*
 * Copyright Project Coda, LLC, 2022.
 * All rights reserved.
 */

import api from '../assets/api.json'
import axios from 'axios'

const ApiCall = (
  host: string,
  endpoint: [ApiNamespace, ApiKey],
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT' | 'OPTIONS',
  body: {},
  urlParams: {} = {},
  headers: {} = {}
) => {
  const [namespace, key] = endpoint

  const pathKey: string = namespace + '.' + key
  const url: string = host + (api as any)[pathKey]

  const config = {
    method,
    url,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      ...headers,
    },
    data: body,
    params: urlParams,
  }

  return axios(config)
}

export default { ApiCall }

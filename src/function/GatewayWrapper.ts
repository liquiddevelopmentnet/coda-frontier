/*
 * Copyright github.com/liquiddevelopmentnet, 2022.
 * All rights reserved. Do not distribute without permission.
 */

import axios, { AxiosRequestConfig } from 'axios'

import api from '../data/api.json'
import { hostUrlState } from '../recoil/selectors'
import { tokenState } from '../recoil/atoms'
import { useRecoilValue } from 'recoil'
import { useState } from 'react'

const ApiCall = (
  host: string,
  endpoint: [ApiNamespace, ApiKey],
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT' | 'OPTIONS',
  body: {},
  urlParams: {} = {},
  headers: {} = {},
  params: string[] = [],
  token: string | null = null
) => {
  return new Promise<ApiResponse>((resolve, reject) => {
    const [namespace, key] = endpoint

    const pathKey: string = namespace + '.' + key
    var url: string = host + (api as any)[pathKey]

    for (var i = 0; i < params.length; i++) {
      url = url.replaceAll(`{${i}}`, params[i])
    }

    const config: AxiosRequestConfig<any> = {
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
      timeout: 4000,
    }

    if (token) {
      config.headers!['Authorization'] = 'Bearer ' + token
    }

    axios(config)
      .then(res => {
        resolve({
          error: false,
          errorMessage: null,
          statusCode: res.status,
          data: res.data,
        })
      })
      .catch(function (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message &&
          error.response.status
        ) {
          resolve({
            error: true,
            errorMessage: error.response.data.message,
            statusCode: error.response.status,
            data: error.response.data,
          })
        } else if (error.request) {
          resolve({
            error: true,
            errorMessage: 'No response from server. Try again later.',
            statusCode: 0,
            data: null,
          })
        } else {
          resolve({
            error: true,
            errorMessage: error.message,
            statusCode: 0,
            data: null,
          })
        }
      })
  })
}

export function useApi() {
  const host = useRecoilValue(hostUrlState)
  const token = useRecoilValue(tokenState)

  const [functionProvider, setFunctionProvider] = useState<{
    make: (
      endpoint: [ApiNamespace, ApiKey],
      method: 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT' | 'OPTIONS',
      body: {},
      urlParams?: {},
      headers?: {},
      params?: string[]
    ) => Promise<ApiResponse>
  }>({
    make: (
      endpoint,
      method,
      body,
      urlParams = {},
      headers = {},
      params?: string[]
    ): Promise<ApiResponse> => {
      return ApiCall(
        host,
        endpoint,
        method,
        body,
        urlParams,
        headers,
        params,
        token.access
      )
    },
  })

  return functionProvider
}

export type ApiResponse = {
  error: boolean
  errorMessage: string | null
  statusCode: number
  data: any | null
}

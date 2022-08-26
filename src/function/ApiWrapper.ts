/*
 * Copyright Project Coda, LLC, 2022.
 * All rights reserved.
 */

import axios, { AxiosPromise } from 'axios'

import api from '../assets/api.json'
import { hostUrlState } from '../recoil/selectors'
import { useRecoilValue } from 'recoil'
import { useState } from 'react'

const ApiCall = (
  host: string,
  endpoint: [ApiNamespace, ApiKey],
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT' | 'OPTIONS',
  body: {},
  errCallback: (err: any) => void,
  urlParams: {} = {},
  headers: {} = {}
) => {
  return new Promise<ApiResponse>((resolve, reject) => {
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
            errorMessage: 'No response from sever. Try again later.',
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

  const [functionProvider, setFunctionProvider] = useState<{
    make: (
      endpoint: [ApiNamespace, ApiKey],
      method: 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT' | 'OPTIONS',
      body: {},
      errCallback: (err: any) => void,
      urlParams?: {},
      headers?: {}
    ) => Promise<ApiResponse>
  }>({
    make: (
      endpoint,
      method,
      body,
      errCallback,
      urlParams = {},
      headers = {}
    ): Promise<ApiResponse> => {
      return ApiCall(
        host,
        endpoint,
        method,
        body,
        errCallback,
        urlParams,
        headers
      )
    },
  })

  return functionProvider
}

type ApiResponse = {
  error: boolean
  errorMessage: string | null
  statusCode: number
  data: any | null
}

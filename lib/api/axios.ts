import axios, { AxiosRequestConfig } from 'axios'
import router from 'next/router'
import { AuthenticationError } from '@lib/errors'

const LOGIN_URL = '/login'

export function createAxiosInstance(config?: AxiosRequestConfig) {
  return axios.create({
    ...config,
    baseURL: process.env.API_URL || '/api',
  })
}

function raiseAuthenticationError() {
  if (!process.env.API_URL) {
    router.push(LOGIN_URL)
  } else {
    throw new AuthenticationError('Authentication Error', LOGIN_URL)
  }
}

const instance = createAxiosInstance()

// Interceptors

type GraphQLError = {
  message: string
  extensions: {
    code: string
  }
}

instance.interceptors.response.use(
  (response) => {
    if (response.config.url === '/graphql') {
      const errors: [GraphQLError] = response.data.errors
      if (errors) {
        const authErrors = errors.filter((e) => e.extensions.code === 'UNAUTHENTICATED')
        raiseAuthenticationError()
        return Promise.reject(authErrors[0].message)
      }
    }
    return response
  },
  (e) => {
    const status = e?.response?.status
    if (status === 401 || status === 403) {
      raiseAuthenticationError()
      return
    }
    return Promise.reject(e)
  },
)

export default instance

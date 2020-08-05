import { AxiosInstance } from 'axios'
import { AnyAction, Action } from 'redux'

declare module 'next/dist/next-server/lib/utils' {
  interface NextPageContext<S = any, A extends Action = AnyAction> {
    axios: AxiosInstance
  }
}

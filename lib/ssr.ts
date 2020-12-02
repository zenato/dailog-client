import { AxiosRequestConfig } from 'axios'
import { wrapper } from '@store/index'
import { actions } from '@store/user'
import { fetcher } from './api'
import { AuthenticationError } from './errors'

type WrapperContext = {
  axiosConfig: AxiosRequestConfig
}

type GetServerSidePropsType<T> = T extends (callback: (ctx: infer CP) => infer CR) => infer R
  ? (callback: (ctx: CP & WrapperContext) => Promise<CR>) => R
  : never

export type GetServerSidePropsWrapper = GetServerSidePropsType<typeof wrapper.getServerSideProps>
export type GetServerSidePropsWrapperContext = Parameters<GetServerSidePropsWrapper>[0]

const getServerSidePropsWrapper: GetServerSidePropsWrapper = (callback) =>
  wrapper.getServerSideProps(async (ctx) => {
    // Axios Config
    const axiosConfig: AxiosRequestConfig = {
      headers: { cookie: ctx.req.headers.cookie || '' },
    }

    try {
      // Initial state
      const { user } = await fetcher('/auth/me', axiosConfig)
      if (user) {
        ctx.store.dispatch(actions.setUser(user))
      }

      return await callback({ ...ctx, axiosConfig })
    } catch (e) {
      if (e instanceof AuthenticationError) {
        return {
          redirect: {
            destination: '/login',
            permanent: false,
          },
        }
      }
      throw e
    }
  })

export default getServerSidePropsWrapper

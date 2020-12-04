import { AxiosRequestConfig } from 'axios'
import { wrapper } from '@store/index'
import { actions } from '@store/user'
import { fetcher } from './api'
import { AuthenticationError } from './errors'

type WrapperContext = {
  axiosConfig: AxiosRequestConfig
}

type InferGetServerSideProps<T> = T extends (callback: (ctx: infer CP) => infer CR) => infer R
   ? [CP, CR, R]
   : never
type GetServerSidePropsType = InferGetServerSideProps<typeof wrapper.getServerSideProps>

export type GetServerSidePropsWrapperContext = GetServerSidePropsType[0] & WrapperContext
export type GetServerSidePropsWrapper = (callback: (ctx: GetServerSidePropsWrapperContext) => GetServerSidePropsType[1]) => GetServerSidePropsType[2]

async function initialize(ctx: GetServerSidePropsWrapperContext) {
  const { user } = await fetcher('/auth/me', ctx.axiosConfig)
  if (user) {
    ctx.store.dispatch(actions.setUser(user))
  }
}

const getServerSidePropsWrapper: GetServerSidePropsWrapper = (callback) =>
  wrapper.getServerSideProps(async (ctx) => {
    // Axios Config
    const axiosConfig: AxiosRequestConfig = {
      headers: { cookie: ctx.req.headers.cookie || '' },
    }

    const wrapperContext: GetServerSidePropsWrapperContext = { ...ctx, axiosConfig }

    try {
      // Perform on only server
      if (!/\/\_next\/data\//.test(ctx.req.url!)) {
        await initialize(wrapperContext)
      }
      return await callback(wrapperContext)
    } catch (e) {
      if (e instanceof AuthenticationError) {
        return {
          redirect: {
            destination: e.redirect,
            permanent: false,
          },
        }
      }
      throw e
    }
  })

export default getServerSidePropsWrapper

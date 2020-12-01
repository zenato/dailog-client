import { AxiosRequestConfig } from 'axios'
import axios from './axios'

const GRAPHQL_ENDPOINT = '/graphql'

export default async function gql(query: string, variables?: any, config?: AxiosRequestConfig) {
  const { data } = await axios.post(GRAPHQL_ENDPOINT, { query, variables }, { ...config })
  return data?.data
}

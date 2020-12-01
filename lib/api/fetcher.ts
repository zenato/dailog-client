import { AxiosRequestConfig } from 'axios'
import axios from './axios'

export default async function fetcher(url: string, config?: AxiosRequestConfig) {
  const { data } = await axios.get(url, config)
  return data
}

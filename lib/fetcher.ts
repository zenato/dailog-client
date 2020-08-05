import fetch from 'unfetch'

const fetcher = async (url: string) => fetch(url).then(r => r.json())

export const gql = async (url: string, query: string, variables?: any) => fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ query, variables }),
}).then(r => r.json().then(r => r.data))

export default fetcher

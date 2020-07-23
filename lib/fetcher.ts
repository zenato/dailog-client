import fetch from 'unfetch'

export default async (url: string) => fetch(url).then(r => r.json())

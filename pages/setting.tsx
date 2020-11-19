import { NextPage } from 'next'
import useSWR, { mutate } from 'swr'
import fetcher from '@lib/fetcher'
import { Layout } from '@components/core'
import { Setting as SettingForm } from '@components/setting'
import { useUpload, useS3Upload } from '@lib/hooks'
import { UpdateThumbnail, UpdateProfileName } from '@lib/graphql'
import { gql } from '@lib/fetcher'

const Setting: NextPage = () => {
  const { data, error } = useSWR('/api/auth/me', fetcher)
  const [upload] = useUpload()
  const [s3Upload] = useS3Upload()

  const uploadThumbnail = async () => {
    const file = await upload()
    if (!file) return

    const image = await s3Upload(file, { type: 'profile' })
    if (!image) return

    await gql('/api/graphql', UpdateThumbnail, { url: image })
    mutate('/api/auth/me')
  }

  const deleteThumbnail = async () => {
    await gql('/api/graphql', UpdateThumbnail, { url: null })
    mutate('/api/auth/me')
  }

  const saveName = async (name: string) => {
    await gql('/api/graphql', UpdateProfileName, { name })
    mutate('/api/auth/me')
  }

  return (
    <Layout>
      {data && (
        <SettingForm
          user={data.user}
          uploadThumbnail={uploadThumbnail}
          deleteThumbnail={deleteThumbnail}
          saveName={saveName}
        />
      )}
    </Layout>
  )
}

export default Setting

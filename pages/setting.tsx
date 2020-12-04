import useSWR, { mutate } from 'swr'
import { useAuth, useS3Upload, useUpload } from '@lib/hooks'
import { gql, quries } from '@lib/api'
import { Layout } from '@components/core'
import { Setting as SettingForm } from '@components/setting'

interface Props {
  user: User
}

export default function Setting(props: Props) {
  const { user, revalidate } = useAuth()

  const [upload] = useUpload()
  const [s3Upload] = useS3Upload()

  const uploadThumbnail = async () => {
    const file = await upload()
    if (!file) return

    const image = await s3Upload(file, { type: 'profile' })
    if (!image) return

    await gql(quries.UpdateThumbnail, { url: image })
    revalidate()
  }

  const deleteThumbnail = async () => {
    await gql(quries.UpdateThumbnail, { url: null })
    revalidate()
  }

  const saveName = async (name: string) => {
    await gql(quries.UpdateProfileName, { name })
    revalidate()
  }

  return (
    <Layout>
      <SettingForm
        user={user!}
        uploadThumbnail={uploadThumbnail}
        deleteThumbnail={deleteThumbnail}
        saveName={saveName}
      />
    </Layout>
  )
}

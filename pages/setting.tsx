import { NextPage } from 'next'
import useSWR, { mutate } from 'swr'
import { useAuth, useUpload, useS3Upload } from '@lib/hooks'
import { fetcher, gql, quries } from '@lib/api'
import getServerSidePropsWrapper from '@lib/ssr'
import { Layout } from '@components/core'
import { Setting as SettingForm } from '@components/setting'

interface Props {
  user: User
}

export default function Setting(props: Props) {
  const { setUser } = useAuth()
  const { data } = useSWR('/auth/me', fetcher, {
    initialData: { user: props.user },
    onSuccess: ({ user }) => setUser(user),
  })
  const [upload] = useUpload()
  const [s3Upload] = useS3Upload()

  const uploadThumbnail = async () => {
    const file = await upload()
    if (!file) return

    const image = await s3Upload(file, { type: 'profile' })
    if (!image) return

    await gql(quries.UpdateThumbnail, { url: image })
    mutate('/auth/me')
  }

  const deleteThumbnail = async () => {
    await gql(quries.UpdateThumbnail, { url: null })
    mutate('/auth/me')
  }

  const saveName = async (name: string) => {
    await gql(quries.UpdateProfileName, { name })
    mutate('/auth/me')
  }

  const user = data?.user

  return (
    <Layout>
      {!user && <div>Loading...</div>}
      {user && (
        <SettingForm
          user={user}
          uploadThumbnail={uploadThumbnail}
          deleteThumbnail={deleteThumbnail}
          saveName={saveName}
        />
      )}
    </Layout>
  )
}

export const getServerSideProps = getServerSidePropsWrapper(async ({ axiosConfig }) => {
  const { user } = await fetcher('/auth/me', axiosConfig)
  return { props: { user } }
})

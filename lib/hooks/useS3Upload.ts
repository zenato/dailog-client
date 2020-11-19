import { useState, useCallback } from 'react'
import axios from 'axios'

const FILE_LIMIT_SIZE = 1024 * 1024 * 15

const useS3Upload = () => {
  const [error, setError] = useState<Error | null>(null)
  const [image, setImage] = useState<string | null>(null)

  const s3Upload = useCallback(async (file: File, info: { type: string }) => {
    if (file.size > FILE_LIMIT_SIZE) {
      throw Error('File is too big')
    }
    if (!file.type.includes('image/')) {
      throw Error('Not an image')
    }

    try {
      const { data } = await axios.post(`/api/files/create-url/${info.type}`, {
        ...info,
        filename: file.name,
      })
      const { path, signedUrl } = data
      await axios.put(signedUrl, file, {
        headers: {
          'Content-Type': file.type,
        },
        onUploadProgress: (e) => {
          // Math.round((e.loaded / e.total) * 100)
        },
      })
      setImage(path)
      return path
    } catch (e) {
      setError(e)
    }
  }, [])

  return [s3Upload, image, error] as [typeof s3Upload, typeof image, typeof error]
}

export default useS3Upload

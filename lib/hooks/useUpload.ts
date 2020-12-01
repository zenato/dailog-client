import { useCallback, useState } from 'react'

const useUpload = () => {
  const [file, setFile] = useState<File | null>(null)
  const upload = useCallback(
    () =>
      new Promise<File | null>((resolve, reject) => {
        const input = document.createElement('input')

        const timeout = setTimeout(reject, 1000 * 60 * 3)
        input.type = 'file'
        input.onchange = () => {
          clearTimeout(timeout)
          if (!input.files) {
            reject('No selected file!')
            return
          }

          const file = input.files[0]
          setFile(file)
          resolve(file)
        }
        input.click()
      }),
    [],
  )
  return [upload, file] as [typeof upload, typeof file]
}

export default useUpload

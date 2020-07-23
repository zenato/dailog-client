import { useState } from 'react'
import { NextPage } from 'next'
import { useFormik, ErrorMessage } from 'formik'
import axios from 'axios'
import Cookie from 'js-cookie'

interface FormValues {
  email: string
  password: string
}

const Login: NextPage = () => {
  const [hasError, setError] = useState(false)

  const formik = useFormik<FormValues>({
    initialValues: {
      email: '',
      password: '',
    },
    validate: (values) => {
      const errors: any = {}

      if (!values.email) {
        errors.email = 'Required'
      }
      if (!values.password) {
        errors.password = 'Required'
      }

      return errors
    },
    onSubmit: async (values) => {
      setError(false)
      try {
        const { data } = await axios.post('/api/auth/login', values)
        Cookie.set('authorization', data.accessToken, { expires: 30, path: '/', secure: false })
        window.location.href = '/'
      } catch (e) {
        setError(true)
      }
    }
  })

  return (
    <div>
      <div>Login Page</div>

      <form onSubmit={formik.handleSubmit}>
        {formik.isSubmitting && (
          <div>Loading...</div>
        )}
        {hasError && (
          <div>Failure login</div>
        )}
        <div>
          <label htmlFor="email">E-Mail</label>
          <input
            id="email"
            name="email"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.errors.email && (<span className="field-error">{formik.errors.email}</span>)}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            autoComplete="current-password"
          />
          {formik.errors.password && (<span className="field-error">{formik.errors.password}</span>)}
        </div>
        <input type="submit" value="Login" />
      </form>
    </div>
  )
}

export default Login
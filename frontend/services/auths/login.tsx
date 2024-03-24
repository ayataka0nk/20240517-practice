import { InternalServerError } from 'services/InternalServerError'
import { ValidationError } from 'services/ValidationError'
import { guestFetch } from 'services/fetch'

type LoginParams = {
  email: string
  password: string
}

export type LoginValidationError = {
  global?: string
  email?: string
  password?: string
}

export const login = async ({
  email,
  password
}: LoginParams): Promise<void> => {
  const formData = new FormData()
  formData.append('username', email)
  formData.append('password', password)

  const response = await guestFetch('/auth/token', {
    method: 'POST',
    body: formData,
    headers: {
      Accept: 'application/json'
    }
  })
  if (response.status === 200) {
    const data = await response.json()
    localStorage.setItem('access_token', data.access_token)
    localStorage.setItem('refresh_token', data.refresh_token)
    return
  } else if (response.status === 401) {
    throw new ValidationError({
      global: 'メールアドレスかパスワードが間違っています'
    })
  } else if (response.status === 422) {
    const data = await response.json()
    throw new ValidationError({
      email: data.username.join(''),
      password: data.password.join('')
    })
  } else {
    throw new InternalServerError()
  }
}

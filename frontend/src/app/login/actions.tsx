import { guestFetch } from '@/services/fetch'
import { ActionFunction, redirect, useActionData } from 'react-router-dom'

export type LoginActionError = {
  global?: string
  email?: string
  password?: string
}

export const loginAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
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
    return redirect('/dashboard')
  } else if (response.status === 401) {
    return {
      global: 'メールアドレスかパスワードが間違っています'
    }
  } else if (response.status === 422) {
    const data = await response.json()
    return {
      email: data.username.join(''),
      password: data.password.join('')
    }
  }
}

export const useLoginActionErrors = (): LoginActionError | undefined => {
  const errors = useActionData()
  return errors as LoginActionError | undefined
}

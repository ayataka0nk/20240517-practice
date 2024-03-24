import {
  redirect,
  useLoaderData as useLoaderDataUnkown
} from 'react-router-dom'
import { authFetch } from './fetch'

export const authLoader = async <T>(url: string): Promise<T | Response> => {
  const response = await authFetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  })
  if (response.status === 200) {
    return response.json()
  } else if (response.status === 401) {
    return redirect('/login')
  } else {
    return redirect('/login')
  }
}

export const guestLoader = async (url: string) => {
  const response = await authFetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  })
  if (response.status === 200) {
    return response.json()
  } else {
    return redirect('/login')
  }
}

export const useLoaderData = <T>(): T => {
  const data = useLoaderDataUnkown() as T
  return data
}

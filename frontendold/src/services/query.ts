import { authFetch } from './fetch'

export const query = async <T>(url: string): Promise<T> => {
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
    window.location.href = '/login'
    throw new Error('Unauthorized')
  } else {
    window.location.href = '/login'
    throw new Error('unhandled error')
  }
}

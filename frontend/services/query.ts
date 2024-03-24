import { InternalServerError } from './InternalServerError'
import { UnauthorizedError } from './UnauthorizedError'
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
    throw new UnauthorizedError()
  } else {
    throw new InternalServerError()
  }
}

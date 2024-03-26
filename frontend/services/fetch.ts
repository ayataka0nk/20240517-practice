import mem from 'mem'

export const authFetch = async (
  input: RequestInfo | URL,
  init?: RequestInit | undefined
): Promise<Response> => {
  const baseUrl = import.meta.env.VITE_API_URL
  const response = await fetch(baseUrl + input, {
    ...init,
    headers: {
      ...init?.headers,
      Authorization: 'Bearer ' + localStorage.getItem('access_token')
    }
  })

  if (response.status === 401) {
    const currentRefreshToken = localStorage.getItem('refresh_token')
    if (!currentRefreshToken) {
      // 401 でリフレッシュトークンがない場合は401のレスポンスをそのまま返す
      return response
    }

    const tokenResponse = await memorizedGetNewTokens({
      refreshToken: currentRefreshToken
    })

    if (tokenResponse.status === 200) {
      const tokens = await tokenResponse.json()
      localStorage.setItem('access_token', tokens.access_token)
      localStorage.setItem('refresh_token', tokens.refresh_token)
      return authFetch(input, init)
    } else {
      // 無限ループを避けるためにリフレッシュトークンを削除して401のレスポンスを返す
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      return response
    }
  }

  return response
}

const getNewTokens = async ({
  refreshToken
}: {
  refreshToken: string
}): Promise<Response> => {
  const response = await fetch(
    import.meta.env.VITE_API_URL + '/auth/refresh-token',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + refreshToken
      }
    }
  )
  return response
}
const memorizedGetNewTokens = mem(getNewTokens, {
  maxAge: 10000
})

export const guestFetch = (
  input: RequestInfo | URL,
  init?: RequestInit | undefined
): Promise<Response> => {
  const baseUrl = import.meta.env.VITE_API_URL
  return fetch(baseUrl + input, {
    ...init,
    headers: {
      ...init?.headers
    }
  })
}

export const authFetchJson = async (
  input: RequestInfo | URL,
  init?: RequestInit | undefined
) => {
  return authFetch(input, {
    ...init,
    headers: {
      ...init?.headers,
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  })
}

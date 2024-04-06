import { redirect, useSearchParams } from '@remix-run/react'

export const getClientListPath = (
  searchParams: URLSearchParams,
  pathname?: string
) => {
  console.log(searchParams)
  console.log(pathname)
  if (typeof pathname === 'undefined') {
    return `/clients?${searchParams.toString()}`
  } else {
    console.log(pathname)
    return `${pathname}?${searchParams.toString()}`
  }
}

export const getClientDetailPath = (
  clientId: string,
  searchParams: URLSearchParams
) => {
  return `/clients/${clientId}?${searchParams.toString()}`
}

export const getClientEditPath = (
  clientId: string,
  searchParams: URLSearchParams
) => {
  return `/clients/${clientId}/edit?${searchParams.toString()}`
}

export const getClientCreatePath = (searchParams: URLSearchParams) => {
  return `/clients/create?${searchParams.toString()}`
}

export const useClientPath = () => {
  const [searchParams] = useSearchParams()
  const makeCreatePath = () => {
    return getClientCreatePath(searchParams)
  }
  const makeEditPath = (clientId: string) => {
    return getClientEditPath(clientId, searchParams)
  }

  const makeDetailPath = (clientId: string) => {
    return getClientDetailPath(clientId, searchParams)
  }
  return {
    makeCreatePath,
    makeEditPath,
    makeDetailPath
  }
}

export const redirectClientList = (request: Request) => {
  return redirect(getClientListPath(new URL(request.url).searchParams))
}

export const redirectClientDetail = (clientId: string, request: Request) => {
  return redirect(
    getClientDetailPath(clientId, new URL(request.url).searchParams)
  )
}

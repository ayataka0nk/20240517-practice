import { redirect, useSearchParams } from '@remix-run/react'

export const getProjectListPath = (
  searchParams: URLSearchParams,
  pathname?: string
) => {
  if (typeof pathname === 'undefined') {
    return `/projects?${searchParams.toString()}`
  } else {
    return `${pathname}?${searchParams.toString()}`
  }
}

export const getProjectDetailPath = (
  projectId: string,
  searchParams: URLSearchParams
) => {
  return `/projects/${projectId}?${searchParams.toString()}`
}

export const getProjectEditPath = (
  projectId: string,
  searchParams: URLSearchParams
) => {
  return `/projects/${projectId}/edit?${searchParams.toString()}`
}

export const getProjectCreatePath = (searchParams: URLSearchParams) => {
  return `/projects/create?${searchParams.toString()}`
}

export const useProjectPath = () => {
  const [searchParams] = useSearchParams()
  const makeCreatePath = () => {
    return getProjectCreatePath(searchParams)
  }
  const makeEditPath = (projectId: string) => {
    return getProjectEditPath(projectId, searchParams)
  }

  const makeDetailPath = (projectId: string) => {
    return getProjectDetailPath(projectId, searchParams)
  }
  return {
    makeCreatePath,
    makeEditPath,
    makeDetailPath
  }
}

export const redirectProjectList = (request: Request) => {
  return redirect(getProjectListPath(new URL(request.url).searchParams))
}

export const redirectProjectDetail = (projectId: string, request: Request) => {
  return redirect(
    getProjectDetailPath(projectId, new URL(request.url).searchParams)
  )
}

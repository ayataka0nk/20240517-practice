import { ValidationError } from './ValidationError'
import { authFetchJson } from './fetch'
import { query } from './query'

export type ProjectSummary = {
  projectId: string
  name: string
}

export type ProjectDetail = {
  projectId: string
  name: string
  description: string
}

export type StoreProjectParams = {
  name: string
  description: string
}

export class StoreProjectValidationError extends ValidationError<{
  name?: string
  description?: string
}> {}

export type UpdateProjectParams = {
  projectId: string
  name: string
  description: string
}

export class UpdateProjectValidationError extends ValidationError<{
  name?: string
  description?: string
}> {}

export const getProjects = async (
  params: { keyword?: string } | undefined = undefined
): Promise<ProjectSummary[]> => {
  const urlSearchParams = new URLSearchParams()
  let path = '/projects'
  if (params) {
    if (params.keyword) {
      urlSearchParams.append('keyword', params.keyword)
    }
    path = path + '?' + urlSearchParams.toString()
  }

  const data = await query<
    {
      project_id: string
      name: string
    }[]
  >(path)

  return data.map((project) => ({
    projectId: project.project_id,
    name: project.name
  }))
}

export const getProject = async ({
  projectId
}: {
  projectId: string
}): Promise<ProjectDetail> => {
  const data = await query<{
    project_id: string
    name: string
    description: string
  }>(`/projects/${projectId}`)
  return {
    projectId: data.project_id,
    name: data.name,
    description: data.description
  }
}

export const storeProject = async (params: {
  name: string
  description: string
}): Promise<string> => {
  const response = await authFetchJson('/projects', {
    method: 'POST',
    body: JSON.stringify({
      name: params.name,
      description: params.description
    })
  })

  if (response.status === 201) {
    const body = (await response.json()) as {
      project_id: string
    }
    return body.project_id
  } else if (response.status === 422) {
    const errors = (await response.json()) as {
      name?: string[]
      description?: string[]
    }
    throw new StoreProjectValidationError({
      errors: {
        name: errors.name?.join(' '),
        description: errors.description?.join(' ')
      }
    })
  } else {
    throw new Error('Internal Server Error')
  }
}

export const updateProject = async (params: {
  projectId: string
  name: string
  description: string
}): Promise<void> => {
  const response = await authFetchJson(`/projects/${params.projectId}`, {
    method: 'PATCH',
    body: JSON.stringify({
      name: params.name,
      description: params.description
    })
  })

  if (response.status === 204) {
    return
  } else if (response.status === 422) {
    const errors = (await response.json()) as {
      name?: string[]
      description?: string[]
    }
    throw new UpdateProjectValidationError({
      errors: {
        name: errors.name?.join(' '),
        description: errors.description?.join(' ')
      }
    })
  } else {
    throw new Error('Internal Server Error')
  }
}

export const deleteProject = async ({
  projectId
}: {
  projectId: string
}): Promise<void> => {
  const response = await authFetchJson(`/projects/${projectId}`, {
    method: 'DELETE'
  })

  if (response.status === 204) {
    return
  } else {
    throw new Error('Internal Server Error')
  }
}

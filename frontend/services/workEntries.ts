import { format, formatISO, parseISO } from 'date-fns'
import { ValidationError } from './ValidationError'
import { authFetchJson } from './fetch'
import { query } from './query'
import { formatInTimeZoneToUtc, parseUtcDate } from '~/utils'

export type WorkEntrySummary = {
  workEntryId: string
  projectId: string
  userId: string
  startTime: Date
  endTime?: Date
  description: string
  project: {
    projectId: string
    name: string
  }
}

export type WorkEntryDetail = {
  workEntryId: string
  projectId: string
  userId: string
  startTime: Date
  endTime?: Date
  description?: string
}

export type StoreWorkEntryParams = {
  projectId: string
  startTime: Date
  endTime?: Date
  description?: string
}

export class StoreWorkEntryValidationError extends ValidationError<{
  projectId?: string
  startTime?: string
  endTime?: string
  description?: string
}> {}

export type UpdateWorkEntryParams = {
  workEntryId: string
  projectId: string
  startTime: Date
  endTime?: Date
  description?: string
}

export class UpdateWorkEntryValidationError extends ValidationError<{
  projectId?: string
  startTime?: string
  endTime?: string
  description?: string
}> {}

export const getWorkEntries = async (): Promise<WorkEntrySummary[]> => {
  const data = (await query(`/work-entries`)) as {
    work_entry_id: string
    project_id: string
    user_id: string
    start_time: string
    end_time: string | null
    description: string
    project: {
      project_id: string
      name: string
    }
  }[]

  return data.map((workEntry) => ({
    workEntryId: workEntry.work_entry_id,
    projectId: workEntry.project_id,
    userId: workEntry.user_id,
    startTime: parseUtcDate(workEntry.start_time),
    endTime: parseUtcDate(workEntry.end_time || undefined),
    description: workEntry.description,
    project: {
      projectId: workEntry.project_id,
      name: workEntry.project.name
    }
  }))
}

export const getWorkEntry = async ({
  workEntryId
}: {
  workEntryId: string
}): Promise<WorkEntryDetail> => {
  const data = (await query(`/work-entries/${workEntryId}`)) as {
    work_entry_id: string
    project_id: string
    user_id: string
    start_time: string
    end_time: string | null
    description: string | null
  }

  return {
    workEntryId: data.work_entry_id,
    projectId: data.project_id,
    userId: data.user_id,
    startTime: parseUtcDate(data.start_time),
    endTime: parseUtcDate(data.end_time || undefined),
    description: data.description || undefined
  }
}

export const storeWorkEntry = async (params: StoreWorkEntryParams) => {
  const response = await authFetchJson('/work-entries', {
    method: 'POST',
    body: JSON.stringify({
      project_id: params.projectId,
      start_time: formatInTimeZoneToUtc(params.startTime),
      end_time: formatInTimeZoneToUtc(params.endTime),
      description: params.description
    })
  })

  if (response.status === 201) {
    const body = (await response.json()) as {
      work_entry_id: string
    }
    return body.work_entry_id
  } else if (response.status === 422) {
    const errors = (await response.json()) as {
      project_id?: string[]
      start_time?: string[]
      end_time?: string[]
      description?: string[]
    }
    throw new StoreWorkEntryValidationError({
      errors: {
        projectId: errors.project_id?.join(' '),
        startTime: errors.start_time?.join(' '),
        endTime: errors.end_time?.join(' '),
        description: errors.description?.join(' ')
      }
    })
  } else {
    throw new Error('Unknown error')
  }
}

export const updateWorkEntry = async (params: UpdateWorkEntryParams) => {
  const response = await authFetchJson(`/work-entries/${params.workEntryId}`, {
    method: 'PATCH',
    body: JSON.stringify({
      project_id: params.projectId,
      start_time: formatInTimeZoneToUtc(params.startTime),
      end_time: formatInTimeZoneToUtc(params.endTime),
      description: params.description
    })
  })

  if (response.status === 204) {
    return
  } else if (response.status === 422) {
    const errors = (await response.json()) as {
      project_id?: string[]
      start_time?: string[]
      end_time?: string[]
      description?: string[]
    }
    throw new UpdateWorkEntryValidationError({
      errors: {
        projectId: errors.project_id?.join(' '),
        startTime: errors.start_time?.join(' '),
        endTime: errors.end_time?.join(' '),
        description: errors.description?.join(' ')
      }
    })
  } else {
    throw new Error('Unknown error')
  }
}

export const deleteWorkEntry = async ({
  workEntryId
}: {
  workEntryId: string
}) => {
  const response = await authFetchJson(`/work-entries/${workEntryId}`, {
    method: 'DELETE'
  })

  if (response.status === 204) {
    return
  } else {
    throw new Error('Unknown error')
  }
}

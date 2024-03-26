import { ValidationError } from 'services/ValidationError'
import { authFetchJson } from 'services/fetch'

export class UpdateClientValidationError extends ValidationError<{
  name?: string
}> {}

export type UpdateClientParams = {
  clientId: string
  name: string
}

export const updateClient = async (
  params: UpdateClientParams
): Promise<void> => {
  const response = await authFetchJson(`/clients/${params.clientId}`, {
    method: 'PATCH',
    body: JSON.stringify({
      name: params.name
    })
  })

  if (response.status === 204) {
    return
  } else if (response.status === 422) {
    const errors = (await response.json()) as {
      name?: string[]
    }
    throw new UpdateClientValidationError({
      errors: {
        name: errors.name?.join(' ')
      }
    })
  }
}

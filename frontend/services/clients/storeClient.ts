import { InternalServerError } from 'services/InternalServerError'
import { ValidationError } from 'services/ValidationError'
import { authFetchJson } from 'services/fetch'

export class StoreClientValidationError extends ValidationError<{
  name?: string
}> {}

export type StoreClientParams = {
  name: string
}

export const storeClient = async (
  params: StoreClientParams
): Promise<string> => {
  const response = await authFetchJson('/clients', {
    method: 'POST',
    body: JSON.stringify({
      name: params.name
    })
  })

  if (response.status === 201) {
    const body = (await response.json()) as {
      client_id: string
    }
    return body.client_id
  } else if (response.status === 422) {
    const errors = (await response.json()) as {
      name?: string[]
    }
    throw new StoreClientValidationError({
      errors: {
        name: errors.name?.join(' ')
      }
    })
  } else {
    throw new InternalServerError()
  }
}

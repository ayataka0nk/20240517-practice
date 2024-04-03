import { authFetchJson } from 'services/fetch'

export const deleteClient = async (params: {
  clientId: string
}): Promise<void> => {
  const response = await authFetchJson(`/clients/${params.clientId}`, {
    method: 'DELETE'
  })

  if (response.status === 204) {
    return
  } else {
    throw new Error('Failed to delete client')
  }
}

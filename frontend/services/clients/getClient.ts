import { query } from 'services/query'

export type ClientDetail = {
  clientId: string
  name: string
}

export const getClient = async ({
  clientId
}: {
  clientId: string
}): Promise<ClientDetail> => {
  const data = await query<{
    client_id: string
    name: string
  }>(`/clients/${clientId}`)
  return {
    clientId: data.client_id,
    name: data.name
  }
}

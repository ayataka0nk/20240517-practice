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
  const data = (await query(`/clients/${clientId}`)) as {
    client_id: string
    name: string
  }
  return {
    clientId: data.client_id,
    name: data.name
  }
}

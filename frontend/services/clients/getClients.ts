import { query } from 'services/query'

export type ClientSummary = {
  clientId: string
  name: string
}

export const getClients = async (): Promise<ClientSummary[]> => {
  const data = await query<
    {
      client_id: string
      name: string
    }[]
  >('/clients')
  return data.map((client) => ({
    clientId: client.client_id,
    name: client.name
  }))
}

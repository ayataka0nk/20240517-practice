import { query } from 'services/query'

export type ClientSummary = {
  clientId: string
  name: string
}

type GetClientsParams = {
  keyword?: string
}
export const getClients = async (
  params: GetClientsParams | undefined = undefined
): Promise<ClientSummary[]> => {
  const urlSearchParams = new URLSearchParams()
  let path = '/clients'
  if (params) {
    if (params.keyword) {
      urlSearchParams.append('keyword', params.keyword)
    }
    path = path + '?' + urlSearchParams.toString()
  }

  const data = await query<
    {
      client_id: string
      name: string
    }[]
  >(path)

  return data.map((client) => ({
    clientId: client.client_id,
    name: client.name
  }))
}

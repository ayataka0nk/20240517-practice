import { useLoaderData } from '@/services/loader'
import { query } from '@/services/query'
import { LoaderFunctionArgs } from 'react-router-dom'

export type ClientSummary = {
  id: string
  name: string
}

export type ClientDetail = {
  id: string
  name: string
}

export const clientsLoader = async (): Promise<ClientSummary[]> => {
  const clients = await query<
    {
      client_id: string
      name: string
    }[]
  >('/clients')
  return clients.map((client) => ({
    id: client.client_id,
    name: client.name
  }))
}

export const clientLoader = async ({ params }: LoaderFunctionArgs) => {
  const client = await query<{
    client_id: string
    name: string
  }>(`/clients/${params.clientId}`)
  return {
    id: client.client_id,
    name: client.name
  }
}

export const useClientDetail = () => {
  return useLoaderData<ClientDetail>()
}

export const useClientSummaries = () => {
  return useLoaderData<ClientSummary[]>()
}

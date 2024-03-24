import { query } from 'services/query'

export type Profile = {
  id: number
  email: string
  name: string
}

export const getProfile = async (): Promise<Profile> => {
  const data = await query<Profile>('/profile')
  return data
}

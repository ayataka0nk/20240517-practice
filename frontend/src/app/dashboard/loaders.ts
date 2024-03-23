import { authLoader, useLoaderData } from '@/services/loader'

export type DashboardLoaderData = {
  user_id: number
  email: string
  name: string
}

export const dashboardLoader = async () => {
  return authLoader<DashboardLoaderData>('/profile')
}

export const useDashboardLoaderData = () => {
  return useLoaderData<DashboardLoaderData>()
}

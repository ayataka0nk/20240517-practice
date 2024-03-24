// import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDashboardLoaderData } from './loaders'

export const DashBoardPage = () => {
  const data = useDashboardLoaderData()
  return (
    <div>
      <div className="text-red-500">dashboard</div>
      <div>
        <Link to="/clients">Client 1</Link>
      </div>
      <div>{data.user_id}</div>
      <div>{data.email}</div>
      <div>{data.name}</div>
    </div>
  )
}

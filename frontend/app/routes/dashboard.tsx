import { UserNavigations } from '~/features/Navigations/UserNavigations'

export default function DashboardPage() {
  return (
    <div className="h-screen flex bg-surface-container">
      <UserNavigations pageKey="dashboard" />
      <div>dashboard</div>
    </div>
  )
}

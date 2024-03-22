import { Link } from 'react-router-dom'

export default function DashBoardPage() {
  return (
    <div>
      <div className="text-red-500">dashboard</div>
      <div>
        <Link to="/clients">Client 1</Link>
      </div>
    </div>
  )
}

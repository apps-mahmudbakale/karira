import { Outlet } from 'react-router-dom'
import { DashboardNav } from '../../components/DashboardNav'

const DashboardLayout = () => {
  return (
    <div>
      <DashboardNav />
      <Outlet />
    </div>
  )
}

export default DashboardLayout

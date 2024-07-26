import { Outlet } from "react-router-dom"
import { Header } from "../../components/Header"

const ServicesLayout = () => {
  return (
      <div>
          <Header />
          <div>
              <Outlet />
          </div>
      
    </div>
  )
}

export default ServicesLayout

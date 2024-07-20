import { Navigate, Outlet } from 'react-router-dom'
import { isUserLogin } from '../Utils/Utils'
const PrivateRoutes = () => {
    return (
        isUserLogin() ? <Outlet /> : <Navigate to='/login' />
    )
}

export default PrivateRoutes
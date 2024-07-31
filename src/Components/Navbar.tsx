import { ReactNode, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { userRole } from '../Utils/Const';
import { clearLocalStorage, getUserRole, uuidv4 } from '../Utils/Utils';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Redux/authSlice';
import logo from '../Images/logo.png';
import { Avatar } from 'primereact/avatar';
import './Navbar.css'

export default function WithAction() {
  const [links, setLinks] = useState([{ label: 'Home', href: '/' }])
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth.user);

  useEffect(() => {
    const role = getUserRole();
    if (role === userRole.client) {
      setLinks([
        { label: 'Home', href: '/' },
        { label: 'Full-Time', href: '/client/profile/fulltime' },
        { label: 'Part-Time', href: '/client/profile/parttime' },
        { label: 'Contract/C2H', href: '/client/profile/contractC2H' },
        { label: 'Premium', href: '/client/profile/premium' },
        { label: 'Executive', href: '/client/profile/executive' },
        { label: 'Selected', href: '/client/profile/selected' },
      ])
    }
    else if (role === userRole.interviwer) {
      setLinks([
        { label: 'Home', href: '/' },
        { label: 'Interviewer Profile View', href: '/interviwer/search' },
      ])
    }
    else if (role === userRole.admin) {
      setLinks([
        { label: 'Home', href: '/' },
        { label: 'Users', href: '/admin/user' },
        { label: 'Admin Profiles View', href: '/admin/profile' },

      ])
    }
    else if (role === userRole.recruiter) {
      setLinks([
        { label: 'Home', href: '/' },
        { label: 'Recruiter Profile View', href: '/recruiter/profile' },
      ])
    }
  }, [])

  const Logout = () => {
    dispatch(logout());
    clearLocalStorage();
    window.location.href = window.location.origin + "/login"
  }

  return (

    <nav className="navbar navbar-expand-lg  navbar-dark bg-dark">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <Link className="navbar-brand" to='/home'>
            <img src={logo} width={'150px'} />
          </Link>

          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {links.map((link) => (
              <li className="nav-item" key={uuidv4()}>
                <Link
                  className={`nav-link ${location.pathname === link.href ? "active" : ""}`} to={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <form className="d-flex">
            {
              user?.id ? (
                <div className="btn-group">
                  <button type="button" className="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
                    {/* {user.email} <span className="pi pi-user"></span> */}
                    {user?.email && <Avatar label={user?.email[0].toUpperCase()} style={{ backgroundColor: '#2196F3', color: '#ffffff' }} shape="circle" />}

                  </button>
                  <ul className="dropdown-menu dropdown-menu-lg-end">
                    <li><button className="dropdown-item" type="button">{user.email}</button></li>
                    <li><button onClick={Logout} className="dropdown-item" type="button">Logout</button></li>
                  </ul>
                </div>
              ) :
                (
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                      <Link className="nav-link active" to={'/login'}>
                        Login
                      </Link>
                    </li>
                  </ul>
                )
            }
          </form>
        </div>
      </div>
    </nav>
  )
}

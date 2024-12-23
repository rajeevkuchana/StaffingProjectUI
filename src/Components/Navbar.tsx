import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { userRole } from '../Utils/Const';
import { clearLocalStorage, getUserRole, uuidv4 } from '../Utils/Utils';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Redux/authSlice';
import logo from '../Images/logo.png';
import { Avatar } from 'primereact/avatar';
import './Navbar.css';
import { useKeycloak } from '@react-keycloak/web';
import { Button } from 'react-bootstrap';
import { ILoginDetails } from '../Types/AuthType';
import { verifyUser } from '../Redux/authSlice';
import { AppDispatch, RootState } from '../App/Store';

// Define the type for the link object
interface LinkItem {
  label: string;
  href: string;
}

export default function Navbar() {
  const [links, setLinks] = useState<LinkItem[]>([]); // Specify type for state
  const location = useLocation();
  const navigate = useNavigate();
  const loginStatus = useSelector((state: RootState) => state.auth.loginStatus);
  const user = useSelector((state: RootState) => state.auth.user);

  const dispatch = useDispatch<AppDispatch>();
  const { keycloak, initialized } = useKeycloak();  // Fetch Keycloak instance
  // Define role mappings
  const roleMappings = {
    client: [
      { label: 'Full-Time', href: '/client/profile/fulltime' },
      { label: 'Part-Time', href: '/client/profile/parttime' },
      { label: 'Contract/C2H', href: '/client/profile/contractC2H' },
      { label: 'Premium', href: '/client/profile/premium' },
      { label: 'Executive', href: '/client/profile/executive' },
      { label: 'Shortlist', href: '/client/shortlist' },
    ],
    interviewer: [
      { label: 'Interviewer Profile View', href: '/interviwer/search' },
    ],
    admin: [
      { label: 'Users', href: '/admin/user' },
      { label: 'Profiles', href: '/admin/profile' },
      { label: 'Category', href: '/admin/category' },
      { label: 'Job Description', href: '/admin/description' },
    ],
    recruiter: [
      { label: 'Profiles', href: '/recruiter/profile' },
      { label: 'Shortlist', href: '/recruiter/shortlist' },
    ],
  };

  useEffect(() => {
    if (loginStatus === "succeeded") {
      if (keycloak.authenticated) {
        if (user.id) {
          // Get roles from Keycloak token
          const token = keycloak.token;
          const _user = keycloak.tokenParsed;

          // Store the token and user info in localStorage
          localStorage.setItem('keycloak-token', token);
          localStorage.setItem('keycloak-user-info', JSON.stringify(_user));
          localStorage.setItem('keycloak-sso-login', 'true');


          const _roles = getUserRole()
          //  setUserRoles(user.);  // Save roles in state

          // Set links based on roles
          let updatedLinks: LinkItem[] = [];  // Initialize with correct type
          if (_roles === userRole.client) updatedLinks = [...updatedLinks, ...roleMappings.client];
          if (_roles === userRole.interviwer) updatedLinks = [...updatedLinks, ...roleMappings.interviewer];
          if (_roles === userRole.admin) updatedLinks = [...updatedLinks, ...roleMappings.admin];
          if (_roles === userRole.recruiter) updatedLinks = [...updatedLinks, ...roleMappings.recruiter];

          setLinks(updatedLinks);
        }
        else {
          logoutHandler()
        }
      }
    }
    else if (loginStatus === "failed") {
      alert("you are not authorized user to login")
      logoutHandler()
    }
  }, [loginStatus])

  useEffect(() => {
    if (!initialized) return; // Wait until Keycloak is initialized

    if (keycloak.authenticated) {
      const _user = keycloak.tokenParsed;
      const token = keycloak.token;
      // Store the token and user info in localStorage
      localStorage.setItem('keycloak-token', token);
      localStorage.setItem('keycloak-user-info', JSON.stringify(_user));
      localStorage.setItem('keycloak-sso-login', 'true');
      dispatch(verifyUser({ email: _user.email }))
    }
    else{
      keycloak.login()
    }
    
  }, [keycloak, initialized]);

  const logoutHandler = () => {
    dispatch(logout());  // Dispatch Redux logout
    clearLocalStorage();  // Clear local storage
    keycloak.logout().then(() => {
      navigate('/login');
    }).catch((error) => {
      console.error('Login failed:', error);
    });
    // Redirect to login page after logout
  };

  const loginHandler = () => {
    // keycloak.login().then(() => {
    // }).catch((error) => {
    //   console.error('Login failed:', error);
    // });
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          {/* Logo still displayed */}
          <Link className="navbar-brand" to='/home'>
            <img src={logo} width={'150px'} alt="Logo" />
          </Link>

          {/* Role-based links */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {links.map((link) => (
              <li className="nav-item" key={uuidv4()}>
                <Link
                  className={`nav-link ${location.pathname.includes(link.href) ? 'active' : ''
                    }`}
                  to={link.href}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Show the dropdown with Avatar and Logout when authenticated */}
          {keycloak.authenticated && (
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-dark dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <Avatar
                  label={keycloak.tokenParsed.preferred_username[0].toUpperCase()}
                  style={{ backgroundColor: '#2196F3', color: '#ffffff' }}
                  shape="circle"
                />
              </button>
              <ul className="dropdown-menu dropdown-menu-lg-end">
                <li>
                  <button className="dropdown-item" type="button">
                    {user?.username}
                  </button>
                </li>
                <li>
                  <button onClick={logoutHandler} className="dropdown-item" type="button">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}

          {/* Show Login button when not authenticated */}
          {!keycloak.authenticated && (
            <button type="button" className="btn btn-primary btn-dark btn-lg" onClick={loginHandler}>Login</button>
          )}
        </div>
      </div>
    </nav>
  );
}

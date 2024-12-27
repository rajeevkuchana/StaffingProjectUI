import React, { useContext, useEffect, useState } from 'react'

import signInImage from '../Images/image.png'
import { ILoginDetails } from './../Types/AuthType';
import { Roles, userRole } from '../Utils/Const';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './SignIn.css'
import { Divider } from 'primereact/divider';
import { AppDispatch, RootState } from '../App/Store';
import { useKeycloak } from '@react-keycloak/web';
import { keyclockAPILogin, verifyUser } from '../Redux/authSlice';

const SignIn: React.FC = () => {
  const [user, setUser] = useState<ILoginDetails>({ email: '', password: '', role: userRole.client });
  const loginStatus = useSelector((state: RootState) => state.auth.loginStatus);
  const dispatch = useDispatch<AppDispatch>();
  let navigate = useNavigate();
  const { keycloak, initialized } = useKeycloak();  // Fetch Keycloak instance

  useEffect(() => {
    // Check if Keycloak is initialized and authenticated
    
    if (initialized && keycloak.authenticated) {
      // If the user is already authenticated, redirect them to the home page
      navigate('/home');
    }
  }, [initialized, keycloak.authenticated, navigate]);

  const loginHandlerSSO = () => {
    keycloak.login({ redirectUri: window.location.origin + '/home' }).then(() => {
    }).catch((error) => {
      console.error('Login failed:', error);
    });
  };

  const handleLogin = (e) => {
    e.preventDefault()
    dispatch(keyclockAPILogin(user))
  };

  // useEffect(() => {
  //     if (loginStatus === "succeeded") {
  //       if(localStorage.getItem("keycloak-token")){
  //         navigate('/home')
  //       }
  //     }
  //   }, [loginStatus])

  return (
    <>
      {/* <section className="pt-2">
        <div className="d-flex justify-content-center">
          <div className="col-4 border-light-subtle shadow-sm col-md-4 p-5">
            
            <img className="img-fluid rounded-start w-100 h-100 object-fit-cover" loading="lazy"
              src={signInImage} alt="BootstrapBrain Logo" />
            <button type="button" onClick={loginHandler} className="mt-2 btn w-100 btn-block btn-primary">Login</button>
          </div>
        </div>
      </section> */}
      <section className="p-3 p-md-4 p-xl-5">
        <div className="container">
          <div className="card border-light-subtle shadow-sm">
            <div className="row g-0">
              <div className="col-12 col-md-6">
                <img className="img-fluid rounded-start w-100 h-100 object-fit-cover" loading="lazy"
                  src={signInImage} alt="BootstrapBrain Logo" />
              </div>
              <div className="col-12 col-md-6">
                <div className="card-body p-3 p-md-4 p-xl-5">
                  <div className="row">
                    <div className="col-12">
                      <div className="mb-5">
                        <h3>Log in</h3>
                      </div>
                    </div>
                  </div>
                  <form onSubmit={handleLogin} method='post'>
                    <div className="row gy-3 gy-md-4 overflow-hidden">
                      <div className="col-12 from-row">
                        <label className="form-label">Email <span className="text-danger">*</span></label>
                        <input value={user.email} type="text" className="form-control" onChange={(e) => setUser({ ...user, email: e.target.value })} name="email" id="email" placeholder="recruiter@example.com" required />
                      </div>
                      <div className="col-12 from-row">
                        <label className="form-label">Password <span className="text-danger">*</span></label>
                        <input value={user.password} type="password" onChange={(e) => setUser({ ...user, password: e.target.value })} className="form-control" name="password" id="password" required />
                      </div>
                      <div className="col-12 from-row">
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" value="" name="remember_me" id="remember_me" />
                          <label className="form-check-label text-secondary">
                            Keep me logged in
                          </label>
                        </div>
                      </div>
                      {
                        loginStatus === "failed" && (

                          <div className="col-12 from-row">
                            <label className="form-check-label d-block invalid-feedback">
                              Enter valid username and password
                            </label>
                          </div>
                        )
                      }
                    </div>
                    <div className="col-12 from-row">
                      <div className="d-grid">
                        <button className="btn btn-block bsb-btn-sm btn-primary" type="submit">Login now</button>
                      </div>
                    </div>
                  </form>
                  <div className="col-12">
                    <div className="mb-5">
                      <button type="button" onClick={loginHandlerSSO} className="mt-2 bsb-btn-sm btn w-100 btn-block btn-primary">Login With SSO</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section >
    </>
  )
}

export default SignIn
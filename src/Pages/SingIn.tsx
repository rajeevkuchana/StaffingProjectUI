import React, { useContext, useEffect, useState } from 'react'

import signInImage from '../Images/image.png'
import { ILoginDetails } from './../Types/AuthType';
import { Roles, userRole } from '../Utils/Const';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, verifyUser } from '../Redux/authSlice';
import './SignIn.css'
import { Divider } from 'primereact/divider';
import { AppDispatch, RootState } from '../App/Store';

const SignIn: React.FC = () => {
  const [user, setUser] = useState<ILoginDetails>({ email: '', password: '', role: userRole.client });
  const loginStatus = useSelector((state: RootState) => state.auth.loginStatus);
  const dispatch = useDispatch<AppDispatch>();
  let navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault()
    dispatch(verifyUser(user))
  };

  // useEffect(() => {
  //   if (loginStatus === 'succeeded') {
  //     navigate('/home');
  //   }
  // }, [loginStatus]);

  return (
    <>
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
                        <input value={user.email} type="email" className="form-control" onChange={(e) => setUser({ ...user, email: e.target.value })} name="email" id="email" placeholder="recruiter@example.com" required />
                      </div>
                      <div className="col-12 from-row">
                        <label className="form-label">Password <span className="text-danger">*</span></label>
                        <input value={user.password} type="password" onChange={(e) => setUser({ ...user, password: e.target.value })} className="form-control" name="password" id="password" required />
                      </div>
                      {/* <div className="col-12 from-row">
                        <label className="form-label">Role <span className="text-danger">*</span></label>
                        <select value={user.role} onChange={(e) => setUser({ ...user, role: e.target.value })} className="form-control" aria-label="Default select example">
                          <option >Admin</option>
                          <option >Client</option>
                          <option >Interviwer</option>
                        </select>

                      </div> */}
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
                        <button className="btn bsb-btn-xl btn-primary" type="submit">Log in now</button>
                      </div>
                    </div>

                  </form>
                  <div className="row">
                    <div className="col-12 from-row">
                      <hr className="border-secondary-subtle" />
                      <div className="d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-end">
                        <a href="#!" className="link-secondary text-decoration-none">Create new account</a>
                        <a href="#!" className="link-secondary text-decoration-none">Forgot password</a>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div >
      </section >

    </>
  )
}

export default SignIn
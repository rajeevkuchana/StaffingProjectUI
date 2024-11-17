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
import { useKeycloak } from '@react-keycloak/web';

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

  const loginHandler = () => {
    keycloak.login({ redirectUri: window.location.origin + '/home' }).then(() => {
    }).catch((error) => {
      console.error('Login failed:', error);
    });
  };

  return (
    <>
      <section className="pt-2 ">
        <div className="d-flex justify-content-center">
          <div className="col-4 border-light-subtle shadow-sm col-md-4 p-5">
            <img className="img-fluid rounded-start w-100 h-100 object-fit-cover" loading="lazy"
              src={signInImage} alt="BootstrapBrain Logo" />
            <button type="button" onClick={loginHandler} className="mt-2 btn w-100 btn-block btn-primary">Login</button>
          </div>
        </div>
      </section >
    </>
  )
}

export default SignIn
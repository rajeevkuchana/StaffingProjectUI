import './App.css'
import Home from './Pages/Home'
import Navbar from './Components/Navbar'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Selected from './Pages/Client/Selected'
import SignIn from './Pages/SingIn'
import Footer from './Components/Footer'
import User from './Pages/Client/SearchUser'
import InterviwerUser from './Pages/Interview/InterviwerUser'
import InterviwerSearch from './Pages/Interview/InterviwerSearch'
import PrivateRoutes from './Hooks/ProtectedRoute'
import { useSelector } from 'react-redux'
import AddUsers from './Pages/Admin/AddUsers'
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import 'bootstrap/dist/css/bootstrap.css';
import SearchUser from './Pages/Client/SearchUser'
import AdminSearch from './Pages/Admin/AdminSearch'
import AdminProfileCreate from './Pages/Admin/AdminProfile'
import RecruiterSearch from './Pages/Recruiter/RecruiterSearch'
import RecruiterProfileCreate from './Pages/Recruiter/RecruiterProfile'
import { uuidv4 } from './Utils/Utils'
import JobSubCategory from './Pages/Client/JobSubCategory'
import JobCategory from './Pages/Client/JobCategory'
import Profiles from './Pages/Client/Profiles'

const App = () => {
  const user = useSelector((state: any) => state.auth.user);
  return (
    <BrowserRouter>
      {<Navbar />}
      <main className='container  pt-2'>
        <Routes>
          <Route path='/login' element={<SignIn />} />
          <Route path='/home' element={<Home />} />
          <Route path='/' element={<Home />} />
          <Route element={<PrivateRoutes />}>
            <Route path='/client/profile/:jobCategory' element={<JobCategory />} />
            <Route path='/client/profile/:jobCategory/:jobProfileSub' element={<JobSubCategory />} />
            <Route path='/client/profile/:jobCategory/:jobProfileSub/:id/result-list' element={<Profiles />} />
            <Route path='/client/selected' element={<Selected />} />
            <Route path='/client/search/:id' element={<SearchUser />} />
            <Route path='/interviwer/search' element={<InterviwerSearch />} />
            <Route path='/interviwer/create' element={<InterviwerUser />} />
            <Route path='/admin/user' element={<AddUsers />} />
            <Route path='/admin/profile' element={<AdminSearch />} />
            <Route path='/admin/profile-create' element={<AdminProfileCreate />} />
            <Route path='/recruiter/profile' element={<RecruiterSearch />} />
            <Route path='/recruiter/profile-create' element={<RecruiterProfileCreate />} />

          </Route>
        </Routes>
      </main>

      {<Footer />}

    </BrowserRouter>
  )
}

export default App
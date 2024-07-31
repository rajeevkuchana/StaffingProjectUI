import './App.css'
import Home from './Pages/Home'
import Navbar from './Components/Navbar'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Selected from './Pages/Client/Selected'
import Search from './Pages/Client/Search'
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
            <Route path='/client/profile/:jobCategory' element={<Search />} />
            {/* <Route path='/client/profile/parttime' element={<Search />} />
            <Route path='/client/profile/contractC2H' element={<Search />} />
            <Route path='/client/profile/premium' element={<Search />} />
            <Route path='/client/profile/executive' element={<Search />} />
            <Route path='/client/profile/selected' element={<Search />} />
            <Route path='/client/search/:id' element={<SearchUser />} /> */}
            {/* <Route path='/client/selected' element={<Selected />} /> */}
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
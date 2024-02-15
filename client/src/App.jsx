import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Header from './components/Header/Header';
import PrivateRoute from './components/PrivateRoute';
import Problempage from './pages/ProblemPage/PlayGround/PlayGround';
import AdminRoute from './components/AdminRoute';
import AdminPage from './pages/Admin/AdminPage';
import CreateProblem from './pages/Admin/CreateProblem';
import UpdateProblem from './pages/Admin/UpdateProblem';
import WorkSpace from './pages/ProblemPage/WorkSpace';

export default function App() {
  return (
    <BrowserRouter >
      {/* header */}
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/Problempage' element={<Problempage/>}/> 
          <Route path='/createProblem' element={<CreateProblem />} />
          <Route path='/updateProblem/:id' element={<UpdateProblem />} />
          <Route path='/workspace/:id' element={<WorkSpace />} />
        </Route >
        {/* <Route element={<AdminRoute />}> */}
          <Route path='admin/adminDashboard' element={<AdminPage />}/>
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

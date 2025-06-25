import { BrowserRouter, Route, Routes, Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAtomValue } from 'jotai'
import { useEffect } from 'react'
import './App.css'
import { userAtom } from './store/userAtom'
import Login from './pages/Login'
import Home from './pages/Home'
import { Toaster } from 'react-hot-toast'
import { connectSocket } from './utils/socket'



//Function to check authentication
const Layout = () => {
  const user = useAtomValue(userAtom)
  console.log(user);
  const location = useLocation();

  // Connect socket when user is authenticated (including on page refresh)
  useEffect(() => {
    if (user?.token && user._id) {
      connectSocket(user);
    }
  }, [user]);

  return user?.token ? (
    <Outlet />
  ) : (
    <Navigate to={'/login'} state={{from : location}} replace />
  )

}


function App() {

  return (
    <BrowserRouter>
      
      <Routes>
        {/* Authenticated Routes */}
        <Route element={<Layout />}>
          <Route path= '/' element={<Home />}/>
        </Route>
        {/* Non Authenticated Routes */}
        <Route path='/login' element={<Login />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  )
}

export default App

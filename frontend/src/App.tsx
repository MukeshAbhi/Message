import { BrowserRouter, Route, Routes, Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAtomValue } from 'jotai'
import './App.css'
import { userAtom } from './store/userAtom'
import Login from './pages/Login'

//Function to check authentication 
const Layout = () => {
  const user = useAtomValue(userAtom)
  console.log(user);
  const location = useLocation();

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
          <Route path= '/' />
        </Route>
        {/* Non Authenticated Routes */}
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

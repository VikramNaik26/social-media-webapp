import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
  Route,
} from 'react-router-dom'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Regiter from './pages/register/Regiter'
import Profile from './pages/profile/Profile'
import NavBar from './components/navBar/NavBar'
import LeftBar from './components/leftBar/LeftBar'
import RightBar from './components/rightBar/RightBar'

const App = () => {
  const currentUser = false

  const Layout = () => {
    return (
      <div>
        <NavBar />
        <div style={{ display: 'flex' }}>
          <LeftBar />
          <Outlet />
          <RightBar />
        </div>
      </div>
    )
  }

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to={'/login'} />
    }
    return children
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
        // <Layout />
      ),
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/profile/:id',
          element: <Profile />,
        },
      ],
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/register',
      element: <Regiter />,
    },
  ])

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}
export default App

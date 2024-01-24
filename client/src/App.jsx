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

const App = () => {
  const router = createBrowserRouter([
    /* {
      path: '/',
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
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
    }, */
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

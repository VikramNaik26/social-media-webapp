import { useContext, useState } from 'react'
import './login.scss'

import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })

  const [error, setError] = useState(null)

  const navigate = useNavigate()

  const { login } = useContext(AuthContext)

  const handleLogin = async (e) => {
    e.preventDefault()
    const newUser = Object.fromEntries(new FormData(e.currentTarget))
    setFormData(newUser)

    // console.log(newUser)

    try {
      await login(newUser)
      navigate('/')
    } catch (error) {
      setError(error.response.data)
    }
  }

  return (
    <section className="login">
      <div className="card">
        <div className="left">
          <h1>Hello World.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form onSubmit={handleLogin}>
            <input type="text" placeholder="Username" name="username" />
            <input type="password" placeholder="Password" name="password" />
            <button type="submit">Login</button>
            {error && <p>{error}</p>}
          </form>
        </div>
      </div>
    </section>
  )
}
export default Login

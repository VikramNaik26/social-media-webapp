import { useState } from 'react'
import './register.scss'

import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Regiter = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    name: '',
  })
  const navigate = useNavigate()

  // console.log(formData)

  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    // const formData = new FormData(e.currentTarget)
    // const newUser = Object.fromEntries(formData)
    // console.log(newUser)
    const newUser = Object.fromEntries(new FormData(e.currentTarget))
    setFormData(newUser)

    try {
      await axios.post('http://localhost:8800/api/v1/auth/register', newUser)
      setError(null)
      navigate('/login')
    } catch (error) {
      setError(error)
    }
  }

  return (
    <section className="register">
      <div className="card">
        <div className="left">
          <h1>Social Nexa</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Username" name="username" />
            <input type="email" placeholder="Email" name="email" />
            <input type="password" placeholder="Password" name="password" />
            <input type="text" placeholder="Name" name="name" />
            {error && <p>{error.response.data.msg}</p>}
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </section>
  )
}
export default Regiter

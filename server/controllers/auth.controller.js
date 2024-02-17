import { db } from '../connect.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const login = (req, res) => {
  const q = 'SELECT * FROM users WHERE username = ?'

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json({ msg: err })
    // console.log(data)
    if (data.length === 0)
      return res.status(404).json({ msg: 'user not found' })

    const checkPassword = bcrypt.compareSync(
      req.body.password,
      data[0].password
    )
    if (!checkPassword)
      return res.status(400).json({ msg: 'wrong password or username' })

    const token = jwt.sign({ id: data[0].id }, 'secretkey')

    const { password, ...rest } = data[0]
;
    res
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .status(200)
      .json(rest)
  })
}

export const register = (req, res) => {
  // check if the user already exists in database
  const q = 'SELECT * FROM users WHERE username = ?'

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json({ msg: err })
    if (data.length) return res.status(409).json({ msg: 'user already exists' })
    // create a new user
    // hash its password
    const salt = bcrypt.genSaltSync(10)
    const hashPassword = bcrypt.hashSync(req.body.password, salt)

    const q =
      'INSERT INTO users (`username`, `email`, `password`, `name`) VALUES (?)'

    const values = [
      req.body.username,
      req.body.email,
      hashPassword,
      req.body.name,
    ]
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json({ msg: err })
      return res.status(200).json({ msg: 'user has been created' })
    })
  })
}

export const logout = (req, res) => {
  res
    .clearCookie('access_token', {
      secure: true,
      sameSite: 'none',
    })
    .status(200)
    .json({ msg: 'logout successful' })
}

import { db } from '../connect.js'
import jwt from 'jsonwebtoken'

export const getUser = (req, res) => {
  // TODO
  const userId = req.params.userId
  const q = 'SELECT * FROM users WHERE id = ?'

  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json(err)
    const { password, ...info } = data[0]
    return res.status(200).json(info)
  })
}

export const getAllUser = (req, res) => {
  // TODO
  const userId = req.params.userId
  const q = 'SELECT * FROM users WHERE NOT id = ?'

  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json(err)
    // const { password, ...info } = data[0]
    let allUsers = []
    data.forEach((user) => {
      const { password, ...info } = user
      allUsers.push(info)
    })
    return res.status(200).json(allUsers)
  })
}

export const updateUser = (req, res) => {
  const token = req.cookies.access_token
  if (!token) return res.status(401).json('Not Logged in')

  jwt.verify(token, 'secretkey', (err, userInfo) => {
    if (err) return res.status(403).json('token is invalid')
    const q =
      'UPDATE users SET `name` = ?, `city` = ?, `website` = ?,`profilePic` = ?, `coverPic` = ? WHERE id = ?'

    db.query(
      q,
      [
        req.body.name,
        req.body.city,
        req.body.website,
        req.body.coverPic,
        req.body.profilePic,
        userInfo.id,
      ],
      (err, data) => {
        if (err) res.status(500).json(err)
        if (data.affectedRows > 0) return res.json('Updated!')
        return res.status(403).json('You can update only your post!')
      }
    )
  })
}

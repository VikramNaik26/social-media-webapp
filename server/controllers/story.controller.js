import jwt from 'jsonwebtoken'
import { db } from '../connect.js'
import moment from 'moment/moment.js'

export const getStory = (req, res) => {
  const userId = req.query.userId
  const token = req.cookies.access_token
  // console.log(req.cookies)
  if (!token) return res.status(401).json('Not Logged in')

  jwt.verify(token, 'secretkey', (err, userInfo) => {
    if (err) return res.status(403).json('token is invalid')
    const q = `SELECT DISTINCT s.id, s.*, u.id AS userId, u.name, u.profilePic FROM stories AS s JOIN users AS u ON (u.id = s.userId)
        LEFT JOIN relationships AS r ON (s.userId = r.followedUserId) WHERE r.followerUserId= ? OR s.userId =?`

    const values = [userInfo.id, userInfo.id]

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err)
      return res.status(200).json(data)
    })
  })
}

export const addStory = (req, res) => {
  const token = req.cookies.access_token
  if (!token) return res.status(401).json('Not Logged in')

  jwt.verify(token, 'secretkey', (err, userInfo) => {
    if (err) return res.status(403).json('token is invalid')
    const q = 'INSERT INTO stories(`img`, `userId`) VALUES (?)'

    const values = [req.body.img, userInfo.id]

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err)

      // console.log(data)
      return res.status(200).json('Story has been created')
    })
  })
}

export const deleteStory = (req, res) => {
  const token = req.cookies.access_token
  if (!token) return res.status(401).json('Not logged in!')

  jwt.verify(token, 'secretkey', (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!')

    const q = 'DELETE FROM stories WHERE `id` = ? AND `userId` = ?'

    db.query(q, [req.params.id, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err)
      if (data.affectedRows > 0)
        return res.status(200).json('Post has been deleted.')
      return res.status(403).json('You can delete only your post')
    })
  })
}

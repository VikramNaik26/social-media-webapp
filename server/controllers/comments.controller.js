import { db } from '../connect.js'
import jwt from 'jsonwebtoken'
import moment from 'moment/moment.js'

export const getComments = (req, res) => {
  const q = `SELECT c.*, u.id AS userId, name, profilePic FROM comments AS c JOIN users AS u ON (u.id = c.userId)
  WHERE c.postId = ? ORDER BY c.createdAt DESC`

  db.query(q, [req.query.postId], (err, data) => {
    if (err) return res.status(500).json(err)

    return res.status(200).json(data)
  })
}

export const addComment = (req, res) => {
  const token = req.cookies.access_token
  if (!token) return res.status(401).json('Not Logged in')

  jwt.verify(token, 'secretkey', (err, userInfo) => {
    if (err) return res.status(403).json('token is invalid')
    const q =
      'INSERT INTO comments(`desc`, `createdAt`, `userId`, `postId`) VALUES (?)'

    const values = [
      req.body.desc,
      moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
      userInfo.id,
      req.body.postId,
    ]

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err)

      // console.log(data)
      return res.status(200).json('Comment has been created')
    })
  })
}

export const deleteComment = (req, res) => {
  const token = req.cookies.access_token
  if (!token) return res.status(401).json('Not logged in!')

  jwt.verify(token, 'secretkey', (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!')

    const q = 'DELETE FROM comments WHERE `id` = ? AND `userId` = ?'

    db.query(q, [req.params.id, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err)
      if (data.affectedRows > 0)
        return res.status(200).json('Post has been deleted.')
      return res.status(403).json('You can delete only your post')
    })
  })
}

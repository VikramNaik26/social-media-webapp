import { db } from '../connect.js'
import jwt from 'jsonwebtoken'

export const getRelationships = (req, res) => {
  const q = 'SELECT followerUserId FROM relationships WHERE followedUserid = ?'

  db.query(q, [req.query.followedUserId], (err, data) => {
    if (err) return res.status(500).json(err)
    return res
      .status(200)
      .json(data.map((relationship) => relationship.followerUserId))
  })
}

export const addRelationship = (req, res) => {
  const token = req.cookies.access_token
  if (!token) return res.status(401).json('Not Logged in')

  jwt.verify(token, 'secretkey', (err, userInfo) => {
    if (err) return res.status(403).json('token is invalid')
    const q =
      'INSERT INTO relationships (`followerUserId`, `followedUserId`) VALUES (?)'

    const values = [userInfo.id, req.body.userId]

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err)

      // console.log(data)
      return res.status(200).json('following')
    })
  })
}

export const deleteRelationship = (req, res) => {
  const token = req.cookies.access_token
  if (!token) return res.status(401).json('Not Logged in')

  jwt.verify(token, 'secretkey', (err, userInfo) => {
    if (err) return res.status(403).json('token is invalid')
    const q = 'DELETE FROM relationships WHERE `followerUserId` = ?  AND `followedUserId` = ?'

    db.query(q, [userInfo.id, req.query.userId], (err, data) => {
      if (err) return res.status(500).json(err)

      // console.log(data)
      return res.status(200).json('Unfollowed')
    })
  })
}

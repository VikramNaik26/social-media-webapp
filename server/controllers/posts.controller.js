import jwt from 'jsonwebtoken'
import { db } from '../connect.js'
import moment from 'moment/moment.js'

export const getPosts = (req, res) => {
  const token = req.cookies.access_token
  // console.log(req.cookies)
  if (!token) return res.status(401).json('Not Logged in')

  jwt.verify(token, 'secretkey', (err, userInfo) => {
    if (err) return res.status(403).json('token is invalid')
    // res.json(userInfo)
    // console.log(userInfo)
    // return userInfo
    const q = `SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) LEFT JOIN relationships AS r ON (p.userId = r.followedUserId) WHERE r.followerUserId = ? OR p.userId = ? ORDER BY p.createdAt DESC`

    db.query(q, [userInfo.id, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err)

      // console.log(data)
      return res.status(200).json(data)
    })
  })

  // const q = `SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) JOIN relationships AS r ON (p.userId = r.followedUserId) WHERE (r.followerUserId = ? OR p.userId = ?)`

  // db.query(q, [29, 29], (err, data) => {
  //   if (err) return res.status(500).json(err)

  //   return res.status(200).json(data)
  // })
}



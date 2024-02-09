import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

import userRoutes from './routes/user.route.js'
import postsRoute from './routes/posts.route.js'
import likesRoute from './routes/likes.route.js'
import commentsRoute from './routes/comments.route.js'
import authRoute from './routes/auth.route.js'

app.use((req, res, next) => {
  res.header('access-control-allow-origin')
  next()
})

app.use(express.json())
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
)
app.use(cookieParser())

app.use('/api/v1/auth', authRoute)
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/posts', postsRoute)
app.use('/api/v1/likes', likesRoute)
app.use('/api/v1/comments', commentsRoute)

app.listen(8800, () => console.log('server listening on port 8800'))

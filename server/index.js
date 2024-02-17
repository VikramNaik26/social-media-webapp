import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import multer from 'multer'

const app = express()

import userRoutes from './routes/user.route.js'
import postsRoute from './routes/posts.route.js'
import likesRoute from './routes/likes.route.js'
import commentsRoute from './routes/comments.route.js'
import authRoute from './routes/auth.route.js'

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', 'true')
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

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/public/upload')
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    // cb(null, file.fieldname + '-' + uniqueSuffix)

    cb(null, Date.now() + file.originalname)
  },
})

const upload = multer({ storage: storage })

app.post('/api/v1/upload', upload.single('file'), (req, res) => {
  const file = req.file
  res.status(200).json(file.filename)
})

app.use('/api/v1/auth', authRoute)
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/posts', postsRoute)
app.use('/api/v1/likes', likesRoute)
app.use('/api/v1/comments', commentsRoute)

app.listen(8800, () => console.log('server listening on port 8800'))

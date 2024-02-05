import express from 'express'

import userRoutes from './routes/user.route.js'
import postsRoute from './routes/posts.route.js'
import likesRoute from './routes/likes.route.js'
import commentsRoute from './routes/comments.route.js'
import authRoute from './routes/auth.route.js'

const app = express()

app.use('/api/v1/auth', authRoute)
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/posts', postsRoute)
app.use('/api/v1/likes', likesRoute)
app.use('/api/v1/comments', commentsRoute)

app.listen(8800, () => console.log('server listening on port 8800'))

import './post.scss'

import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined'
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined'
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'

import moment from 'moment/moment'
import { Link } from 'react-router-dom'
import Comments from '../comments/Comments'
import { useContext, useState } from 'react'
import { makeRequest } from '../../axios.js'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { AuthContext } from '../../context/authContext.jsx'

const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false)

  const { currentUser } = useContext(AuthContext)
  // const liked = true
  const queryKey = ['likes', post.id]
  const fetchPosts = async () => {
    const response = await makeRequest.get('/likes?postId=' + post.id)
    return response.data
  }

  // Use the useQuery hook
  const { data, isLoading, error } = useQuery({
    queryKey,
    queryFn: () => fetchPosts(),
  })

  // console.log(data)

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (liked) => {
      if (liked) return makeRequest.delete('/likes?postId=' + post.id)
      return makeRequest.post('/likes', { postId: post.id })
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['likes'] })
    },
  })

  const handleLike = () => {
    mutation.mutate(data.includes(currentUser.id))
  }

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userinfo">
            <img src={post.profilePic} alt={post.name} />
            <div className="details">
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
                className="detail-link"
              >
                <span className="name">{post.name}</span>
                <span className="date">{moment(post.createdAt).fromNow()}</span>
              </Link>
            </div>
          </div>
          <MoreHorizIcon />
        </div>
        <div className="content">
          <p>{post.desc}</p>
          <img src={`./upload/${post.img}`} alt="" />
        </div>
        <div className="info">
          <div className="item">
            {data ? (
              isLoading ? (
                'loading...'
              ) : data.includes(currentUser.id) ? (
                <FavoriteOutlinedIcon
                  style={{ color: 'red' }}
                  onClick={handleLike}
                />
              ) : (
                <FavoriteBorderOutlinedIcon onClick={handleLike} />
              )
            ) : null}
            {data ? `${data.length} Likes` : null}
            {/* {console.log(data.length)} */}
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            12 Comments
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        {commentOpen && <Comments postId={post.id} />}
      </div>
    </div>
  )
}
export default Post

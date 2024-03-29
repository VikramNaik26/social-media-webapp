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
  const [menuOpen, setMenuOpen] = useState(false)

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

  // delete
  const deleteMutation = useMutation({
    mutationFn: (postId) => {
      return makeRequest.delete('/posts/' + postId)
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })

  const handleDelete = () => {
    deleteMutation.mutate(post.id)
  }

  // console.log(post)

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userinfo">
            <img
              src={
                post.profilePic
                  ? `/upload/${post.profilePic}`
                  : 'https://imgs.search.brave.com/MWlI8P3aJROiUDO9A-LqFyca9kSRIxOtCg_Vf1xd9BA/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAyLzE1Lzg0LzQz/LzM2MF9GXzIxNTg0/NDMyNV90dFg5WWlJ/SXllYVI3TmU2RWFM/TGpNQW15NEd2UEM2/OS5qcGc'
              }
              alt={post.name}
            />
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
          <MoreHorizIcon onClick={() => setMenuOpen((prev) => !prev)} />
          {menuOpen && post.userId === currentUser.id && (
            <button onClick={handleDelete}>delete</button>
          )}
        </div>
        <div className="content">
          <p>{post.desc}</p>
          <img src={`/upload/${post.img}`} alt="" />
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
            Comments
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

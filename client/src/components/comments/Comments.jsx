import { useContext, useState } from 'react'
import './comments.scss'
import { AuthContext } from '../../context/authContext'
import { makeRequest } from '../../axios.js'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import moment from 'moment/moment.js'

const Comments = ({ postId }) => {
  const { currentUser } = useContext(AuthContext)
  const [desc, setDesc] = useState('')

  const queryKey = ['comments']
  const fetchPosts = async () => {
    const response = await makeRequest.get('/comments?postId=' + postId)
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
    mutationFn: (newComment) => {
      return makeRequest.post('/comments', newComment)
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['comments'] })
    },
  })

  const handleClick = async (e) => {
    e.preventDefault()
    mutation.mutate({ desc, postId })
    setDesc('')
  }

  // delete comments
  const deleteMutation = useMutation({
    mutationFn: (commentId) => {
      return makeRequest.delete('/comments/' + commentId)
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['comments'] })
    },
  })

  const handleDelete = (commentId) => {
    deleteMutation.mutate(commentId)
  }

  //Temporary
  // const comments = [
  //   {
  //     id: 1,
  //     desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam',
  //     name: 'John Doe',
  //     userId: 1,
  //     profilePicture:
  //       'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  //   },
  //   {
  //     id: 2,
  //     desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam',
  //     name: 'Jane Doe',
  //     userId: 2,
  //     profilePicture:
  //       'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600',
  //     ]
  //   },

  return (
    <div className="comments">
      <div className="write">
        <img src={`/upload/${currentUser.profilePic}`} alt="" />
        <input
          type="text"
          placeholder="write a comment"
          onChange={(e) => setDesc(e.target.value)}
          value={desc}
          required
        />
        <button onClick={handleClick}>Send</button>
      </div>
      {isLoading
        ? 'loading...'
        : data.map((comment) => (
            <div className="comment" key={comment.id}>
              <img src={`/upload/${comment.profilePic}`} alt="" />
              {/* {console.log(comment)} */}
              <div className="info">
                <span>{comment.name}</span>
                <p>{comment.desc}</p>
              </div>
              <span className="date">
                {moment(comment.createdAt).fromNow()}
              </span>

              <button
                className="deleteBtn"
                onClick={() => handleDelete(comment.id)}
              >
                delete
              </button>
            </div>
          ))}
    </div>
  )
}
export default Comments

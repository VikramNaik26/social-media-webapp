import Post from '../post/Post'
import './posts.scss'

import { makeRequest } from '../../axios.js'

import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

const Posts = ({ userId }) => {
  ///////////////////////////////////
  /* const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  const fetchPosts = async () => { */
  /* const response = await makeRequest.get('/posts')
    return response.data */
  /*     try {
      const response = await fetch(' http://localhost:8800/api/v1/posts', {
        credentials: 'include',
      })
      const data = await response.json()
      console.log(data)
      setIsLoading(true)
      setData(data)
      setIsLoading(false)
      setError(false)
    } catch (error) {
      setIsLoading(false)
      setError(error)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, []) */
  /////////////////////////////////////
  const queryKey = ['posts']
  const fetchPosts = async () => {
    const response = await makeRequest.get('/posts?userId=' + userId)
    return response.data
  }

  // Use the useQuery hook
  const { data, isLoading, error } = useQuery({
    queryKey,
    queryFn: () => fetchPosts(),
  })

  // console.log(data)

  /* const { isLoading, error, data } = useQuery({
    queryKey: ['posts'],
    queryFn: () =>
      makeRequest.get('/posts').then((res) => {
        return res.data
      }),
  }) */

  //TEMPORARY
  // const posts = [
  //   {
  //     id: 1,
  //     name: 'John Doe',
  //     userId: 1,
  //     profilePic:
  //       'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600',
  //     desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
  //     img: 'https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600',
  //   },
  //   {
  //     id: 2,
  //     name: 'Jane Doe',
  //     userId: 2,
  //     profilePic:
  //       'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600',
  //     desc: 'Tenetur iste voluptates dolorem rem commodi voluptate pariatur, voluptatum, laboriosam consequatur enim nostrum cumque! Maiores a nam non adipisci minima modi tempore.',
  //   },
  // ]

  return (
    <section className="posts">
      {error
        ? 'Something went wrong!'
        : isLoading
        ? 'loading...'
        : data.map((post) => (
            <div className="post" key={post.id}>
              <Post post={post} />
            </div>
          ))}
    </section>
  )
}
export default Posts

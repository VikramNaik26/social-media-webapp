import './profile.scss'

import FacebookTwoToneIcon from '@mui/icons-material/FacebookTwoTone'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import InstagramIcon from '@mui/icons-material/Instagram'
import PinterestIcon from '@mui/icons-material/Pinterest'
import TwitterIcon from '@mui/icons-material/Twitter'
import PlaceIcon from '@mui/icons-material/Place'
import LanguageIcon from '@mui/icons-material/Language'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Posts from '../../components/posts/Posts'

import { makeRequest } from '../../axios.js'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { AuthContext } from '../../context/authContext.jsx'
import { useLocation } from 'react-router-dom'
import { useContext } from 'react'

const Profile = () => {
  const { currentUser } = useContext(AuthContext)

  const userId = parseInt(useLocation().pathname.split('/')[2])
  const queryKey = ['user']
  const fetchPosts = async () => {
    const response = await makeRequest.get('/users/find/' + userId)
    return response.data
  }

  // Use the useQuery hook
  const { data, isLoading, error } = useQuery({
    queryKey,
    queryFn: () => fetchPosts(),
  })

  // console.log(data)

  // relatinships
  const realtionshipsQueryKey = ['relationship']
  const relationshipsFetchPosts = async () => {
    const response = await makeRequest.get(
      '/relationships?followedUserId=' + userId
    )
    return response.data
  }

  // Use the useQuery hook
  const { data: relatinshipsData, isLoading: rIsLoading } = useQuery({
    queryKey: realtionshipsQueryKey,
    queryFn: () => relationshipsFetchPosts(),
  })

  // console.log(relatinshipsData)

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (following) => {
      if (following)
        return makeRequest.delete('/relationships?userId=' + userId)
      return makeRequest.post('/relationships', { userId })
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['relationship'] })
    },
  })

  const handleFollow = () => {
    mutation.mutate(relatinshipsData.includes(currentUser.id))
  }

  return (
    <section className="profile">
      <div className="images">
        {data ? (
          <img src="coverpic" alt="cover image" className="cover" />
        ) : null}
        {data ? (
          <img src={data.profilePic} alt="" className="profilePic" />
        ) : null}
      </div>
      {isLoading ? (
        'loading...'
      ) : (
        <>
          <div className="profileContainer">
            <div className="uInfo">
              <div className="left">
                <a href="http://facebook.com">
                  <FacebookTwoToneIcon fontSize="small" />
                </a>
                <a href="http://facebook.com">
                  <InstagramIcon fontSize="small" />
                </a>
                <a href="http://facebook.com">
                  <TwitterIcon fontSize="small" />
                </a>
                <a href="http://facebook.com">
                  <LinkedInIcon fontSize="small" />
                </a>
                <a href="http://facebook.com">
                  <PinterestIcon fontSize="small" />
                </a>
              </div>
              <div className="center">
                <span>{data.name}</span>
                <div className="info">
                  <div className="item">
                    <PlaceIcon />
                    <span>{data.city}</span>
                  </div>
                  <div className="item">
                    <LanguageIcon />
                    <span>{data.website}</span>
                  </div>
                </div>
                {rIsLoading ? (
                  'loading...'
                ) : userId === currentUser.id ? (
                  <button>Update</button>
                ) : (
                  <button onClick={handleFollow}>
                    {relatinshipsData.includes(currentUser.id)
                      ? 'Following'
                      : 'Follow'}
                  </button>
                )}
              </div>
              <div className="right">
                <EmailOutlinedIcon />
                <MoreVertIcon />
              </div>
            </div>
            <Posts userId={userId} />
          </div>
        </>
      )}
    </section>
  )
}
export default Profile

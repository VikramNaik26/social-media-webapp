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
import CircularIndicator from '../../components/circularIndicator/CircularIndicator'
import Posts from '../../components/posts/Posts'

import { makeRequest } from '../../axios.js'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { AuthContext } from '../../context/authContext.jsx'
import { useLocation, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import Update from '../../components/update/Update.jsx'

const Profile = () => {
  const { currentUser } = useContext(AuthContext)
  const navigate = useNavigate()

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

  const handleLogout = async () => {
    const response = await makeRequest.post(
      'http://localhost:8800/api/v1/auth/logout'
    )
    if (response) {
      localStorage.removeItem('user')
      navigate('/login')
    }
  }

  // update model
  const [openUpdate, setOpenUpdate] = useState(false)

  return (
    <section className="profile">
      <div className="images">
        {data ? (
          <img
            src={
              data.coverPic
                ? `/upload/${data.coverPic}`
                : 'https://imgs.search.brave.com/e4pr3irpxliE78o2jJll9c9wVmsM6UeBFJ4Q5dhzHJc/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXZlLmNv/bS93cC93cDM0NDgx/MjguanBn'
            }
            alt="cover image"
            className="cover"
          />
        ) : null}
        {data ? (
          <img
            src={
              data.profilePic
                ? `/upload/${data.profilePic}`
                : 'https://imgs.search.brave.com/MWlI8P3aJROiUDO9A-LqFyca9kSRIxOtCg_Vf1xd9BA/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAyLzE1Lzg0LzQz/LzM2MF9GXzIxNTg0/NDMyNV90dFg5WWlJ/SXllYVI3TmU2RWFM/TGpNQW15NEd2UEM2/OS5qcGc'
            }
            alt=""
            className="profilePic"
          />
        ) : null}
      </div>
      {isLoading ? (
        <CircularIndicator />
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
                    <span className="website">
                      <a
                        href="https://github.com/VikramNaik26/social-media-webapp"
                        target="_blank"
                      >
                        {data.website}
                      </a>
                    </span>
                  </div>
                </div>
                {rIsLoading ? (
                  <CircularIndicator />
                ) : userId === currentUser.id ? (
                  <div className="btn-container">
                    <button onClick={handleLogout}>Logout</button>
                    <button onClick={() => setOpenUpdate(true)}>Update</button>
                  </div>
                ) : (
                  <div className="btn-container">
                    <button onClick={handleFollow}>
                      {relatinshipsData.includes(currentUser.id)
                        ? 'Following'
                        : 'Follow'}
                    </button>
                  </div>
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
      {openUpdate ? <Update setOpenUpdate={setOpenUpdate} user={data} /> : null}
    </section>
  )
}
export default Profile

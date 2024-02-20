import './rightBar.scss'
import { makeRequest } from '../../axios.js'
import { useQuery } from '@tanstack/react-query'
import { AuthContext } from '../../context/authContext.jsx'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import CircularIndicator from '../circularIndicator/CircularIndicator.jsx'

const RightBar = () => {
  const { currentUser } = useContext(AuthContext)
  const navigate = useNavigate()
  const userId = currentUser.id

  const queryKey = ['userAll']
  const fetchUsers = async () => {
    const response = await makeRequest.get('/users/findAll/' + userId)
    return response.data
  }

  // Use the useQuery hook
  const { data, isLoading, error } = useQuery({
    queryKey,
    queryFn: () => fetchUsers(),
  })

  // console.log(data)

  return (
    <section className="rightbar">
      <div className="container">
        {isLoading ? (
          <CircularIndicator />
        ) : (
          <div className="item">
            <h4>Suggestions for you</h4>
            {data.map((user) => {
              return (
                <div key={user.id} className="user">
                  <div className="userinfo">
                    <img
                      src={
                        user.profilePic
                          ? `/upload/${user.profilePic}`
                          : 'https://imgs.search.brave.com/MWlI8P3aJROiUDO9A-LqFyca9kSRIxOtCg_Vf1xd9BA/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAyLzE1Lzg0LzQz/LzM2MF9GXzIxNTg0/NDMyNV90dFg5WWlJ/SXllYVI3TmU2RWFM/TGpNQW15NEd2UEM2/OS5qcGc'
                      }
                      alt=""
                    />
                    <span>{user.name}</span>
                  </div>
                  <div className="buttons">
                    <button
                      type="button"
                      onClick={() => {
                        navigate(`/profile/${user.id}`)
                        location.reload()
                      }}
                    >
                      view
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        <div className="item">
          <h4>Latest Activity</h4>
          <div className="user">
            <div className="userinfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <p>
                <span>Jane Doe </span>
                changed thier profile picture
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userinfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <p>
                <span>Jane Doe </span>
                changed thier profile picture
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userinfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <p>
                <span>Jane Doe </span>
                changed thier profile picture
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userinfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <p>
                <span>Jane Doe </span>
                changed thier profile picture
              </p>
            </div>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="item">
          <h4>Online friends</h4>
          <div className="user">
            <div className="userinfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <div className="online" />
              <span>Jane Doe</span>
            </div>
          </div>
          <div className="user">
            <div className="userinfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <div className="online" />
              <span>Jane Doe</span>
            </div>
          </div>
          <div className="user">
            <div className="userinfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <div className="online" />
              <span>Jane Doe</span>
            </div>
          </div>
          <div className="user">
            <div className="userinfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <div className="online" />
              <span>Jane Doe</span>
            </div>
          </div>
          <div className="user">
            <div className="userinfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <div className="online" />
              <span>Jane Doe</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default RightBar

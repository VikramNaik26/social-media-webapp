import './leftBar.scss'
import Friends from '../../assets/icons/1.png'
import Groups from '../../assets/icons/2.png'
import Market from '../../assets/icons/3.png'
import Watch from '../../assets/icons/4.png'
import Memories from '../../assets/icons/5.png'
import Events from '../../assets/icons/6.png'
import Gaming from '../../assets/icons/7.png'
import Gallery from '../../assets/icons/8.png'
import Videos from '../../assets/icons/9.png'
import Messages from '../../assets/icons/10.png'
import Tutorials from '../../assets/icons/11.png'
import Courses from '../../assets/icons/12.png'
import Fund from '../../assets/icons/13.png'
import { useContext } from 'react'
import { AuthContext } from '../../context/authContext'
import { Link } from 'react-router-dom'

const LeftBar = () => {
  const { currentUser } = useContext(AuthContext)

  return (
    <section className="leftbar">
      <div className="menu">
        <div className="user">
          <Link to={`/profile/${currentUser.id}`}>
            <img
              src={
                currentUser.profilePic
                  ? `/upload/${currentUser.profilePic}`
                  : 'https://imgs.search.brave.com/MWlI8P3aJROiUDO9A-LqFyca9kSRIxOtCg_Vf1xd9BA/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAyLzE1Lzg0LzQz/LzM2MF9GXzIxNTg0/NDMyNV90dFg5WWlJ/SXllYVI3TmU2RWFM/TGpNQW15NEd2UEM2/OS5qcGc'
              }
              alt="user"
            />
            <span>{currentUser.name}</span>
          </Link>
        </div>
        <ul>
          <li>
            <img src={Friends} alt="friends" />
            <span>Freinds</span>
          </li>
          <li>
            <img src={Groups} alt="groups" />
            <span>Groups</span>
          </li>
          <li>
            <img src={Market} alt="marketplace" />
            <span>Marketplace</span>
          </li>
          {/*  <li>
            <img src={Watch} alt="watch" />
            <span>Watch</span>
          </li> */}
          <li>
            <img src={Memories} alt="Menories" />
            <span>Memories</span>
          </li>
        </ul>
      </div>
      <hr />
      <div className="menu">
        <span className="sub-heading">Your shorcuts</span>
        <ul>
          <li>
            <img src={Events} alt="friends" />
            <span>Events</span>
          </li>
          <li>
            <img src={Gaming} alt="groups" />
            <span>Gaming</span>
          </li>
          <li>
            <img src={Gallery} alt="marketplace" />
            <span>Gallery</span>
          </li>
          {/* <li>
            <img src={Videos} alt="watch" />
            <span>Videos</span>
          </li> */}
          <li>
            <img src={Messages} alt="Menories" />
            <span>Messages</span>
          </li>
        </ul>
      </div>
      <hr />
      <div className="menu">
        <span className="sub-heading">Others</span>
        <ul>
          <li>
            <img src={Fund} alt="friends" />
            <span>Fundraiser</span>
          </li>
          <li>
            <img src={Tutorials} alt="groups" />
            <span>Tutorials</span>
          </li>
          <li>
            <img src={Courses} alt="marketplace" />
            <span>Courses</span>
          </li>
        </ul>
      </div>
    </section>
  )
}
export default LeftBar

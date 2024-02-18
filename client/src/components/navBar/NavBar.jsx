import './navBar.scss'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined'
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { DarkModeContext } from '../../context/darkModeContext'
import { AuthContext } from '../../context/authContext'

const NavBar = () => {
  const { darkMode, toggle } = useContext(DarkModeContext)
  const { currentUser } = useContext(AuthContext)

  // console.log(currentUser)

  return (
    <nav>
      <div className="left">
        <Link to={'/'} style={{ textDecoration: 'none' }}>
          <span>Social Nexa</span>
        </Link>
        <ul>
          <li>
            <HomeOutlinedIcon />
          </li>
          <li>
            {darkMode ? (
              <WbSunnyOutlinedIcon onClick={toggle} />
            ) : (
              <DarkModeOutlinedIcon onClick={toggle} />
            )}
          </li>
          <li>
            <GridViewOutlinedIcon />
          </li>
        </ul>
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="right">
        <ul>
          <li>
            <PersonOutlinedIcon />
          </li>
          <li>
            <EmailOutlinedIcon />
          </li>
          <li>
            <NotificationsOutlinedIcon />
          </li>
          <li className="user">
            <Link to={`/profile/${currentUser.id}`}>
              <img src={`/upload/${currentUser.profilePic}`} alt="user" />
              <span>{currentUser.name}</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
export default NavBar

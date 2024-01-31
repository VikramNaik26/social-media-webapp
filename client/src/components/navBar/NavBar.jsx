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

const NavBar = () => {
  return (
    <nav>
      <div className="left">
        <Link to={'/'} style={{ textDecoration: 'none' }}>
          <span>lamasocial</span>
        </Link>
        <ul>
          <li>
            <HomeOutlinedIcon />
          </li>
          <li>
            <DarkModeOutlinedIcon />
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
            <img src="" alt="user" />
            <span>John Doe</span>
          </li>
        </ul>
      </div>
    </nav>
  )
}
export default NavBar

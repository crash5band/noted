import { FaSignInAlt, FaUserAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
  <header className="header">
    <Link to="/">
      <div className="logo">Noted</div>
    </Link>
    <div>
      <ul className="nav-list">
        <li>
          <Link to='login'>
            <FaSignInAlt /> Login
          </Link>
        </li>
        <li>
          <Link to='register'>
            <FaUserAlt /> Register
          </Link>
        </li>
      </ul>
    </div>
  </header>
)
}

export default Header
import { FaSignInAlt, FaSignOutAlt, FaUserAlt } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import { logout, reset } from "../features/auth/authSlice"

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user } = useSelector(state => state.auth)

  const onLogout = () => {
    dispatch(logout())
    navigate("/login")
    dispatch(reset())
  }

  return (
  <header className="header">
    <Link to="/">
      <div className="logo">📒Noted</div>
    </Link>
    <div>
      <ul className="nav-list">
        { user ? (
          <li>
            <button onClick={onLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </li>
        ) : (
          <>
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
          </>
        )}
      </ul>
    </div>
  </header>
)
}

export default Header
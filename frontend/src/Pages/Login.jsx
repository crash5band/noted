import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { login, reset } from "../features/auth/authSlice"
import { useEffect } from "react"
import Spinner from "../Components/Spinner"

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const { email, password } = formData
  const { user, isLoading, isSuccess, isError, message } = useSelector(state => state.auth)

  const onChange = e => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = e => {
    e.preventDefault()
    dispatch(login({ email, password }))
  }

  useEffect(() => {
    if (isError) {
      console.log("raise login error")
      toast.error(message)
    }

    if (isSuccess) {
      navigate("/")
    }
    
    dispatch(reset())
  }, [user, isSuccess, isError, message, dispatch, navigate])

  if (isLoading) {
    return <Spinner />
  }
  
  return (
    <div className="form-container">
      <section>
        <h3>Login</h3>
      </section>
      <form onSubmit={onSubmit}>
        <section className="form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" className="form-control" value={email} onChange={onChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" className="form-control" value={password} onChange={onChange}/>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">Submit</button>
            </div>
        </section>
      </form>
    </div>
  )
}

export default Login
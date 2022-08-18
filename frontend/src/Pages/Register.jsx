import { useState } from "react"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { register, reset } from "../features/auth/authSlice"
import { useEffect } from "react"
import Spinner from "../Components/Spinner"

const Register = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  })

  const { name, email, password, password2 } = formData
  const { user, isSuccess, isError, message, isLoading } = useSelector(state => state.auth)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (user && isSuccess) {
      navigate("/")
    }

    dispatch(reset())
  }, [user, isSuccess, isError, message, dispatch, navigate])

  const onChange = e => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = e => {
    e.preventDefault()

    if (password !== password2) {
      toast.error("Password do not match")
      return
    }

    const userData = {
      name,
      email,
      password
    }

    dispatch(register(userData))
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className="form-container">
      <section>
        <h3>Register</h3>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="name" name="name" id="name" className="form-control" value={name} onChange={onChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" className="form-control" value={email} onChange={onChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" className="form-control" value={password} onChange={onChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="password2">Confirm Password</label>
            <input type="password" name="password2" id="password2" className="form-control" value={password2} onChange={onChange}/>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default Register
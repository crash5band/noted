import { useState } from "react"


const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const { email, password } = formData

  const onChange = e => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="form-container">
      <section>
        <h3>Login</h3>
      </section>
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
    </div>
  )
}

export default Login
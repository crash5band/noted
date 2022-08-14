import { useState } from "react"

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  })

  const { name, email, password, password2 } = formData

  const onChange = e => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="form-container">
      <section>
        <h3>Register</h3>
      </section>
      <section className="form">
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
      </section>
    </div>
  )
}

export default Register
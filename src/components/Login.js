import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'

const Login = (props) => {

    const [credentials, setCredentials] = useState({email: "", password: ""})
    let history = useHistory();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
          });
          const json = await response.json();
          console.log(json);
          if(json.success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.authToken);
            props.showAlert("logged in Successfully", "success")
            history.push('/')
          }
          else{
            props.showAlert("Invalid Details", "danger")
          }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }






  return (
    <div className='container mt-2'>
      <h2 className='my-2'>Login to continue TaskM</h2>
      <form onSubmit={handleSubmit}>
  <div className="my-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name='email' onChange={onChange} value={credentials.email} aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name='password' onChange={onChange} value={credentials.password} />
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Login

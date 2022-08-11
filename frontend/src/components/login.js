import React, { useState } from "react";
import userDataService from "../services/user.js"

const Login = props => {

  const initialUserState = {
    id: "",
    name: "",
    email: "",
    pass: ""
  };

  const [user, setUser] = useState(initialUserState);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const login = () => {
    userDataService.login(user)
    .then(response => {
      alert(response.data.message)
      props.login(response.data.business)
      props.history.push('/dashboard')
      
      // console.log(response.data)
      // setUser(response.data.Business)
      // props.login(response.data.Business)
      // props.history.push('/dashboard');
    })
    .catch(e => {
      console.log(e)
    })
    
  }

  return (
    <div className="submit-form">
      <div>
        <div className="form-group">
          <label htmlFor="user">email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            required
            value={user.email}
            onChange={handleInputChange}
            name="email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="pass"
            required
            value={user.pass}
            onChange={handleInputChange}
            name="pass"
          />
        </div>

        <button onClick={login} className="btn btn-success">
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
import axios from 'axios';
import React from 'react';

function LoginForm({ loginFormData, setLoginFormData, isRegistered, setIsRegistered, user, setUser, token, setToken }) {
    
    const handleLogin = async (e) => {
        e.preventDefault();

        console.log('Logging in user...');
        const response = await axios.post('http://localhost:3001/api/login', loginFormData);

        if (response.status === 200) {
            console.log('User logged in successfully...');
            console.log(response.data);

            setUser(response.data);
            setToken(response.data.token);

            window.localStorage.setItem('user', JSON.stringify(response.data));
            window.localStorage.setItem('token', response.data.token);
        } else {
            console.log('Error logging in...');
        }
    }

  return (
      <div>
          <form onSubmit={handleLogin}>
              <div>
                  <input 
                      type='email'
                      placeholder='Email...'
                      value={loginFormData.username}
                      onChange={(e) => setLoginFormData({ ...loginFormData, username: e.target.value })}
                      required
                  />
              </div>

              <div>
                  <input 
                      type='password'
                      placeholder='Password...'
                      value={loginFormData.password}
                      onChange={(e) => setLoginFormData({ ...loginFormData, password: e.target.value })}
                      required
                  />
              </div>

              <button type='submit'>Login</button>
          </form>
          <p>Not Registered? <button onClick={() => setIsRegistered(false)}>Register</button></p>
    </div>
  )
}

export default LoginForm;
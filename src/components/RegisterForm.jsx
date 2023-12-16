import React from 'react';
import axios from 'axios';

function RegisterForm({ registerFormData, setRegisterFormData, isRegistered, setIsRegistered }) {

    const handleRegister = async (event) => {
    event.preventDefault();
    
    const newUser = {
      username: registerFormData.username,
      name: registerFormData.name,
      password: registerFormData.password,
    };

    console.log('Registering user...');
    let response;
    let data;
    try {
      response = await axios.post('http://localhost:3001/api/users', newUser);
      data = response.data;
        console.log('User registered successfully');
        setIsRegistered(true);
    } catch (error) {
      // check if the error code is 409
      if (error.response.status === 409) {
          console.log('Username already exists');
          setIsRegistered(true);
      } else if (error.response.status === 404) {
        console.log('Registering user failed');
      }
    }
  };

  return (
    <div>
        <form onSubmit={handleRegister}>
          <div>
            <input 
              type='email'
              placeholder='Email...'
              value={registerFormData.username}
              onChange={(event) => {
                setRegisterFormData({
                  ...registerFormData,
                  username: event.target.value,
                })
              }}
            />
          </div>

          <div>
            <input 
              type='text'
              placeholder='Name...'
              value={registerFormData.name}
              onChange={(event) => {
                setRegisterFormData({
                  ...registerFormData,
                  name: event.target.value,
                })
              }}
            />
          </div>

          <div>
            <input 
              type='password'
              placeholder='Password...'
              value={registerFormData.password}
              onChange={(event) => {
                setRegisterFormData({
                  ...registerFormData,
                  password: event.target.value,
                })
              }}
            />
          </div>

          <button type='submit'>Register</button>
          </form>
          
          <p>Already Registered? <button onClick={() => setIsRegistered(true)}>Login</button></p>
      </div>
  )
}

export default RegisterForm;
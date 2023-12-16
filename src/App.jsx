import React, { useEffect } from 'react';
import { useState } from 'react';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';

function App() {

  const [registerFormData, setRegisterFormData] = useState({
    username: '',
    name: '',
    password: '',
  });

  const [loginFormData, setLoginFormData] = useState({
    username: '',
    password: ''
  });

  const [isRegistered, setIsRegistered] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const user = window.localStorage.getItem('user');
    const token = window.localStorage.getItem('token');

    if (user && token) {
      setUser(JSON.parse(user));
      setToken(token);
    }
  }, []);

  return (
    <div>
      <h1>Notes Application</h1>

      {
        user ? (
          <Dashboard 
            user={user}
            setUser={setUser}
            token={token}
            setToken={setToken}
            setIsRegistered={setIsRegistered}
          />
        ) : (
            isRegistered ? (
              <LoginForm 
                loginFormData={loginFormData}
                setLoginFormData={setLoginFormData}
                isRegistered={isRegistered}
                setIsRegistered={setIsRegistered}
                user={user}
                setUser={setUser}
                token={token}
                setToken={setToken}
              />
            ) : (
              <RegisterForm 
                registerFormData={registerFormData}
                  setRegisterFormData={setRegisterFormData}
                  isRegistered={isRegistered}
                  setIsRegistered={setIsRegistered}
              />   
            )
        )
      }
    </div>
  )
}

export default App;
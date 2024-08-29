import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { serverURL } from '../util/server';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  
  

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(serverURL + 'login', { 'email': email, 'password': password });

      const data = response.data;

      if (data.code === 200) {
        localStorage.setItem('user', JSON.stringify({ data }));
        localStorage.setItem('token',  data.user.access_token);
        navigate('/');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-white to-purple-100">
      <div className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-3xl font-bold text-center mb-4">Welcome</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="text"
              className="border-2 border-gray-300 p-2 rounded w-full"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="border-2 border-gray-300 p-2 rounded w-full"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* <a href="#" className="text-sm text-blue-500 float-right mt-1">Forgot Password?</a> */}
          </div>
          <div className="mb-4 flex items-center">
            <input type="checkbox" className="mr-2" />
            <label className="text-gray-700">Remember Me</label>
          </div>
          <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded w-full">Log in</button>
        </form>
        <div className="text-center mt-4">
          <a href="/register" className="text-blue-500">Register With Us</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
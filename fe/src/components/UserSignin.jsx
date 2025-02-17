import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Use Link and useNavigate
import { notification } from 'antd'; // Import notification from Ant Design

function UserSignin() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Notification function
  const openNotification = (type, message, description) => {
    notification[type]({
      message: message,
      description: description,
      placement: 'bottomRight',
      duration: 5, // Notification will auto-close after 5 seconds
      className: 'custom-alert', // Apply custom styling if needed
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    try {
      const response = await axios.post('/api/user/signin', formData);
      console.log(response.data);
      localStorage.setItem('token', response.data.token);

      openNotification('success', 'Sign-in successful');
      
      // Redirect to the courses page after successful sign-in
      navigate('/purchased-courses');
    } catch (error) {
      console.error('Signin error:', error.response?.data || error);
      openNotification('error', 'Sign-in failed: ' + (error.response?.data?.message || 'Please try again.')); // Show detailed error message
    }
  };

  return (
    <div className='w-full min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8 border border-cyan-400 p-8 rounded-md'>
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-blue-400">
            User Signin
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-gray-100 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm bg-gray-800 my-6"
                placeholder="Email address"
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-gray-100 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm bg-gray-800"
                placeholder="Password"
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit" 
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
            >
              Sign In
            </button>
            <Link to="/user/signup" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out mt-4">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserSignin;

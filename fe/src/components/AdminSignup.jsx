import React, { useState } from 'react';
import axios from 'axios';
import { User, Mail, Lock, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom'; // Import Link and useHistory
import { notification } from 'antd'; // Import notification from Ant Design
import { useNavigate } from 'react-router-dom'; 

function AdminSignup() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });


  //alert 
  const navigate = useNavigate();
  const openNotification = (type, message, description) => {
    notification[type]({
        message: message,
        description: description,
        placement: 'bottomRight',
        duration: 5, // Notification will auto-close after 5 seconds
        className: 'custom-alert', // Apply custom styling if needed
    });
};


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/admin/signup', formData);
      console.log(response.data); openNotification('success', 'Signed in successfully');
     
      // Handle successful signup (e.g., redirect to admin signin page)
      navigate('/admin/signin')
    } catch (error) {
      console.error('Admin signup error:', error.response.data);
      openNotification('error', 'Admin signup failed');
      
    }
  };

  return (
    <div className='w-full min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8 border border-cyan-400 p-8 rounded-md'>
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-blue-400">
            Admin Signup
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="appearance-none  relative block w-full px-3 py-2 pl-10 border border-gray-700 placeholder-gray-500 text-gray-100 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm bg-gray-800 my-6"
                  placeholder="Email address"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 pl-10 border border-gray-700 placeholder-gray-500 text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm bg-gray-800 my-6"
                  placeholder="Password"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label htmlFor="firstName" className="sr-only">First Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 pl-10 border border-gray-700 placeholder-gray-500 text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm bg-gray-800 my-6"
                  placeholder="First Name"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label htmlFor="lastName" className="sr-only">Last Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  className="appearance-none  relative block w-full px-3 py-2 pl-10 border border-gray-700 placeholder-gray-500 text-gray-100 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm bg-gray-800"
                  placeholder="Last Name"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <UserPlus className="h-5 w-5 text-blue-500 group-hover:text-blue-400" />
              </span>
              Admin Sign Up
            </button>
            <Link to="/admin/signin" className="text-blue-400 hover:underline transition duration-300">
            <button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 my-6 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out">Sign In</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminSignup;
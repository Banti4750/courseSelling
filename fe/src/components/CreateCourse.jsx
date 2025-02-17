import React, { useState } from 'react';
import axios from 'axios';
import { BookOpen, DollarSign, Image, FileText, PlusCircle } from 'lucide-react';
import { notification } from 'antd'; // Import notification from Ant Design
import {  ArrowLeft } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom'; 

function CreateCourse() {
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    price: '',
    imageUrl: '',
  });
 
  const navigate = useNavigate();
  const handleChange = (e) => {
    setCourseData({ ...courseData, [e.target.name]: e.target.value });
  };

  function handlebacktoadmincourse(){
    navigate('/admin/dashboard'); // Use navigate instead of history.push
  }

  //alert 
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
    e.preventDefault();
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.post('/api/admin/course', courseData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Course created:', response.data);
     
      openNotification('success', 'Course Added Successfully'); // Corrected 'sucess' to 'success'
      // Clear form after successful submission
      setCourseData({ title: '', description: '', price: '', imageUrl: '' });
    } catch (error) {
      console.error('Error creating course:', error);
      openNotification('error', 'Failed to add course. Please try again.'); // Corrected 'sucess' to 'success'
     
    }
  };

  return (
    <div className='w-full min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8 border border-cyan-400 p-8 rounded-md'>
      <div className="flex justify-between items-center">
                    <button
                        onClick={handlebacktoadmincourse}
                        className="text-blue-400 hover:text-blue-500 flex items-center"
                    >
                        <ArrowLeft className="mr-2" size={18} />
                        Back to Courses
                    </button>
                    <h2 className="text-center text-3xl font-extrabold text-blue-400">
                        Create Course
                    </h2>
                </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="title" className="sr-only">Course Title</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <BookOpen className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="title"
                  name="title"
                  type="text"
                  required
                  className="appearance-none  relative block w-full px-3 py-2 pl-10 border border-gray-700 placeholder-gray-500 text-gray-100 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm bg-gray-800 my-6"
                  placeholder="Course Title"
                  value={courseData.title}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label htmlFor="description" className="sr-only">Course Description</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 pt-2 pointer-events-none">
                  <FileText className="h-5 w-5 text-gray-400" />
                </div>
                <textarea
                  id="description"
                  name="description"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 pl-10 border border-gray-700 placeholder-gray-500 text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm bg-gray-800 h-32 my-6"
                  placeholder="Course Description"
                  value={courseData.description}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label htmlFor="price" className="sr-only">Price</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="price"
                  name="price"
                  type="number"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 pl-10 border border-gray-700 placeholder-gray-500 text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm bg-gray-800 my-6"
                  placeholder="Price"
                  value={courseData.price}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label htmlFor="imageUrl" className="sr-only">Image URL</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Image className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="imageUrl"
                  name="imageUrl"
                  type="text"
                  required
                  className="appearance-none  relative block w-full px-3 py-2 pl-10 border border-gray-700 placeholder-gray-500 text-gray-100 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm bg-gray-800 my-6"
                  placeholder="Image URL"
                  value={courseData.imageUrl}
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
                <PlusCircle className="h-5 w-5 text-blue-500 group-hover:text-blue-400" />
              </span>
              Create Course
            </button>
          </div>
        </form>
      </div>
    </div>



  );
}

export default CreateCourse;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { notification } from 'antd'; // Import notification from Ant Design
import { useNavigate } from 'react-router-dom';


function PurchasedCourses() {
  const [purchasedCourses, setPurchasedCourses] = useState([]);

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

  useEffect(() => {
    const fetchPurchasedCourses = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/user/purchases', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPurchasedCourses(response.data.coursesData);
        // openNotification('success', 'Courses added'); // Corrected 'sucess' to 'success'
      } catch (error) {
        console.error('Error fetching purchased courses:', error);
      }
    };

    fetchPurchasedCourses();
  }, []);

  function handelplayVideo(courseId) {
    navigate(`/user/video/${courseId}`);
  }

  return (
    <div className='w-full min-h-screen bg-gray-900 flex items-center justify-center p-20'>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {purchasedCourses.map(course => (
          <div key={course._id} className="bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col h-full transform hover:scale-105 transition duration-300 ease-in-out">
            <img src={course.imageUrl} alt={course.title} className="w-full h-48 object-cover" />
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-lg font-semibold mb-2 text-blue-400 line-clamp-2">{course.title}</h3>
              <p className="text-gray-300 mb-4 flex-grow line-clamp-3">{course.description}</p>
              <div className="flex justify-between items-center mt-auto">
                <span className="text-2xl font-bold text-blue-600">${course.price}</span>
                <button
                  // onClick={() => handlePurchase(course._id)}
                  onClick={() => handelplayVideo(course._id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                 View
                 {/* onClick={handelplayVideo()} */}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PurchasedCourses;

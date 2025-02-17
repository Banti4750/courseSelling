import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { notification, Spin } from 'antd'; // Import notification and Spin from Ant Design

function CourseList() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('/api/course/preview');
        setCourses(response.data.courses);
      } catch (error) {
        console.error('Error fetching courses:', error);
        openNotification('error', 'Error', 'Failed to fetch courses. Please try again later.');
      } finally {
        setLoading(false); // Set loading to false once the request is completed
      }
    };

    fetchCourses();
  }, []);

  // Alert 
  const openNotification = (type, message, description) => {
    notification[type]({
      message: message,
      description: description,
      placement: 'bottomRight',
      duration: 5, // Notification will auto-close after 5 seconds
      className: 'custom-alert', // Apply custom styling if needed
    });
  };

  const handlePurchase = async (courseId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/course/purchase', { courseId }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      openNotification('success', 'Success', 'Course purchased successfully!');
    } catch (error) {
      console.error('Purchase error:', error);
      openNotification('error', 'Purchase Failed', 'Could not complete the purchase. Please try again.');
    }
  };

  return (
    <section className="py-4 bg-gray-900">
      <div className="container mx-auto px-6">
        {loading ? ( // Show loading spinner while fetching courses
          <div className="flex justify-center py-10">
            <Spin size="large" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {courses.length > 0 ? ( // Check if there are courses to display
              courses.map(course => (
                <div key={course._id} className="bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col h-full transform hover:scale-105 transition duration-300 ease-in-out">
                  <img src={course.imageUrl} alt={course.title} className="w-full h-48 object-cover" />
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-lg font-semibold mb-2 text-blue-400 line-clamp-2">{course.title}</h3>
                    <p className="text-gray-300 mb-4 flex-grow line-clamp-3">{course.description}</p>
                    <div className="flex justify-between items-center mt-auto">
                      <span className="text-2xl font-bold text-blue-600">${course.price}</span>
                      <button
                        onClick={() => handlePurchase(course._id)}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                      >
                        Enroll Now
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-white text-lg">No courses available.</p> // Message if no courses are found
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default CourseList;

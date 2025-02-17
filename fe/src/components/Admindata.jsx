import React, { useState, useEffect } from 'react';
import { LogOut, BookOpen, DollarSign, Image, FileText, PlusCircle } from 'lucide-react';

const Admindata = () => {
  const [admincourses, setAdminCourses] = useState([]);
  const [courseUpdate, setCourseUpdate] = useState({
    _id: '',
    title: '',
    description: '',
    price: '',
    imageUrl: '',
  });

  const handleChange = (e) => {
    setCourseUpdate({ ...courseUpdate, [e.target.name]: e.target.value });
  };

  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/course/bulk', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setAdminCourses(data.courses || []);
    } catch (error) {
      console.error('Error fetching courses:', error);
      if (error.response && error.response.status === 401) {
        handleLogout();
      }
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/admin/signin';
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    try {
      const response = await fetch(`/api/admin/course/${courseUpdate._id}`, {
        method: 'PUT',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(courseUpdate)
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data);
      fetchCourses();
      // Reset form after successful update
      setCourseUpdate({
        _id: '',
        title: '',
        description: '',
        price: '',
        imageUrl: '',
      });
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

  const handleEditClick = (course) => {
    setCourseUpdate(course);
  };

  return (
    <>
      {/* Navbar section */}
      <div className="bg-black p-2 bg-gray-900">
        <nav className='flex justify-around items-center'>
          <a href="/create-course" className="p-2 rounded-md bg-black list-none text-black border border-cyan-300 mt-16 text-gray-300 hover:text-yellow-100  transition duration-300">
            Create Course
          </a>
          <button
            onClick={handleLogout}
            className="border border-cyan-300 text-white bg-black from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 flex items-center mt-16 transition duration-300"
          >
            <LogOut className="mr-2" size={18} />
            Logout
          </button>
        </nav>
      </div>

      {/* Display all courses */}
      <section className="py-4 bg-gray-900 h-full">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {admincourses.map(course => (
              <div key={course._id} className="bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col h-full transform hover:scale-105 transition duration-300 ease-in-out">
                <img src={course.imageUrl} alt={course.title} className="w-full h-48 object-cover" />
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-lg font-semibold mb-2 text-blue-400 line-clamp-2">{course.title}</h3>
                  <p className="text-gray-300 mb-4 flex-grow line-clamp-3">{course.description}</p>
                  <div className="flex justify-between items-center mt-auto">
                    <span className="text-2xl font-bold text-blue-600">${course.price}</span>
                    <a 
                      href={`/admin/courses/edit/${course._id}`}
                      onClick={(e) => {
                        // e.preventDefault();
                        // handleEditClick(course);
                      }} 
                      className="p-2 rounded-md bg-black  text-black border border-cyan-300 text-gray-300 hover:text-yellow-100  transition duration-300"
                    >
                      Edit Course
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
    </>
  );
};

export default Admindata;
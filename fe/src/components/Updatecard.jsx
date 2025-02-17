import React, { useState, useEffect } from 'react';
import { BookOpen, DollarSign, Image, FileText, PlusCircle, ArrowLeft } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom'; // Use `useNavigate` instead of `useHistory`

const Updatecard = () => {
    const [courseUpdate, setCourseUpdate] = useState({
        _id: '',
        title: '',
        description: '',
        price: '',
        imageUrl: '',
    });

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const { courseId } = useParams(); // UseParams to get course ID
    const navigate = useNavigate(); // Replacing useHistory with useNavigate

    useEffect(() => {
        const fetchCourses = async () => {
            setIsLoading(true);
            setError(null);
            try {
                console.log(`Fetching course with ID: ${courseId}`);
                const token = localStorage.getItem('adminToken');
                const response = await fetch(`/api/admin/course/one/${courseId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                console.log(`Response status: ${response.status}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log('Fetched course data:', data);
                setCourseUpdate(data.course); // Ensure this updates the state correctly
            } catch (err) {
                console.error('Error fetching course:', err);
                setError(`Failed to fetch course data. ${err.message}`);
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchCourses();
    }, []);
    
    const handleChange = (e) => {
        setCourseUpdate({ ...courseUpdate, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        console.log('Updating course with ID:', courseUpdate._id); // Add this line
        const token = localStorage.getItem('adminToken');
        try {
            const response = await fetch(`/api/admin/course/${courseUpdate._id}`, {
                method: 'PUT',
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(courseUpdate)
                // navigate('/admin/courses'); 
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data);
            // Fetch courses again after successful update if needed
        } catch (error) {
            console.error('Error updating course:', error);
        }
    };
    

    const handleBackClick = () => {
        navigate('/admin/dashboard'); // Use navigate instead of history.push
    };

    if (isLoading) return <div className="text-white text-center">Loading...</div>;
    if (error) return <div className="text-red-500 text-center">{error}</div>;

    return (
        <div className='w-full min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
            <div className='max-w-md w-full space-y-8 border border-cyan-400 p-8 rounded-md'>
                <div className="flex justify-between items-center">
                    <button
                        onClick={handleBackClick}
                        className="text-blue-400 hover:text-blue-500 flex items-center"
                    >
                        <ArrowLeft className="mr-2" size={18} />
                        Back to Courses
                    </button>
                    <h2 className="text-center text-3xl font-extrabold text-blue-400">
                        Update Course
                    </h2>
                </div>
               
                <form className="mt-8 space-y-6" onSubmit={handleUpdate}>
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
                                    className="appearance-none relative block w-full px-3 py-2 pl-10 border border-gray-700 placeholder-gray-500 text-gray-100 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm bg-gray-800 my-6"
                                    placeholder="Course Title"
                                    value={courseUpdate.title || ''}
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
                                    value={courseUpdate.description}
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
                                    value={courseUpdate.price || ''}
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
                                    className="appearance-none relative block w-full px-3 py-2 pl-10 border border-gray-700 placeholder-gray-500 text-gray-100 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm bg-gray-800 my-6"
                                    placeholder="Image URL"
                                    value={courseUpdate.imageUrl  || ''}
                                    onChange={handleChange}
                                    
                                />
                            </div>
                        </div>
                    </div>

                    
                    <div>
                        <button
                            type="submit" 
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                            disabled={isLoading}
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <PlusCircle className="h-5 w-5 text-blue-500 group-hover:text-blue-400" />
                            </span>
                            {isLoading ? 'Updating...' : 'Update Course'}
                            
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Updatecard;

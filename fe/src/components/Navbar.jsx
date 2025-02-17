import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-gray-900 shadow-lg fixed w-full top-0 left-0 z-50">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center ">
                <div className="text-2xl font-bold text-blue-400">LearnHub</div>

                <ul className="flex space-x-8">
                    <li>
                        <Link to="/" className="text-gray-300 hover:text-blue-400 hover:underline transition duration-300">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/user/signup" className="text-gray-300 hover:text-blue-400 hover:underline transition duration-300">
                            User 
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/signup" className="text-gray-300 hover:text-blue-400 hover:underline transition duration-300">
                            Admin 
                        </Link>
                    </li>
                    {/* <li>
                        <Link to="/create-course" className="text-gray-300 hover:text-blue-400 hover:underline transition duration-300">
                            Create Course
                        </Link>
                    </li> */}
                    <li>
                        <Link to="/purchased-courses" className="text-gray-300 hover:text-blue-400 hover:underline transition duration-300">
                            My Courses
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;

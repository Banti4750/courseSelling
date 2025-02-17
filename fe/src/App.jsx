import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import UserSignup from './components/UserSignup';
import UserSignin from './components/UserSignin';
import AdminSignup from './components/AdminSignup';
import AdminSignin from './components/AdminSignin';
import CourseList from './components/CourseList';
import CreateCourse from './components/CreateCourse';
import PurchasedCourses from './components/PurchasedCourses';
import HomePage from './components/Home';
import Navbar from './components/Navbar';
import Admindata from './components/Admindata';
import Updatecard from './components/Updatecard';
import Videorender from './components/Videorender';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        
        <main>
          <Routes>
            {/* Home Route */}
            <Route path="/" element={<HomePage />} />

            {/* User Routes */}
            <Route path="/user/signup" element={<UserSignup />} />
            <Route path="/user/signin" element={<UserSignin />} />
            <Route path="/courses" element={<CourseList />} />
            <Route path="/purchased-courses" element={<PurchasedCourses />} />

            {/* Admin Routes */}
            <Route path="/admin/signup" element={<AdminSignup />} />
            <Route path="/admin/signin" element={<AdminSignin />} />
            <Route path="/admin/dashboard" element={<Admindata />} />
            {/* <Route path="/admin/courses" element={<Admindata />} /> */}
            <Route path="/create-course" element={<CreateCourse />} />
            <Route path="/admin/courses/edit/:courseId" element={<Updatecard />} />


            {/* Redirect any unknown routes to home */}
            <Route path="*" element={<Navigate to="/" />} />


            {/* route of video render */}
            <Route path="/user/video/:courseId" element={<Videorender/>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

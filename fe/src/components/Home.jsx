import React, { useState, useRef } from 'react';
import { Book, Clock, Users, ChevronRight } from 'lucide-react';
import CourseList from './CourseList';

const CourseBenefits = ({ icon: Icon, title, description }) => (
  <div className="flex items-start space-x-4 p-6 bg-gray-800 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out border border-gray-700">
    <Icon className="w-8 h-8 text-blue-400" />
    <div>
      <h3 className="font-semibold text-xl mb-2 text-white">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  </div>
);

const HomePage = () => {
  const [showCourses, setShowCourses] = useState(false);
  const coursesRef = useRef(null);

  const handleExplore = () => {
    setShowCourses(true);
    setTimeout(() => {
      coursesRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-900 to-purple-900 text-white py-24">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-5xl font-bold mb-6 animate-fade-in-up">Unlock Your Potential with Online Courses</h1>
            <p className="text-xl mb-10 animate-fade-in-up delay-150">Learn from industry experts and advance your career with our wide range of courses.</p>
            <button
              onClick={handleExplore}
              className="bg-blue-500 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-blue-600 transition duration-300 animate-fade-in-up delay-300 flex items-center mx-auto"
            >
              Explore Courses
              <ChevronRight className="ml-2" />
            </button>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 bg-gray-800">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-semibold text-center mb-12 animate-fade-in text-blue-400">Why Choose LearnHub</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <CourseBenefits
                icon={Book}
                title="Expert-led Courses"
                description="Learn from industry professionals with years of experience in their fields."
              />
              <CourseBenefits
                icon={Clock}
                title="Flexible Learning"
                description="Study at your own pace, anytime and anywhere that suits your schedule."
              />
              <CourseBenefits
                icon={Users}
                title="Community Support"
                description="Join a vibrant community of learners and get support when you need it most."
              />
            </div>
          </div>
        </section>

        {/* Course Section */}
        <section ref={coursesRef} className="py-20 bg-gray-900">
          <div className="container mx-auto  ">
            <h2 className="text-3xl font-semibold text-center mb-12 animate-fade-in text-blue-400">Featured Courses</h2>
            <CourseList />
          </div>
        </section>
      </main>

      {/* Footer Section */}
      <footer className="bg-gray-950 text-gray-300 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0">
              <h3 className="text-2xl font-semibold text-blue-400">LearnHub</h3>
              <p className="text-gray-400 mt-2">Empowering learners worldwide</p>
            </div>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
              <a href="#" className="hover:text-blue-400 transition duration-300">Terms of Service</a>
              <a href="#" className="hover:text-blue-400 transition duration-300">Privacy Policy</a>
              <a href="#" className="hover:text-blue-400 transition duration-300">Contact Us</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-500">
            &copy; {new Date().getFullYear()} LearnHub. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
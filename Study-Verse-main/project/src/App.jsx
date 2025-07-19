import React, { useContext } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import About from './components/About';
import PopularCourses from './components/PopularCourses';
import AddToCart from './Pages/AddToCart';
import Payment from './Pages/Paymentpage';
import TeacherDashboard from './Pages/TeacherDashboard';
import Course from './Pages/Course';
import TeacherCourses from './Pages/TeacherCourses';
import ScheduleClassForm from './Pages/ScheduleClassForm';
import JoinLiveClass from './Pages/JoinLiveClasses';
import AdminPanel from './Pages/AdminPanel';
import QuizPage from './Pages/QuizPage';

import { CourseProvider } from './Context/CourseContext';
import { AuthContext } from './Context/AuthContext';


function App() {
  const { user } = useContext(AuthContext);
  const isAdmin = user?.role === 'admin';

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <><ScrollToTop /> <Navbar /> <Home /> <Footer /></>
      )
    },
    {
      path: '/login',
      element: (
        <><ScrollToTop /> <Login /></>
      )
    },
    {
      path: '/signup',
      element: (
        <><ScrollToTop /> <Signup /></>
      )
    },
    {
      path: '/about',
      element: (
        <><ScrollToTop /> <Navbar /> <About /> <Footer /></>
      )
    },
    {
      path: '/course',
      element: (
        <><ScrollToTop /> <Navbar /> <PopularCourses /></>
      )
    },
    {
      path: '/course/:id',
      element: (
        <><ScrollToTop /> <Navbar /> <Course /></>
      )
    },
    {
      path: '/addtocart',
      element: (
        <><ScrollToTop /> <Navbar /> <AddToCart /></>
      )
    },
    {
      path: '/payment',
      element: (
        <><ScrollToTop /> <ProtectedRoute><Payment /></ProtectedRoute></>
      )
    },
    {
      path: '/teacher',
      element: (
        <><ScrollToTop /> <Navbar /> <ProtectedRoute><TeacherDashboard /></ProtectedRoute></>
      )
    },
    {
      path: '/liveclass',
      element: (
        <><ScrollToTop /><ScheduleClassForm /></>
      )
    },
    {
      path: '/join-live-classes',
      element: (
        <><ScrollToTop /> <Navbar /> <JoinLiveClass /></>
      )
    },
    {
      path: '/mycourses',
      element: (
        <><ScrollToTop /> <Navbar /> <TeacherCourses /> </>
      )
    },
      {
      path: '/quiz',
      element: (
        <><ScrollToTop /> <Navbar /> <QuizPage /> </>
      )
    },
    {
      path: '/admin',
      element: (
        isAdmin
          ? <><ScrollToTop /><Navbar /><AdminPanel /></>
          : <Navigate to="/" replace />
      )
    },

  ]);

  return (
    <CourseProvider>
      <RouterProvider router={router} />
    </CourseProvider>
  );
}

export default App;

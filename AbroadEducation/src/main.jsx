import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Corrected import
import './index.css';
import App from './App.jsx';
import Blog from './pages/Blog/Blog';
import About from './pages/About/About';
// import Services from './pages/Services/Services';
import ContactUs from './pages/ContactUs/ContactUs';
import Home from './pages/Home/Home'; // Create this file
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Error404 from './pages/Error404/Error404';
import Login from './Auth/Login';
import SignUp from './Auth/SignUp';
import Logout from './Auth/Logout';
import AdminLogin from './Auth/AdminLogin';
import Admin from './pages/Admin/Admin';
import BlogId from './pages/Blog_Id/BlogId';
import Title from './components/Title/Title';
import AuthHandler from './components/AuthHandler/AuthHandler';

const rootElement = document.getElementById('root'); // Define root
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <BrowserRouter>
    <Title />
    <AuthHandler />

      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />  {/* Home page */}
          <Route path="blog" element={
            <PrivateRoute>
              <Blog />
            </PrivateRoute>
          } />
           <Route path="adminpost" element={
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
          } />
          <Route path="about" element={<About />} />
          
          {/* <Route path="services" element={
            <PrivateRoute>
              <Services />
            </PrivateRoute>
          } /> */}
          <Route path="contact" element={<ContactUs />} />
          <Route path="Conditions" element={<Error404 />} />
          <Route path="login" element={<Login />} />
          <Route path="logout" element={<Logout />} />
          <Route path="register" element={<SignUp />} />
          <Route path="adminlogin" element={<AdminLogin />} />
          <Route path="blog/:id" element={<BlogId />} />
        </Route>
      </Routes>
    </BrowserRouter>


  </StrictMode>
);

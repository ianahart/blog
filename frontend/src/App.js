import { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Posts from './pages/Posts';
import Categories from './pages/Categories';
import About from './pages/About';
import Login from './pages/Admin/Login';
import ForgotPassword from './pages/Admin/ForgotPassword';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import NotFound from './pages/NotFound';
import NavContextProvider from './contexts/NavContext';
import AuthContextProvider from './contexts/AuthContext.js';
import './App.css';

const App = () => {

  return (
    <Router>
      <div className="site">
      <Fragment>
        <NavContextProvider>
          <Navbar />
        </NavContextProvider>
      </Fragment>
      <AuthContextProvider>
        <div className="site-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/about" element={<About />} />

                <Route path="/admin/login" element={<Login />} />
                <Route path="/admin/forgot-password" element={<ForgotPassword />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </AuthContextProvider>
      <Fragment>
        <Footer />
      </Fragment>
      </div>
    </Router>
  );
}

export default App


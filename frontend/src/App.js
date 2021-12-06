import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Posts from './pages/Posts';
import Categories from './pages/Categories';
import About from './pages/About';
import Login from './pages/Admin/Login';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import NavContextProvider from './contexts/NavContext';
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
      <div className="site-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin/login" element={<Login />} />
        </Routes>
      </div>
      <Fragment>
        <Footer />
      </Fragment>
      </div>
    </Router>
  );
}

export default App


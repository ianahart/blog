import { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';
import RefreshCatcher from './components/Mixed/RefreshCatcher';
import Home from './pages/Home';
import Posts from './pages/Posts';
import Categories from './pages/Categories';
import About from './pages/About';
import Login from './pages/Admin/Login';
import ForgotPassword from './pages/Admin/ForgotPassword';
import Dashboard from './pages/Admin/Dashboard';
import NotFound from './pages/NotFound';
import CookiePolicy from './pages/CookiePolicy.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';
import AdminPost from './pages/Admin/AdminPost';
import Post from './pages/Post';
import Footer from './components/Footer';
import NavContextProvider from './contexts/NavContext';
import RequireAuth from './components/Admin/RequireAuth';
import CookieBanner from './components/Mixed/CookieBanner.jsx';
import './App.css';
import WithAxios from './misc/WithAxios';
import { useState } from 'react';
const App = () => {
  const [cookieBannerShowing, setCookieBannerShowing] = useState(true);
  const closeCookieBanner = () => setCookieBannerShowing(false);

  return (
    <Router>
      <WithAxios>
        <div className="site">
          <Fragment>
            <NavContextProvider>
              <RefreshCatcher />
              <Navbar />
            </NavContextProvider>
          </Fragment>
          <div className="site-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/posts" element={<Posts />} />
              <Route path="/cookie-policy" element={<CookiePolicy />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/about" element={<About />} />
              <Route path="/admin/login" element={<Login />} />
              <Route path="/posts/:slug" element={<Post />} />
              <Route path="/admin/forgot-password" element={<ForgotPassword />} />
              <Route
                path="/admin/:userId/dashboard"
                element={
                  <RequireAuth>
                    <Dashboard />
                  </RequireAuth>
                }
              />
              <Route
                path="/admin/:userId/your-posts"
                element={
                  <RequireAuth>
                    <Dashboard />
                  </RequireAuth>
                }
              />
              <Route
                path="/admin/:userId/editor"
                element={
                  <RequireAuth>
                    <Dashboard />
                  </RequireAuth>
                }
              />
              <Route
                path="/admin/:userId/messages"
                element={
                  <RequireAuth>
                    <Dashboard />
                  </RequireAuth>
                }
              />
              <Route
                path="/admin/:userId/settings"
                element={
                  <RequireAuth>
                    <Dashboard />
                  </RequireAuth>
                }
              />
              <Route
                path="/admin/:userId/posts/:slug"
                element={
                  <RequireAuth>
                    <AdminPost />
                  </RequireAuth>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>

          {cookieBannerShowing && (
            <CookieBanner
              closeCookieBanner={closeCookieBanner}
              cookieBannerShowing={cookieBannerShowing}
            />
          )}
          <Fragment>
            <Footer />
          </Fragment>
        </div>
      </WithAxios>
    </Router>
  );
};

export default App;

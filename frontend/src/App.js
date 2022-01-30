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
import AdminPost from './pages/Admin/AdminPost';
import Post from './pages/Post';
import Footer from './components/Footer';
import NavContextProvider from './contexts/NavContext';
import RequireAuth from './components/Admin/RequireAuth';
import './App.css';
import WithAxios from './misc/WithAxios';

const App = () => {
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
              <Route path="/categories" element={<Categories />} />
              <Route path="/about" element={<About />} />
              <Route path="/admin/login" element={<Login />} />
              <Route path="/posts/:slug" element={<Post />} />
              <Route
                path="/admin/forgot-password"
                element={<ForgotPassword />}
              />
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
                path="/admin/:userId/settings"
                element={
                  <RequireAuth>
                    <Dashboard />
                  </RequireAuth>
                }
              />
              <Route
                path="/admin/:userId/posts/:postId"
                element={
                  <RequireAuth>
                    <AdminPost />
                  </RequireAuth>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Fragment>
            <Footer />
          </Fragment>
        </div>
      </WithAxios>
    </Router>
  );
};

export default App;

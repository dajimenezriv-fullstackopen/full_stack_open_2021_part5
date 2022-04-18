import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import NewBlogForm from './components/NewBlogForm';
import Notification from './components/Notification';
import { getBlogs, setToken } from './services/blogs';

function App() {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const refreshBlogs = () => {
    getBlogs().then((json) => setBlogs(json));
  };

  useEffect(() => {
    refreshBlogs();
  }, []);

  useEffect(() => {
    let loggedUser = window.localStorage.getItem('loggedUser');
    if (loggedUser) {
      loggedUser = JSON.parse(loggedUser);
      setUser(loggedUser);
      setToken(loggedUser.token);
    }
  }, []);

  const handleLogout = async (event) => {
    event.preventDefault();

    window.localStorage.removeItem('loggedUser');
    setUser(null);
  };

  return (
    <div>
      <Notification message={message} error={error} />

      {
        (user)
          ? (
            <div>
              <h2>blogs</h2>

              <form onSubmit={handleLogout}>
                <p>
                  {user.username}
                  {' '}
                  logged in
                  <button type="submit">logout</button>
                </p>
              </form>

              <NewBlogForm setBlogs={setBlogs} setMessage={setMessage} setError={setError} />

              {
                blogs.map((blog) => <Blog key={blog.id} blog={blog} />)
              }
            </div>
          )
          : <LoginForm setUser={setUser} setMessage={setMessage} setError={setError} />
      }
    </div>
  );
}

export default App;

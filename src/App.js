import React, { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import NewBlogForm from './components/NewBlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import { getBlogs, setToken, createBlog } from './services/blogs';

function App() {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const newBlogRef = useRef();

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

  const addBlog = async (blogDict) => {
    try {
      const blog = await createBlog(blogDict);
      setBlogs((prev) => [...prev, blog]);
      setError(false);
      setMessage(`a new blog ${blog.title} by ${blog.author} added`);
      setTimeout(() => setMessage(null), 5000);
      // we can have toggle the visibility of the new blog form
      newBlogRef.current.toggleVisibility();
    } catch (err) {
      setError(true);
      setMessage(err.response.data.error);
      setTimeout(() => setMessage(null), 5000);
    }
  };

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

              <Togglable hideLabel="cancel" showLabel="new blog" ref={newBlogRef}>
                <NewBlogForm addBlog={addBlog} />
              </Togglable>

              {
                blogs
                  .sort((a, b) => b.likes - a.likes)
                  .map((blog) => <Blog key={blog.id} blog={blog} loggedUser={user} />)
              }
            </div>
          )
          : <LoginForm setUser={setUser} setMessage={setMessage} setError={setError} />
      }
    </div>
  );
}

export default App;

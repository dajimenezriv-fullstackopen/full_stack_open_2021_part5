import React, { useState } from 'react';
import { createBlog } from '../services/blogs';

export default function NewBlogForm({ setBlogs, setMessage, setError }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleNewBlog = async (event) => {
    event.preventDefault();

    try {
      const blog = await createBlog({ title, author, url });
      setBlogs((prev) => [...prev, blog]);
      setError(false);
      setMessage(`a new blog ${blog.title} by ${author} added`);
      setTimeout(() => setMessage(null), 5000);
    } catch (err) {
      setError(true);
      setMessage(err.response.data.error);
      setTimeout(() => setMessage(null), 5000);
    }
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleNewBlog}>
        <div>
          title:
          <input type="text" value={title} onChange={({ target }) => setTitle(target.value)} />
        </div>

        <div>
          author:
          <input type="text" value={author} onChange={({ target }) => setAuthor(target.value)} />
        </div>

        <div>
          url:
          <input type="text" value={url} onChange={({ target }) => setUrl(target.value)} />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
}

import React, { useState } from 'react';
import { deleteBlog, updateBlog } from '../services/blogs';
import './Blog.css';

function Blog({ blog, loggedUser }) {
  const [visible, setVisible] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  const updateLikes = async () => {
    const updatedBlog = await updateBlog({
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: likes + 1,
    });

    setLikes(updatedBlog.likes);
  };

  return (
    <div className="Blog">
      {
        (visible)
          ? (
            <div>
              <div>
                {blog.title}
                {' '}
                {blog.author}
                {' '}
                <button
                  id="hide_button"
                  type="button"
                  onClick={() => setVisible((prev) => !prev)}
                >
                  hide
                </button>
              </div>
              <div>{blog.url}</div>
              <div>
                <span>{`likes ${likes}`}</span>
                <button
                  id="like_button"
                  type="button"
                  onClick={updateLikes}
                >
                  like
                </button>
              </div>
              <div>{blog.user.username}</div>
              {
                (loggedUser && blog.user.username === loggedUser.username)
                  ? <button type="button" onClick={() => deleteBlog(blog.id)}>delete</button>
                  : null
              }
            </div>
          )
          : (
            <div>
              <span>{`${blog.title} ${blog.author}`}</span>
              <button
                id="view_button"
                type="button"
                onClick={() => setVisible((prev) => !prev)}
              >
                view
              </button>
            </div>
          )
      }
    </div>
  );
}

export default Blog;

import axios from 'axios';

const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getBlogs = async () => (await axios.get(baseUrl)).data;

const createBlog = async (newBlog) => (
  (await axios.post(baseUrl, newBlog, {
    headers: { Authorization: token },
  })).data
);

const updateBlog = async (blog) => (
  JSON.parse((await axios.put(`${baseUrl}/${blog.id}/`, blog, {
    headers: { Authorization: token },
  })).config.data)
);

const deleteBlog = async (id) => (
  axios.delete(`${baseUrl}/${id}/`, {
    headers: { Authorization: token },
  })
);

export {
  setToken,
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
};

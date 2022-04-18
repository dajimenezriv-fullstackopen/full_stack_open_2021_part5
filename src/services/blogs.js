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

export {
  setToken,
  getBlogs,
  createBlog,
};

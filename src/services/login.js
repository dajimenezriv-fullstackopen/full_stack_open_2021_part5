import axios from 'axios';
// we can do that because in package.json we have added a proxy port
const baseUrl = '/api/login';

const login = async (credentials) => (await axios.post(baseUrl, credentials)).data;

export default login;

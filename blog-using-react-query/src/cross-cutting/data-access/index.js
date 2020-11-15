import axios from 'axios';

const dataAccess = axios.create({
  baseURL: 'http://localhost:1337',
});

export default dataAccess;

import axios from 'axios';

var axiosInstance = axios.create({
  baseURL: 'https://cloud.squidex.io',
  /* other custom settings */
});

export { axiosInstance as http };

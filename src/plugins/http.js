import axios from "axios";

var axiosInstance = axios.create({
  baseURL: "https://cloud.squidex.io",
  headers: {
    "X-Flatten": true,
    "X-Resolve-Urls": "image"
  }
});

export { axiosInstance as http };

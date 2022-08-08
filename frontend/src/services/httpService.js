// Author: Aditya Mahale(ad619659@dal.ca)
//ref : https://github.com/adityadmahale/adopt/blob/master/src/services/httpService.js
import axios from "axios";
import { toast } from "react-toastify";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

// Interceptor for handling errors
axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    toast.error("Unexpected error occurred");
  }

  return Promise.reject(error);
});

// Set JWT in the header
function setJwt(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

export default {
  get: axios.get,
  put: axios.put,
  post: axios.post,
  delete: axios.delete,
  setJwt,
};

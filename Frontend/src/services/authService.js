import axios from 'axios';

const API_URL = 'http://localhost:8080/user/';

const register = (user) => {
  return axios.post(`${API_URL}save`,user);
};

const login = (user) => {
  return axios.post(API_URL + 'login',user);
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

const authService = {
  register,
  login,
  getCurrentUser
};

export default authService;

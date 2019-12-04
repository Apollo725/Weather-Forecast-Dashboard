import axios from 'axios';
import { BASE_URL } from '../utils/const/apiUrl';

// const token = localStorage.getItem('token');

export const loginApi = async authData => {
  const res = await axios.post(`${BASE_URL}/user/authenticate`, authData);
  return res;
};

export const forgotPasswordApi = async email => {
  const data = { email };
  console.log('email in authAPI', data);
  const res = await axios({
    method: 'post',
    url: `${BASE_URL}/user/forgot`,
    data,
  });
  return res;
};

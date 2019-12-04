import axios from 'axios';
import { BASE_URL } from '../utils/const/apiUrl';
// get userId and token from localStorage
const userId = localStorage.getItem('userId');

// make headerConfig with token in localstorage
const headerConfig = () => {
  const token = localStorage.getItem('token');
  // set http request header with token
  const headerConfig = { headers: { Authorization: token } };
  return headerConfig;
};

// function to get user profile from profile API  /user/:userId
export const getProfileApi = async () => {
  // console.log('userId and token', userId, token);
  const res = await axios.get(`${BASE_URL}/user/${userId}`, headerConfig());
  // console.log('profile api res', headerConfig);
  return res;
};

// function to update user profile from profile API  /user/update
export const updateProfileApi = async params => {
  const token = localStorage.getItem('token');
  const { firstName, lastName, email, address, city, country, postalCode } = params;
  const data = {
    first_name: firstName,
    last_name: lastName,
    email,
    address,
    city,
    country,
    post_code: postalCode,
  };
  console.log('update profile api', data, token);
  const res = await axios({
    method: 'post',
    url: `${BASE_URL}/user/update`,
    data,
    headers: { Authorization: token },
  });
  return res;
};

// function to get knowlege data from knowledgebase API  /knowledge/list
export const getKnowledgeApi = async () => {
  // console.log('header config', headerConfig);
  const res = await axios.get(`${BASE_URL}/knowledge/list`, headerConfig());

  return res;
};

// function to get structured datasets data from structured datasets API  /structured/list
export const getStructuredApi = async () => {
  const res = await axios.get(`${BASE_URL}/structured/list`, headerConfig());
  // console.log('header config', res);
  return res;
};

// function to get raw content data from structured datasets API  /structured/list
export const getRawApi = async () => {
  const res = await axios.get(`${BASE_URL}/raw/list`, headerConfig());
  // console.log('header config', res);
  return res;
};

// function to get group from group API  /group/list
export const getGroupApi = async () => {
  const res = await axios.get(`${BASE_URL}/group/list`, headerConfig());
  // console.log('header config', res);
  return res;
};

// function to get specific group from group API  /group/:jobGroupId
export const getSpecificGroupApi = async jobGroupId => {
  const res = await axios.get(`${BASE_URL}/group/${jobGroupId}`, headerConfig());
  // console.log('header config', res);
  return res;
};

// function to get dataset from group API  /structured/detail
export const getDatasetApi = async (jobId, cycleId, cutId) => {
  const token = localStorage.getItem('token');
  const data = { jobId, cycleId, cutId };
  const res = await axios({
    method: 'post',
    url: `${BASE_URL}/structured/detail`,
    data,
    headers: { Authorization: token },
  });
  // console.log('header config', res);
  return res;
};

export const getRegulationApi = async () => {
  const res = {
    data: {
      content: '<h1>Regulation Test Data123</h1>',
    },
  };
  return res;
};

// function to get cycle details from group API  /content/root
export const getCycleDetailsApi = async (jobGroupId, cycleId) => {
  const token = localStorage.getItem('token');
  const data = { jobGroupId, cycleId };
  // console.log('get cycle details Api token', token, data);
  // console.log('get cycle details Api jobId', jobId);
  // console.log('get cycle details Api jobGroupId', jobGroupId);
  // console.log('get cycle details Api cycleId', cycleId);
  const res = await axios({
    method: 'post',
    url: `${BASE_URL}/content/root`,
    data,
    headers: { Authorization: token },
  });
  // console.log('header config', res);
  return res;
};

// function to get detail of one cycle     (POST) /content/root
export const getSpecificCycleDetailApi = async (jobGroupId, cycleId, step) => {
  const token = localStorage.getItem('token');
  const data = { jobGroupId, cycleId, step };
  // console.log('get cycle details Api token', token);
  // console.log('get cycle details Api jobId', jobId);
  // console.log('get cycle details Api jobGroupId', jobGroupId);
  // console.log('get cycle details Api cycleId', cycleId);
  const res = await axios({
    method: 'post',
    url: `${BASE_URL}/content/root`,
    data,
    headers: { Authorization: token },
  });
  // console.log('header config', res);
  return res;
};

// function to get content of job   (POST)  /content/fetch
export const getContentApi = async params => {
  const token = localStorage.getItem('token');
  // params :{ cycleId, jobGroupId, jobId, taskId,level, step, set, }
  const { cycleId, jobGroupId, jobId, taskId, level, step, set } = params;
  const data = { cycleId, jobGroupId, jobId, taskId, level, step, set };
  const res = await axios({
    method: 'post',
    url: `${BASE_URL}/content/fetch`,
    data,
    headers: { Authorization: token },
  });
  // console.log('header config', res);
  return res;
};

// function to get cycles from group API  /cycle/list/:jobGroupId
export const getCyclesApi = async jobGroupId => {
  const res = await axios.get(`${BASE_URL}/cycle/list/${jobGroupId}`, headerConfig());
  // console.log('header config', res);
  return res;
};

// function to submit contact info with contact API   /contact/send
export const contactSubmitApi = async params => {
  const token = localStorage.getItem('token');
  // params :{ cycleId, jobGroupId, jobId, taskId,level, step, set, }
  const { email, subject, content } = params;
  const data = { email, subject, content };
  const res = await axios({
    method: 'post',
    url: `${BASE_URL}/contact/send`,
    data,
    headers: { Authorization: token },
  });
  // console.log('header config', res);
  return res;
};

export const getKnowledgeDetailsApi = async knowledgeId => {
  // console.log('header config', headerConfig);
  const res = await axios.get(`${BASE_URL}/knowledge/${knowledgeId}`, headerConfig());

  return res;
};

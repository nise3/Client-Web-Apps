import axios from 'axios';
import {API_BASE_URL} from '../common/apiRoutes';
import MockAdapter from 'axios-mock-adapter';

const axiosMockInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 300000,
});

// Response interceptor for API calls
axiosMockInstance.interceptors.response.use(
  (response) => {
    //console.log('axios interceptors response', response);
    return response;
  },
  async function (error) {
    // const originalRequest = error.config;
    // let responseStatus = error.response.status;

    return Promise.reject(error);
  },
);

// This sets the mock adapter on the default instance
const mock = new MockAdapter(axiosMockInstance);

mock.onGet('auth-user').reply(200, {
  data: {
    id: 1,
    name: 'John Smith',
    email: 'jhon@gmail.com',
    role: 'Super Admin',
    permissions: {
      VIEW_ANY_USER: true,
      VIEW_SINGLE_USER: true,
      CREATE_USER: true,
      UPDATE_USER: true,
      DELETE_USER: true,
    },
    access_token: 'kjjdlkfakfjjdlkfjkldsjfkljdsklfsd',
    refresh_token: 'kjklaskfdjkldsklfjsdkljfkldhghjdh',
  },
});

mock.onGet('institutes').reply(200, {
  data: [
    {
      address: 'asdfsd',
      code: '1212',
      config: null,
      created_at: '2021-08-10T07:16:19.000000Z',
      domain: 'http://1212.com',
      email: null,
      google_map_src: null,
      id: 1,
      logo: null,
      mobile_numbers: null,
      phone_numbers: null,
      primary_mobile: '01670338544',
      primary_phone: '01670338544',
      title_bn: 'asdfasdf',
      title_en: 'asdfasd',
      updated_at: '2021-08-10T07:16:19.000000Z',
    },
  ],
});

export default axiosMockInstance;

import MockAdapter from 'axios-mock-adapter';
import {AxiosInstance} from 'axios';
import {API_FRONT_END_GALLERY_LIST} from '../common/apiRoutes';

export default function runAxiosMockAdapter(axiosInstance: AxiosInstance) {
  // This sets the mock adapter on the default instance
  const mock = new MockAdapter(axiosInstance);

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

  mock.onGet(API_FRONT_END_GALLERY_LIST).reply(200, {
    data: [
      {
        id: 1,
        title: 'বিটাক টেইনিং',
        image_url:
          'https://images.unsplash.com/photo-1627625598560-1874d7f06a97?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80',
        content: 'বিটাক টেইনিং নিলে টেইনিং শেষই মিলবে চাকরি',
        video_category: 'training',
        updated_at: '2021-08-10T07:16:19.000000Z',
      },
      {
        id: 2,
        title: 'বিটাক টেইনিং 2',
        image_url:
          'https://images.unsplash.com/photo-1627625598560-1874d7f06a97?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80',
        content: 'বিটাক টেইনিং নিলে টেইনিং শেষই মিলবে চাকরি 2',
        video_category: 'normal',
        updated_at: '2021-08-10T07:16:19.000000Z',
      },
    ],
  });
}

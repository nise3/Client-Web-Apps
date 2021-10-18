import MockAdapter from 'axios-mock-adapter';
import {AxiosInstance} from 'axios';
import {API_COURSES, API_FRONT_END_GALLERY_LIST} from '../common/apiRoutes';
import videos from '../mock-db/videos';
import courses from '../mock-db/courses';
import myCourses from '../mock-db/myCourses';

export default function registerAxiosMockAdapter(axiosInstance: AxiosInstance) {
  // This sets the mock adapter on the default instance
  const mock = new MockAdapter(axiosInstance);
  mock.onGet(API_FRONT_END_GALLERY_LIST).reply(200, {data: videos});
  mock.onGet(API_COURSES + '/skill').reply(200, {data: courses});
  mock.onGet(API_COURSES + '/recent').reply(200, {data: courses});
  mock.onGet(API_COURSES + '/popular').reply(200, {data: courses});
  mock.onGet(API_COURSES + '/trending').reply(200, {data: courses});
  mock.onGet(API_COURSES + '/nearby').reply(200, {data: courses});
  mock.onGet(API_COURSES + '/my-courses').reply(200, {data: myCourses});
  mock.onAny().passThrough();
}

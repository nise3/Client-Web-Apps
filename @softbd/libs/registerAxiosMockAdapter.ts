import MockAdapter from 'axios-mock-adapter';
import {AxiosInstance} from 'axios';
import applicationManagement from '../mock-db/applicationManagement/application-management';
import {
  API_APPLICATION_MANAGEMENT,
  API_FRONT_END_GALLERY_CATEGORY_LIST,
  API_FRONT_END_GALLERY_LIST,
  API_FRONT_END_VIDEOS_CATEGORY_LIST,
  API_FRONT_END_VIDEOS_LIST,
  API_COURSES,
  API_COURSE_DETAILS,
} from '../common/apiRoutes';
import videos, {videosCategories} from '../mock-db/videos';
import galleries, {galleryCategories} from '../mock-db/gallery';
import courses from '../mock-db/courses';
import myCourses from '../mock-db/myCourses';
import courseDetails from '../mock-db/courseDetails';

export default function registerAxiosMockAdapter(axiosInstance: AxiosInstance) {
  // This sets the mock adapter on the default instance
  const mock = new MockAdapter(axiosInstance);
  mock.onGet(API_FRONT_END_GALLERY_LIST).reply(200, {data: videos});
  mock
    .onGet(API_APPLICATION_MANAGEMENT)
    .reply(200, {data: applicationManagement});

  mock.onGet(API_FRONT_END_VIDEOS_LIST).reply(200, {data: videos});
  mock
    .onGet(API_FRONT_END_VIDEOS_CATEGORY_LIST)
    .reply(200, {data: videosCategories});

  mock.onGet(API_FRONT_END_GALLERY_LIST).reply(200, {data: galleries});
  mock
    .onGet(API_FRONT_END_GALLERY_CATEGORY_LIST)
    .reply(200, {data: galleryCategories});

  mock.onGet(API_COURSES + '/skill').reply(200, {data: courses});
  mock.onGet(API_COURSES + '/recent').reply(200, {data: courses});
  mock.onGet(API_COURSES + '/popular').reply(200, {data: courses});
  mock.onGet(API_COURSES + '/trending').reply(200, {data: courses});
  mock.onGet(API_COURSES + '/nearby').reply(200, {data: courses});
  mock.onGet(API_COURSES + '/simillar').reply(200, {data: courses});
  mock.onGet(API_COURSES + '/my-courses').reply(200, {data: myCourses});

  mock.onGet(API_COURSE_DETAILS).reply(200, {data: courseDetails});

  //Put it on the bottom of that function
  mock.onAny().passThrough();
}

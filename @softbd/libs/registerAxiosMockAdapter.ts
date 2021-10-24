import MockAdapter from 'axios-mock-adapter';
import {AxiosInstance} from 'axios';
/*import applicationManagement from '../mock-db/applicationManagement/application-management';*/
import {
  /*API_APPLICATION_MANAGEMENT,*/
  API_FRONT_END_GALLERY_CATEGORY_LIST,
  API_FRONT_END_GALLERY_LIST,
  API_FRONT_END_VIDEOS_CATEGORY_LIST,
  API_FRONT_END_VIDEOS_LIST,
  API_COURSE_DETAILS,
  API_FONT_END_CONTACT_MAP,
  API_FRONT_END_RECENT_ACTIVITY_LIST,
  API_FRONT_END_ALL_ACTIVITY_LIST,
  API_FRONT_END_RECENT_ACTIVITY_DETAIL,
  API_FRONT_END_FAQ,
  API_FRONT_SC,
  API_NOTICE_BOARD,
} from '../common/apiRoutes';
import videos, {videosCategories} from '../mock-db/videos';
import galleries, {galleryCategories} from '../mock-db/gallery';
import contactMapData from '../mock-db/contactMap';
import courseDetails from '../mock-db/courseDetails';
import allActivityItems, {recentActivityItems} from '../mock-db/recentActivity';
import recentActivityDetails from '../mock-db/recentActivityDetails';
import faqData from '../mock-db/faq';
import staticContent from '../mock-db/staticContent';
import noticeList from '../mock-db/noticeBoard';

export default function registerAxiosMockAdapter(axiosInstance: AxiosInstance) {
  // This sets the mock adapter on the default instance
  const mock = new MockAdapter(axiosInstance);
  mock.onGet(API_FRONT_END_GALLERY_LIST).reply(200, {data: videos});

  /*  mock
    .onGet(API_APPLICATION_MANAGEMENT)
    .reply(200, {data: applicationManagement});*/

  mock.onGet(API_FRONT_END_VIDEOS_LIST).reply(200, {data: videos});
  mock
    .onGet(API_FRONT_END_VIDEOS_CATEGORY_LIST)
    .reply(200, {data: videosCategories});

  mock.onGet(API_FRONT_END_GALLERY_LIST).reply(200, {data: galleries});
  mock
    .onGet(API_FRONT_END_GALLERY_CATEGORY_LIST)
    .reply(200, {data: galleryCategories});

  mock.onGet(API_FONT_END_CONTACT_MAP).reply(200, {data: contactMapData});

  // mock.onGet(API_COURSES + '/skill').reply(200, {data: courses});
  // mock.onGet(API_COURSES + '/recent').reply(200, {data: courses});
  // mock.onGet(API_COURSES + '/popular').reply(200, {data: courses});
  // mock.onGet(API_COURSES + '/trending').reply(200, {data: courses});
  // mock.onGet(API_COURSES + '/nearby').reply(200, {data: courses});
  // mock.onGet(API_COURSES + '/simillar').reply(200, {data: courses});
  // mock.onGet(API_COURSES + '/my-courses').reply(200, {data: myCourses});

  mock.onGet(API_COURSE_DETAILS).reply(200, {data: courseDetails});

  mock
    .onGet(API_FRONT_END_RECENT_ACTIVITY_LIST)
    .reply(200, {data: recentActivityItems});
  mock
    .onGet(API_FRONT_END_ALL_ACTIVITY_LIST)
    .reply(200, {data: allActivityItems});

  mock
    .onGet(API_FRONT_END_RECENT_ACTIVITY_DETAIL)
    .reply(200, {data: recentActivityDetails[0]});

  mock.onGet(API_FRONT_END_FAQ).reply(200, {data: faqData});

  mock.onGet(API_FRONT_SC).reply(200, {data: staticContent[0]});

  mock.onGet(API_NOTICE_BOARD).reply(200, {data: noticeList});

  //Put it on the bottom of that function
  mock.onAny().passThrough();
}

import MockAdapter from 'axios-mock-adapter';
import {AxiosInstance} from 'axios';
import {
  API_FONT_END_CONTACT_MAP,
  API_FRONT_END_ALL_ACTIVITY_LIST,
  API_FRONT_END_GALLERY,
  API_FRONT_END_GALLERY_CATEGORY_LIST,
  API_FRONT_END_RECENT_ACTIVITY_DETAIL,
  API_FRONT_END_VIDEO,
  API_FRONT_END_VIDEOS_CATEGORY_LIST,
  API_FRONT_SC,
  API_NOTICE_BOARD,
} from '../common/apiRoutes';
import videos, {videosCategories} from '../mock-db/videos';
import galleries, {galleryCategories} from '../mock-db/gallery';
import contactMapData from '../mock-db/contactMap';
import allActivityItems from '../mock-db/recentActivity';
import recentActivityDetails from '../mock-db/recentActivityDetails';
import staticContent from '../mock-db/staticContent';
import noticeList from '../mock-db/noticeBoard';

export default function registerAxiosMockAdapter(axiosInstance: AxiosInstance) {
  // This sets the mock adapter on the default instance
  const mock = new MockAdapter(axiosInstance);
  // mock.onGet(API_FRONT_END_GALLERY_LIST).reply(200, {data: gallery-albums-album-contents});

  /*  mock
    .onGet(API_APPLICATION_MANAGEMENT)
    .reply(200, {data: applicationManagement});*/

  /*mock.onGet(API_FRONT_END_VIDEOS_LIST).reply(200, {data: videos});*/
  mock
    .onGet(API_FRONT_END_VIDEOS_CATEGORY_LIST)
    .reply(200, {data: videosCategories});

  /*  mock.onGet(API_FRONT_END_GALLERY_LIST).reply(200, {data: galleries});*/
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

  // mock
  //   .onGet(API_FRONT_END_RECENT_ACTIVITY_LIST)
  //   .reply(200, {data: recentActivityItems});

  mock
    .onGet(API_FRONT_END_ALL_ACTIVITY_LIST)
    .reply(200, {data: allActivityItems});

  mock
    .onGet(API_FRONT_END_RECENT_ACTIVITY_DETAIL)
    .reply(200, {data: recentActivityDetails[0]});

  mock.onGet(API_FRONT_SC).reply(200, {data: staticContent[0]});

  mock.onGet(API_NOTICE_BOARD).reply(200, {data: noticeList});

  mock.onGet(API_FRONT_END_VIDEO).reply(200, {data: videos[0]});

  mock.onGet(API_FRONT_END_GALLERY).reply(200, {data: galleries[0]});

  /**Industry**/
  // mock.onGet(API_INDUSTRY_PUBLICATIONS).reply(200, {data: publications});
  // mock.onGet(API_INDUSTRY_MEMBERS).reply(200, {data: members});
  // mock
  //   .onGet(new RegExp(API_INDUSTRY_MEMBERS + '/(.*)'))
  //   .reply(200, {data: members[0]});

  /**Application list**/
  /*  mock.onGet(API_APPLICATIONS_LISTS).reply(200, {data: applicationsList});

  mock
    .onGet(new RegExp(API_APPLICATIONS_LISTS + '/(.*)'))
    .reply(200, {data: applicationsList[0]});*/

  /**  joblist **/
  /*mock.onGet(API_JOBS).reply(200, {data: jobLists});
  mock.onGet(new RegExp(API_JOBS + '/(.*)')).reply(200, {data: jobLists[0]});*/

  /** job requiremeents **/
  /*  mock.onGet(API_JOB_REQUIREMENT).reply(200, {data: jobRequirements});*/

  /** API_HUMAN_RESOURCE_DEMAND **/
  /*  mock.onGet(API_HUMAN_RESOURCE_DEMAND_LIST).reply(200, {data: hrDemand});*/
  /*  mock
    .onGet(new RegExp(API_HUMAN_RESOURCE_DEMAND_LIST + '/(.*)'))
    .reply(200, {data: hrDemand[0]});*/

  //Put it on the bottom of that function
  mock.onAny().passThrough();
}

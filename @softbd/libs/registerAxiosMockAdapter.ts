import MockAdapter from 'axios-mock-adapter';
import {AxiosInstance} from 'axios';
import {API_INSTITUTE_QUESTION_BANK} from '../common/apiRoutes';
import questionBank from '../mock-db/question-bank';

export default function registerAxiosMockAdapter(axiosInstance: AxiosInstance) {
  // This sets the mock adapter on the default instance
  const mock = new MockAdapter(axiosInstance, {onNoMatch: 'throwException'});
  // mock.onGet(API_FRONT_END_GALLERY_LIST).reply(200, {data: gallery-albums-album-contents});

  /*  mock
    .onGet(API_APPLICATION_MANAGEMENT)
    .reply(200, {data: applicationManagement});*/

  /*mock.onGet(API_FRONT_END_VIDEOS_LIST).reply(200, {data: videos});*/

  /*  mock.onGet(API_FRONT_END_GALLERY_LIST).reply(200, {data: galleries});*/

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

  mock.onGet(API_INSTITUTE_QUESTION_BANK).reply(200, {data: questionBank});
  mock
    .onGet(new RegExp(API_INSTITUTE_QUESTION_BANK + '/(.*)'))
    .reply(200, {data: questionBank[0]});

  // const paymentRedirectTo = youthDomain() + '/assessment-payment/';
  // mock.onPost(API_ASSESSMENT_PAYMENT_PAY).reply(200, {
  //   redirect_url: paymentRedirectTo + 'success',
  // });

  //Put it on the bottom of that function
  mock.onAny().passThrough();
}

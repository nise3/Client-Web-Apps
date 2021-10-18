import MockAdapter from 'axios-mock-adapter';
import {AxiosInstance} from 'axios';
import {API_FRONT_END_GALLERY_LIST, API_APPLICATION_MANAGEMENT} from '../common/apiRoutes';
import videos from '../mock-db/videos';
import applicationManagement from '../mock-db/applicationManagement/application-management';

export default function registerAxiosMockAdapter(axiosInstance: AxiosInstance) {
  // This sets the mock adapter on the default instance
  const mock = new MockAdapter(axiosInstance);

  mock.onGet(API_FRONT_END_GALLERY_LIST).reply(200, {data: videos});
  mock.onGet(API_APPLICATION_MANAGEMENT).reply(200, {data: applicationManagement});

  mock.onAny().passThrough();
}

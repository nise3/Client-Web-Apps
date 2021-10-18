import MockAdapter from 'axios-mock-adapter';
import {AxiosInstance} from 'axios';
import {API_FRONT_END_GALLERY_LIST} from '../common/apiRoutes';
import videos from '../mock-db/videos';

export default function registerAxiosMockAdapter(axiosInstance: AxiosInstance) {
  // This sets the mock adapter on the default instance
  const mock = new MockAdapter(axiosInstance);

  mock.onGet(API_FRONT_END_GALLERY_LIST).reply(200, {data: videos});
}

import MockAdapter from 'axios-mock-adapter';
import {AxiosInstance} from 'axios';
import {
  API_FRONT_END_GALLERY_CATEGORY_LIST,
  API_FRONT_END_GALLERY_LIST,
  API_FRONT_END_VIDEOS_CATEGORY_LIST,
  API_FRONT_END_VIDEOS_LIST,
} from '../common/apiRoutes';
import videos, {videosCategories} from '../mock-db/videos';
import galleries, {galleryCategories} from '../mock-db/gallery';

export default function registerAxiosMockAdapter(axiosInstance: AxiosInstance) {
  // This sets the mock adapter on the default instance
  const mock = new MockAdapter(axiosInstance);

  mock.onGet(API_FRONT_END_VIDEOS_LIST).reply(200, {data: videos});
  mock
    .onGet(API_FRONT_END_VIDEOS_CATEGORY_LIST)
    .reply(200, {data: videosCategories});

  mock.onGet(API_FRONT_END_GALLERY_LIST).reply(200, {data: galleries});
  mock
    .onGet(API_FRONT_END_GALLERY_CATEGORY_LIST)
    .reply(200, {data: galleryCategories});
}

import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import {
  fetchStart,
  fetchSuccess,
  loadAuthUser,
  setAuthAccessTokenData,
} from '../../redux/actions';
import {
  COOKIE_KEY_APP_ACCESS_TOKEN,
  COOKIE_KEY_AUTH_ACCESS_TOKEN_DATA,
} from '../../shared/constants/AppConst';
import {AppState} from '../../redux/store';
import {USER_LOADED} from '../../redux/types/actions/Auth.actions';
import {
  AuthUser,
  CommonAuthUser,
} from '../../redux/types/models/CommonAuthUser';
import cookieInstance from '../../@softbd/libs/cookieInstance';
import {
  refreshAppAccessToken,
  setDefaultAuthorizationHeader,
} from '../../@softbd/libs/axiosInstance';

export const useAuthToken = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const {user} = useSelector<AppState, AppState['auth']>(({auth}) => auth);

  useEffect(() => {
    const validateAuth = async () => {
      //TODO: temporary
      const appAccessTokenData = cookieInstance.get(
        COOKIE_KEY_APP_ACCESS_TOKEN,
      );
      if (!appAccessTokenData && !!appAccessTokenData?.access_token) {
        await refreshAppAccessToken();
      }
      dispatch(fetchStart());

      const authAccessTokenData = cookieInstance.get(
        COOKIE_KEY_AUTH_ACCESS_TOKEN_DATA,
      );
      if (!authAccessTokenData) {
        dispatch(fetchSuccess());
        dispatch({type: USER_LOADED});
        return;
      }
      dispatch(setAuthAccessTokenData(authAccessTokenData));
      //TODO: temporary
      setDefaultAuthorizationHeader(authAccessTokenData?.access_token);
      try {
        await loadAuthUser(dispatch, authAccessTokenData);
        dispatch(fetchSuccess());
        return;
      } catch (err) {
        dispatch(fetchSuccess());
        return;
      }
    };

    const checkAuth = () => {
      Promise.all([validateAuth()]).then(() => {
        setLoading(false);
        dispatch({type: USER_LOADED});
      });
    };
    checkAuth();
  }, [dispatch]);

  return [loading, user];
};

export const useAuthUser = <
  T extends AuthUser = CommonAuthUser,
>(): T | null => {
  const {user} = useSelector<AppState, AppState['auth']>(({auth}) => auth);

  if (user) {
    return user;
  }

  return null;
};

export const useVendor = (): any | null => {
  return {
    id: 1,
    institute_type_id: 2,
    code: 'excepturi-non-repudiandae-magni-quaerat-ipsum-aut-quia-alias-sit-omnis-nostrum-quis-fuga-deleniti-excepturi-eos-dicta-tempora-iusto',
    title: 'Chester Koss',
    title_en: 'Chester Koss',
    domain: 'https://morar.biz',
    loc_division_id: 2,
    division_title: 'চট্টগ্রাম',
    division_title_en: 'Chittagong',
    loc_district_id: 10,
    district_title: 'চট্টগ্রাম',
    district_title_en: 'CHITTAGONG',
    loc_upazila_id: null,
    upazila_title: null,
    upazila_title_en: null,
    address: '393 Isac Trace\nChristiansenfort, KY 75275-4099',
    address_en: '393 Isac Trace\nChristiansenfort, KY 75275-4099',
    location_latitude: '91.815526',
    location_longitude: '91.815526',
    google_map_src: 'Saepe nobis nesciunt voluptatem aliquam.',
    logo: 'softbd.jpg',
    country: 'BD',
    phone_code: '880',
    primary_phone: '573-266-9952',
    phone_numbers: null,
    primary_mobile: '01766197841',
    mobile_numbers: '["01701633495","01737292340"]',
    email: 'jane.spinka@daugherty.info',
    name_of_the_office_head: 'Carlie Stracke',
    name_of_the_office_head_en: 'Carlie Stracke',
    name_of_the_office_head_designation: 'Principal',
    name_of_the_office_head_designation_en: 'Principal',
    contact_person_name: 'Percival Ryan',
    contact_person_name_en: 'Percival Ryan',
    contact_person_mobile: '01761260041',
    contact_person_email: 'stamm.lea@champlin.org',
    contact_person_designation: 'HR Manager',
    contact_person_designation_en: 'HR Manager',
    config: 'Tempore sit rerum culpa repudiandae perspiciatis.',
    row_status: 1,
    created_by: null,
    updated_by: null,
    created_at: '2021-10-25T13:14:06.000000Z',
    updated_at: '2021-10-25T13:14:06.000000Z',
    deleted_at: null,
  };
};

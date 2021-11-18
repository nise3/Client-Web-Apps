import {fetchError, fetchStart, fetchSuccess} from './Common';
import {AuthType} from '../../shared/constants/AppEnums';
import {COOKIE_KEY_AUTH_ACCESS_TOKEN_DATA} from '../../shared/constants/AppConst';
import {CommonAuthUser, YouthAuthUser} from '../types/models/CommonAuthUser';
import {AppActions} from '../types';
import {Dispatch} from 'redux';
import {
  SET_AUTH_ACCESS_TOKEN_DATA,
  SIGNOUT_AUTH_SUCCESS,
  UPDATE_AUTH_USER,
} from '../types/actions/Auth.actions';
import {Base64} from 'js-base64';
import {apiGet} from '../../@softbd/common/api';
import {
  CORE_SERVICE_PATH,
  YOUTH_SERVICE_PATH,
} from '../../@softbd/common/apiRoutes';
import UserTypes from '../../@softbd/utilities/UserTypes';
import cookieInstance from '../../@softbd/libs/cookieInstance';
import {Gender} from '../../@softbd/utilities/Genders';
import {IdentityNumberType} from '../../@softbd/utilities/IdentityNumberTypes';
import {FreedomFighterStatusType} from '../../@softbd/utilities/FreedomFighterStatus';
import {MaritalStatusType} from '../../@softbd/utilities/MaritalStatus';
import {Religion} from '../../@softbd/utilities/Religions';
import {EthnicGroupStatusType} from '../../@softbd/utilities/EthnicGroupStatus';
import {setDefaultAuthorizationHeader} from '../../@softbd/libs/axiosInstance';
import axios from 'axios';

type TOnSSOSignInCallback = {
  access_token: string; // Inorder to consume api, use access token to authorize.
  expires_in: string | number; // token lifetime in second
  id_token: string; // {Header, payload, signature}
  session_state: string; // I don't know.
};

type TOnSSOSignInCallbackCode = string;

export const onSSOSignInCallback = (code: TOnSSOSignInCallbackCode) => {
  return async (dispatch: Dispatch<AppActions>) => {
    try {
      const {data: tokenData}: {data: TOnSSOSignInCallback} = await axios.post(
        'https://core.bus-staging.softbdltd.com/sso-authorize-code-grant',
        {
          code,
          redirect_uri: 'http://localhost:3000/callback',
        },
      );

      cookieInstance.set(
        COOKIE_KEY_AUTH_ACCESS_TOKEN_DATA,
        JSON.stringify(tokenData),
        {
          path: '/',
        },
      );
      //TODO: temporary
      setDefaultAuthorizationHeader(tokenData?.access_token);
      dispatch(setAuthAccessTokenData(tokenData));
      await loadAuthUser(dispatch, tokenData);
    } catch (err: any) {
      console.log('onSSOSignInCallback - error!!!!', err);
    }
  };
};

export const loadAuthUser = async (
  dispatch: Dispatch<AppActions | any>,
  tokenData: TOnSSOSignInCallback,
) => {
  // console.log('loadAuthUser() - tokenData - ', tokenData);
  dispatch(fetchStart());
  try {
    const ssoTokenData = JSON.parse(
      Base64.decode((tokenData.id_token || '..').split('.')[1]),
    );
    console.log(ssoTokenData);
    const coreResponse =
      ssoTokenData.userType == UserTypes.YOUTH_USER
        ? await apiGet(YOUTH_SERVICE_PATH + '/youth-profile')
        : await apiGet(
            CORE_SERVICE_PATH + `/users/${ssoTokenData.sub}/permissions`, //TODO: This api will be '/user-profile or /auth-profile'
          );
    console.log(coreResponse);

    const {data} = coreResponse.data;
    dispatch(fetchSuccess());
    dispatch({
      type: UPDATE_AUTH_USER,
      payload:
        ssoTokenData.userType == UserTypes.YOUTH_USER
          ? getYouthAuthUserObject({...ssoTokenData, ...data})
          : getCommonAuthUserObject({...ssoTokenData, ...data}),
    });
  } catch (err: any) {
    console.log('error!!!!', err);
    dispatch(fetchError(err));
  }
};

export const setAuthAccessTokenData = (
  data: TOnSSOSignInCallback,
): AppActions | any => ({
  type: SET_AUTH_ACCESS_TOKEN_DATA,
  payload: data,
});

type TAuthUserSSOResponse = {
  sub: string;
  upn: string;
  id: string | number;
  given_name: string;
  family_name: string;
  userType: 'system' | 'institute' | 'organization' | 'youth';
  isSystemUser: boolean;
  isInstituteUser: boolean;
  isOrganizationUser: boolean;
  institute_id?: string | number;
  organization_id?: string | number;
  institute?: Institute;
  organization?: Organization;
  role?: Role;
  displayName?: string;
  email?: string;
  username: string;
  permissions: string[];
  photoURL?: string;
};

type TYouthAuthUserSSOResponse = {
  id: number | string;
  sub: string;
  upn: string;
  given_name: string;
  family_name: string;
  userType: 'youth';
  displayName?: string;
  email?: string;
  username: string;
  permissions: string[];
  photoURL?: string;
  date_of_birth: string;
  first_name: string;
  gender: Gender;
  last_name: string;
  last_name_en?: string;
  mobile: string;
  user_name_type: number;
  freedom_fighter_status: FreedomFighterStatusType;
  identity_number_type: IdentityNumberType;
  identity_number?: string;
  marital_status: MaritalStatusType;
  religion: Religion;
  nationality?: string;
  does_belong_to_ethnic_group: EthnicGroupStatusType;
  is_freelance_profile: number;
  first_name_en?: string;
  physical_disability_status: number;
  loc_division_id?: string;
  division_title_en?: string;
  division_title?: string;
  loc_district_id?: string;
  district_title_en?: string;
  district_title?: string;
  loc_upazila_id?: string;
  upazila_title_en?: string;
  upazila_title?: string;
  village_or_area?: string;
  village_or_area_en?: string;
  house_n_road?: string;
  house_n_road_en?: string;
  zip_or_postal_code?: string;
  bio?: string;
  bio_en?: string;
  photo?: string;
  cv_path?: string;
  physical_disabilities?: any[];
  skills?: any[];
  youth_certifications?: any[];
  youth_educations?: any[];
  youth_languages_proficiencies?: any[];
  youth_portfolios?: any[];
};

export const getCommonAuthUserObject = (
  authUser: TAuthUserSSOResponse,
): CommonAuthUser => {
  return {
    userId: authUser?.id,
    isYouthUser: false,
    isInstituteUser: authUser?.isInstituteUser,
    isOrganizationUser: authUser?.isOrganizationUser,
    isSystemUser: authUser?.isSystemUser,
    userType: authUser?.userType,
    institute_id: authUser?.institute_id,
    institute: authUser?.institute,
    organization_id: authUser?.organization_id,
    organization: authUser?.organization,
    authType: AuthType.AUTH2,
    displayName: authUser?.displayName,
    email: authUser?.email,
    role: authUser?.role,
    uid: authUser.sub,
    username: authUser.username,
    permissions: authUser.permissions,
    photoURL: authUser?.photoURL,
  };
};

export const getYouthAuthUserObject = (
  authUser: TYouthAuthUserSSOResponse,
): YouthAuthUser => {
  return {
    isYouthUser: true,
    userType: authUser?.userType,
    authType: AuthType.AUTH2,
    displayName: authUser?.displayName,
    isInstituteUser: false,
    isOrganizationUser: false,
    isSystemUser: false,
    email: authUser?.email,
    uid: authUser?.sub,
    youthId: authUser?.id,
    username: authUser?.username,
    date_of_birth: authUser?.date_of_birth,
    first_name: authUser?.first_name,
    gender: authUser?.gender,
    freedom_fighter_status: authUser?.freedom_fighter_status,
    identity_number_type: authUser?.identity_number_type,
    identity_number: authUser?.identity_number,
    marital_status: authUser?.marital_status,
    religion: authUser?.religion,
    nationality: authUser?.nationality,
    does_belong_to_ethnic_group: authUser?.does_belong_to_ethnic_group,
    is_freelance_profile: authUser?.is_freelance_profile,
    last_name: authUser?.last_name,
    last_name_en: authUser?.last_name_en,
    mobile: authUser?.mobile,
    user_name_type: authUser?.user_name_type,
    first_name_en: authUser?.first_name_en,
    physical_disability_status: authUser?.physical_disability_status,
    loc_division_id: authUser?.loc_division_id,
    loc_division_title_en: authUser?.division_title_en,
    loc_division_title: authUser?.division_title,
    loc_district_id: authUser?.loc_district_id,
    loc_district_title_en: authUser?.district_title_en,
    loc_district_title: authUser?.district_title,
    loc_upazila_id: authUser?.loc_upazila_id,
    loc_upazila_title_en: authUser?.upazila_title_en,
    loc_upazila_title: authUser?.upazila_title,
    village_or_area: authUser?.village_or_area,
    village_or_area_en: authUser?.village_or_area_en,
    house_n_road: authUser?.house_n_road,
    house_n_road_en: authUser?.house_n_road_en,
    zip_or_postal_code: authUser?.zip_or_postal_code,
    bio: authUser?.bio,
    bio_en: authUser?.bio_en,
    photo: authUser?.photo,
    cv_path: authUser?.cv_path,
    physical_disabilities: authUser?.physical_disabilities,
    skills: authUser?.skills,
    total_certificates: authUser?.youth_certifications?.length,
    certifications: authUser?.youth_certifications,
    educations: authUser?.youth_educations,
    portfolios: authUser?.youth_portfolios,
    languages_proficiencies: authUser?.youth_languages_proficiencies,
  };
};

/**
 * @deprecated
 */
export const onJWTAuthSignout = () => {
  return (dispatch: Dispatch<AppActions | any>) => {
    dispatch(fetchStart());
    dispatch({type: SIGNOUT_AUTH_SUCCESS});
    cookieInstance.remove(COOKIE_KEY_AUTH_ACCESS_TOKEN_DATA);
    dispatch(fetchSuccess());
    console.log('logged out.');
  };
};

import {fetchError, fetchStart, fetchSuccess} from './Common';
import {AuthType} from '../../shared/constants/AppEnums';
import {
  COOKIE_KEY_APP_ACCESS_TOKEN,
  COOKIE_KEY_AUTH_ACCESS_TOKEN_DATA,
  COOKIE_KEY_AUTH_ID_TOKEN,
  COOKIE_KEY_SSO_SESSION_STATE,
} from '../../shared/constants/AppConst';
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
import UserTypes from '../../@softbd/utilities/UserTypes';
import {
  getBrowserCookie,
  removeBrowserCookie,
  setBrowserCookie,
} from '../../@softbd/libs/cookieInstance';
// import {Gender} from '../../@softbd/utilities/Genders';
// import {IdentityNumberType} from '../../@softbd/utilities/IdentityNumberTypes';
// import {FreedomFighterStatusType} from '../../@softbd/utilities/FreedomFighterStatus';
// import {MaritalStatusType} from '../../@softbd/utilities/MaritalStatus';
// import {Religion} from '../../@softbd/utilities/Religions';
// import {EthnicGroupStatusType} from '../../@softbd/utilities/EthnicGroupStatus';
import {setDefaultAuthorizationHeader} from '../../@softbd/libs/axiosInstance';
import axios from 'axios';
import {getHostUrl, paramsBuilder} from '../../@softbd/common/SSOConfig';
import {
  TAuthUserSSOResponse,
  TOnSSOSignInCallback,
  TYouthAuthUserSSOResponse,
} from '../../shared/Interface/IAuthentication';
import {API_SSO_AUTHORIZE_CODE_GRANT} from '../../@softbd/common/apiRoutes';
// import {IOrganization} from '../../shared/Interface/organization.interface';
// import {IInstitute} from '../../shared/Interface/institute.interface';
// import {IRole} from '../../shared/Interface/userManagement.interface';

type TOnSSOSignInCallbackCode = string;

export const onSSOSignInCallback = (
  code: TOnSSOSignInCallbackCode,
  redirected_from?: string,
  session_state?: string,
) => {
  return async (dispatch: Dispatch<AppActions>) => {
    const redirectUrl = new URL(getHostUrl() + '/callback');
    if (redirected_from) {
      redirectUrl.search = paramsBuilder({redirected_from: redirected_from});
    }

    // let urlHost = process.env.NEXT_PUBLIC_BACK_CHANNEL_URL
    //   ? process.env.NEXT_PUBLIC_BACK_CHANNEL_URL
    //   : 'https://core.bus-staging.softbdltd.com';
    const apiKey = process.env.NEXT_PUBLIC_BACK_CHANNEL_API_KEY
      ? process.env.NEXT_PUBLIC_BACK_CHANNEL_API_KEY
      : null;

    console.log('urlHost', API_SSO_AUTHORIZE_CODE_GRANT);

    try {
      const {data: tokenData}: {data: TOnSSOSignInCallback} = await axios.post(
        // urlHost + '/sso-authorize-code-grant',
        API_SSO_AUTHORIZE_CODE_GRANT,
        {
          code,
          redirect_uri: redirectUrl.toString(),
        },
        {
          headers: {
            apikey: apiKey,
          },
        },
      );

      console.log('onSSOSignInCallback', tokenData);

      let expireDate = new Date();
      expireDate.setTime(
        new Date().getTime() + Number(tokenData.expires_in) * 1000,
      );

      await setBrowserCookie(COOKIE_KEY_SSO_SESSION_STATE, session_state, {
        expires: expireDate,
      });

      await setBrowserCookie(
        COOKIE_KEY_AUTH_ACCESS_TOKEN_DATA,
        JSON.stringify({
          access_token: tokenData.access_token,
          expires_in: tokenData.expires_in,
          refresh_token: tokenData.refresh_token,
        }),
        {expires: expireDate},
      );

      await setBrowserCookie(COOKIE_KEY_AUTH_ID_TOKEN, tokenData.id_token, {
        expires: expireDate,
      });

      //TODO: temporary
      setDefaultAuthorizationHeader(tokenData?.access_token);
      await dispatch(setAuthAccessTokenData(tokenData));
      await loadAuthUser(dispatch, tokenData);

      /** This redirection logic is moved to @softbd/layouts/hoc/DefaultPage/withData.tsx */
      /*
      if (redirected_from?.length) {
        window.location.href = redirected_from;
      }
      */
    } catch (err: any) {
      console.log('onSSOSignInCallback - error!!!!', err);
    }
  };
};
/** TODO: This Function should not be here */
export const loadAuthUser = async (
  dispatch: Dispatch<AppActions | any>,
  tokenData: TOnSSOSignInCallback,
) => {
  console.log('loadAuthUser() - tokenData - ', tokenData);
  dispatch(fetchStart());
  try {
    const ssoTokenData = JSON.parse(
      Base64.decode((tokenData.id_token || '..').split('.')[1]),
    );
    console.log(ssoTokenData);
    const youthServicePath = process.env.NEXT_PUBLIC_YOUTH_SERVICE_PATH;
    const coreServicePath = process.env.NEXT_PUBLIC_CORE_SERVICE_PATH;
    const appAccessTokenData = getBrowserCookie(COOKIE_KEY_APP_ACCESS_TOKEN);
    console.log('permission call: appAccessTokenData', appAccessTokenData);

    //TODO: This api will be '/user-profile or /auth-profile'
    const coreResponse =
      ssoTokenData.user_type == UserTypes.YOUTH_USER
        ? await apiGet(youthServicePath + '/youth-profile', {
            headers: {
              Authorization: 'Bearer ' + appAccessTokenData?.access_token,
              'User-Token': 'Bearer ' + tokenData.access_token,
            },
          })
        : await apiGet(
            coreServicePath + `/users/${ssoTokenData.sub}/permissions`,
            {
              headers: {
                Authorization: 'Bearer ' + appAccessTokenData?.access_token,
                'User-Token': 'Bearer ' + tokenData.access_token,
              },
            },
          );
    console.log(coreResponse);

    const {data} = coreResponse.data;
    dispatch(fetchSuccess());
    dispatch({
      type: UPDATE_AUTH_USER,
      payload:
        ssoTokenData.user_type == UserTypes.YOUTH_USER
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

export const getCommonAuthUserObject = (
  authUser: TAuthUserSSOResponse,
): CommonAuthUser => {
  return {
    isIndustryAssociationUser: authUser.isIndustryAssociationUser,
    userId: authUser?.user_id,
    isYouthUser: false,
    domain: authUser?.domain,
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
    profile_pic: authUser?.profile_pic,
    name: authUser?.name,
    institute_user_type: authUser?.institute_user_type,
    training_center_id: authUser?.training_center_id,
    branch_id: authUser?.branch_id,
    industry_association_id: authUser?.industry_association_id,
    industry_association: authUser?.industry_association,
  };
};

export const getYouthAuthUserObject = (
  authUser: TYouthAuthUserSSOResponse,
): YouthAuthUser => {
  return {
    isIndustryAssociationUser: false,
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
    youthCode: authUser?.code,
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
    signature_image_path: authUser?.signature_image_path,
    cv_path: authUser?.cv_path,
    physical_disabilities: authUser?.physical_disabilities,
    skills: authUser?.skills,
    total_certificates: authUser?.youth_certifications?.length,
    certifications: authUser?.youth_certifications,
    educations: authUser?.youth_educations,
    portfolios: authUser?.youth_portfolios,
    languages_proficiencies: authUser?.youth_languages_proficiencies,
    profile_completed: authUser?.profile_completed,
    total_job_experience: authUser?.total_job_experience,
    addresses: authUser?.youth_addresses,
    expected_salary: authUser?.expected_salary,
    job_level: authUser?.job_level,
    default_cv_template: authUser?.default_cv_template,
  };
};

export const Signout = () => {
  return (dispatch: Dispatch<AppActions | any>) => {
    dispatch(fetchStart());
    dispatch({type: SIGNOUT_AUTH_SUCCESS});
    removeBrowserCookie(COOKIE_KEY_AUTH_ACCESS_TOKEN_DATA);
    removeBrowserCookie(COOKIE_KEY_AUTH_ID_TOKEN);
    dispatch(fetchSuccess());
    console.log('logged out.');
  };
};

// export const onJWTAuthSignout = () => {
//   return (dispatch: Dispatch<AppActions | any>) => {
//     dispatch(fetchStart());
//     dispatch({type: SIGNOUT_AUTH_SUCCESS});
//     removeBrowserCookie(COOKIE_KEY_AUTH_ACCESS_TOKEN_DATA);
//     removeBrowserCookie(COOKIE_KEY_AUTH_ID_TOKEN);
//     dispatch(fetchSuccess());
//     console.log('logged out.');
//   };
// };

/**
 * @deprecated use Signout() instead
 */
export const onJWTAuthSignout = () => {
  return Signout();
};

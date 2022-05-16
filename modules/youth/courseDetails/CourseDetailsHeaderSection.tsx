import React, { FC, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Button, Container, Grid } from '@mui/material';
import TagChip from '../../../@softbd/elements/display/TagChip';
import { useIntl } from 'react-intl';
import {
  getCourseDuration,
  getIntlNumber,
} from '../../../@softbd/utilities/helpers';
import { Body1, H1, Link } from '../../../@softbd/elements/common';
import {
  LINK_FRONTEND_YOUTH_CERTIFICATE_VIEW,
  LINK_FRONTEND_YOUTH_COURSE_ENROLLMENT,
  LINK_FRONTEND_YOUTH_COURSE_ENROLLMENT_CHOOSE_PAYMENT_METHOD,
  LINK_FRONTEND_YOUTH_COURSE_ENROLLMENT_VERIFICATION,
  LINK_YOUTH_SIGNUP,
} from '../../../@softbd/common/appLinks';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import {YouthAuthUser} from '../../../redux/types/models/CommonAuthUser';
import CustomChip from '../../../@softbd/elements/display/CustomChip/CustomChip';
import {
  gotoLoginSignUpPage,
  youthDomain,
} from '../../../@softbd/common/constants';
import CardMediaImageView from '../../../@softbd/elements/display/ImageView/CardMediaImageView';
import { getCertificateIssue } from '../../../services/CertificateAuthorityManagement/CertificateIssueService';
import { ICertificateIssue, ICertificateIssueView } from '../../../shared/Interface/certificates';

const PREFIX = 'CourseDetailsHeaderSection';

const classes = {
  courseFee: `${PREFIX}-courseFee`,
  courseFeeStyle: `${PREFIX}-courseFeeStyle`,
  certificateViewButton: `${PREFIX}-certificateViewButton`,
};

const StyledContainer = styled(Container)(({ theme }) => ({
  [`& .${classes.courseFee}`]: {
    textTransform: 'uppercase',
    marginTop: 25,
    display: 'flex',
    marginBottom: 10,
  },
  [`& .${classes.courseFeeStyle}`]: {
    marginLeft: 10,
    color: theme.palette.primary.main,
  },
  [`& .${classes.certificateViewButton}`]: {
    marginLeft: 10,
  },
}));

const certificateIssueMock: {
  data: ICertificateIssueView[]
} = {
  "current_page": 1,
  "total_page": 1,
  "page_size": 10,
  "total": 2,
  "order": "ASC",
  "data": [
      {
          "id": 20,
          "certificate_id": 17,
          "certificate_title": "dd",
          "certificate_title_en": "ss",
          "certificate_result_type": 3,
          "youth_id": 41,
          "batch_id": 21,
          "row_status": 0,
          "youth_profile": {
              "id": 41,
              "idp_user_id": "b1c9ab48-7e96-4d62-bcaa-55a0866314a1",
              "username": "01801001076",
              "user_name_type": 0,
              "youth_auth_source": null,
              "first_name": "Taskinur",
              "first_name_en": null,
              "last_name": "Rahman",
              "last_name_en": null,
              "expected_salary": null,
              "job_level": null,
              "loc_division_id": 1,
              "code": "Y0000000000000067",
              "division_title": "বরিশাল",
              "division_title_en": "Barisal",
              "loc_district_id": 1,
              "district_title": "বরগুনা",
              "district_title_en": "BARGUNA",
              "loc_upazila_id": 1,
              "upazila_title": "বাগেরহাট সদর",
              "upazila_title_en": "BAGERHAT SADAR",
              "gender": 1,
              "religion": 1,
              "is_freelance_profile": 0,
              "marital_status": 1,
              "nationality": 1,
              "email": "33taskin12@gmail.com",
              "mobile": "01801001076",
              "identity_number_type": 1,
              "identity_number": "56607009",
              "date_of_birth": "1994-12-31T18:00:00.000000Z",
              "age": 27,
              "freedom_fighter_status": 1,
              "physical_disability_status": 1,
              "does_belong_to_ethnic_group": 1,
              "bio": null,
              "bio_en": null,
              "photo": null,
              "cv_path": null,
              "signature_image_path": null,
              "default_cv_template": null,
              "admin_access_type": null,
              "row_status": 1,
              "created_at": "2022-04-25T08:11:06.000000Z",
              "updated_at": "2022-04-25T09:20:11.000000Z",
              "profile_completed": 50,
              "total_job_experience": {
                  "year": 0,
                  "month": 0
              },
              "physical_disabilities": [
                  {
                      "id": 5,
                      "code": "Physical_Dis",
                      "title": "শারীরিক অক্ষমতা",
                      "title_en": "Physical Disabilities",
                      "row_status": 1,
                      "created_at": null,
                      "updated_at": null,
                      "deleted_at": null
                  }
              ],
              "youth_languages_proficiencies": [],
              "skills": [],
              "youth_educations": [],
              "youth_job_experiences": [],
              "youth_certifications": [],
              "youth_portfolios": [],
              "youth_addresses": []
          }
      },
      {
          "id": 25,
          "certificate_id": 22,
          "certificate_title": "test2",
          "certificate_title_en": "test2",
          "certificate_result_type": 4,
          "youth_id": 41,
          "batch_id": 22,
          "row_status": 0,
          "youth_profile": {
              "id": 41,
              "idp_user_id": "b1c9ab48-7e96-4d62-bcaa-55a0866314a1",
              "username": "01801001076",
              "user_name_type": 0,
              "youth_auth_source": null,
              "first_name": "Taskinur",
              "first_name_en": null,
              "last_name": "Rahman",
              "last_name_en": null,
              "expected_salary": null,
              "job_level": null,
              "loc_division_id": 1,
              "code": "Y0000000000000067",
              "division_title": "বরিশাল",
              "division_title_en": "Barisal",
              "loc_district_id": 1,
              "district_title": "বরগুনা",
              "district_title_en": "BARGUNA",
              "loc_upazila_id": 1,
              "upazila_title": "বাগেরহাট সদর",
              "upazila_title_en": "BAGERHAT SADAR",
              "gender": 1,
              "religion": 1,
              "is_freelance_profile": 0,
              "marital_status": 1,
              "nationality": 1,
              "email": "33taskin12@gmail.com",
              "mobile": "01801001076",
              "identity_number_type": 1,
              "identity_number": "56607009",
              "date_of_birth": "1994-12-31T18:00:00.000000Z",
              "age": 27,
              "freedom_fighter_status": 1,
              "physical_disability_status": 1,
              "does_belong_to_ethnic_group": 1,
              "bio": null,
              "bio_en": null,
              "photo": null,
              "cv_path": null,
              "signature_image_path": null,
              "default_cv_template": null,
              "admin_access_type": null,
              "row_status": 1,
              "created_at": "2022-04-25T08:11:06.000000Z",
              "updated_at": "2022-04-25T09:20:11.000000Z",
              "profile_completed": 50,
              "total_job_experience": {
                  "year": 0,
                  "month": 0
              },
              "physical_disabilities": [
                  {
                      "id": 5,
                      "code": "Physical_Dis",
                      "title": "শারীরিক অক্ষমতা",
                      "title_en": "Physical Disabilities",
                      "row_status": 1,
                      "created_at": null,
                      "updated_at": null,
                      "deleted_at": null
                  }
              ],
              "youth_languages_proficiencies": [],
              "skills": [],
              "youth_educations": [],
              "youth_job_experiences": [],
              "youth_certifications": [],
              "youth_portfolios": [],
              "youth_addresses": []
          }
      }
  ],
  "_response_status": {
      "success": true,
      "code": 200,
      "query_time": 0
  }
}

interface CourseDetailsHeaderProps {
  course: any;
  youthId: number;
}

const CourseDetailsHeaderSection: FC<CourseDetailsHeaderProps> = ({ course, youthId }) => {
  // console.log('course details: youthId', youthId)
  const { messages, formatNumber } = useIntl();
  const authUser = useAuthUser();
  // const [certificateIssue, setCertificateIssue] = useState(certificateIssueMock.data[0]);
  const [certificateIssue] = useState<ICertificateIssue>(certificateIssueMock.data[0]);

  // getCertificateIssue({youth_id: youthId})
  //   .then(res=>{
  //     if(res && res.length > 0){
  //       setCertificateIssue(res[0]);
  //     }
  //   })
  
  // console.log('const {data: certificateIssue} ', certificateIssue);
  return (
    <StyledContainer maxWidth={'lg'}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={6}>
          <Box className={classes.courseFee}>
            {messages['common.course_fee']}:{' '}
            <Box className={classes.courseFeeStyle}>
              {course?.course_fee
                ? '৳ ' + formatNumber(course.course_fee)
                : messages['common.free']}
            </Box>
          </Box>
          <H1 mb={1} style={{ fontWeight: 'bold', fontSize: '1.640625rem' }}>
            {course?.title}
          </H1>
          <Body1 mb={6}>{course?.institute_title}</Body1>
          {course?.duration && (
            <TagChip
              label={getCourseDuration(course.duration, formatNumber, messages)}
            />
          )}
          {course?.lessons && (
            <TagChip
              label={
                <IntlMessages
                  id={'course_details.total_lesson'}
                  values={{
                    total: getIntlNumber(formatNumber, '4'),
                  }}
                />
              }
            />
          )}

          {course?.enroll_count > 0 && (
            <TagChip
              label={
                <IntlMessages
                  id={'course_details.enrolled'}
                  values={{
                    total: getIntlNumber(formatNumber, course.enroll_count),
                  }}
                />
              }
            />
          )}

          <Box mt={4} mb={3}>
            {!course?.enrolled ? (
              course?.enrollable ? (
                <Link
                  href={
                    authUser
                      ? youthDomain() +
                        LINK_FRONTEND_YOUTH_COURSE_ENROLLMENT +
                        course?.id
                      : gotoLoginSignUpPage(LINK_YOUTH_SIGNUP)
                  }>
                  <Button variant={'contained'} color={'primary'}>
                    {messages['common.enroll_now']}
                  </Button>
                </Link>
              ) : (
                <CustomChip
                  label={messages['common.not_enrollable']}
                  color={'primary'}
                />
              )
            ) : (
              <Box mt={4}>
                {!course?.verified ? (
                  <Link
                    href={
                      authUser
                        ? youthDomain() +
                        LINK_FRONTEND_YOUTH_COURSE_ENROLLMENT +
                        course?.id
                        : gotoLoginSignUpPage(LINK_YOUTH_SIGNUP)
                    }>
                    <Button variant={'contained'} color={'primary'}>
                      {messages['common.verify_enrollment']}
                    </Button>
                  </Link>
                ) : !course?.payment_status ? (
                  <Link
                    href={
                      authUser
                        ? youthDomain() +
                          LINK_FRONTEND_YOUTH_COURSE_ENROLLMENT_CHOOSE_PAYMENT_METHOD +
                          course?.id +
                          `?enrollment_id=${course?.enrollment_id}`
                        : gotoLoginSignUpPage(LINK_YOUTH_SIGNUP)
                    }>
                    <Button variant={'contained'} color={'primary'}>
                      {messages['common.pay_now']}
                    </Button>
                  </Link>
                ) : (
                  <CustomChip
                    label={messages['common.already_enrolled']}
                    color={'primary'}
                  />
                )
              ) : (
                <Box mt={4}>
                  {!course?.verified ? (
                    <Link
                      href={
                        authUser
                          ? youthDomain() +
                          LINK_FRONTEND_YOUTH_COURSE_ENROLLMENT_VERIFICATION +
                          course?.id +
                          `?enrollment_id=${course?.enrollment_id}`
                          : gotoLoginSignUpPage(LINK_YOUTH_SIGNUP)
                      }>
                      <Button variant={'contained'} color={'primary'}>
                        {messages['common.verify_enrollment']}
                      </Button>
                    </Link>
                  ) : !course?.payment_status ? (
                    <Link
                      href={
                        authUser
                          ? youthDomain() +
                          LINK_FRONTEND_YOUTH_COURSE_ENROLLMENT_CHOOSE_PAYMENT_METHOD +
                          course?.id +
                          `?enrollment_id=${course?.enrollment_id}`
                          : gotoLoginSignUpPage(LINK_YOUTH_SIGNUP)
                      }>
                      <Button variant={'contained'} color={'primary'}>
                        {messages['common.pay_now']}
                      </Button>
                    </Link>
                  ) : (
                    <CustomChip
                      label={messages['common.already_enrolled']}
                      color={'primary'}
                    />
                  )}
                  <Link
                    className={classes.certificateViewButton}
                    href={
                      authUser
                        ? youthDomain() +
                        LINK_FRONTEND_YOUTH_CERTIFICATE_VIEW +
                        certificateIssue?.id
                        : gotoLoginSignUpPage(LINK_YOUTH_SIGNUP)
                    }>
                    <Button variant={'contained'} color={'primary'}>
                      {messages['common.certificate_view']}
                    </Button>
                  </Link>
                </Box>
              )}
            </Box>
          )}
          
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <CardMediaImageView
            image={course?.cover_image}
            sx={{ height: 300, width: '100%', backgroundSize: '100%' }}
            title={course?.title}
          />
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default CourseDetailsHeaderSection;

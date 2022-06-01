import React, {FC, useCallback, useEffect, useState} from 'react';
import {styled} from '@mui/material/styles';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
} from '@mui/material';
import {
  BusinessCenter,
  CalendarToday,
  LocationOn,
  Room,
} from '@mui/icons-material';
import {useIntl} from 'react-intl';
import {Body1, Body2, H5, H6, Link} from '../common';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {getIntlDateFromString} from '../../utilities/helpers';
import {
  LINK_FRONTEND_JOB_DETAILS,
  LINK_YOUTH_SIGNUP,
} from '../../common/appLinks';
import {gotoLoginSignUpPage} from '../../common/constants';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import {YouthAuthUser} from '../../../redux/types/models/CommonAuthUser';
import {useRouter} from 'next/router';
import TagChip from '../display/TagChip';
import {
  SalaryShowOption,
  SHOW,
} from '../../../modules/dashboard/jobLists/jobPost/enums/JobPostEnums';
import JobApplyPopup from '../../components/JobApplyPopup';
import CustomChip from '../display/CustomChip/CustomChip';
import {useCustomStyle} from '../../hooks/useCustomStyle';
import JobScheduleResponsePopup from '../../components/JobScheduleResponsePopup';
import ConfirmationStatus from '../../components/JobScheduleResponsePopup/ConfirmationStatus';
import moment from 'moment';
import CardMediaImageView from '../display/ImageView/CardMediaImageView';
import AvatarImageView from '../display/ImageView/AvatarImageView';

const PREFIX = 'JobCardComponent';

const classes = {
  gridRoot: `${PREFIX}-gridRoot`,
  listRoot: `${PREFIX}-listRoot`,
  providerLogo: `${PREFIX}-providerLogo`,
  marginRight10: `${PREFIX}-marginRight10`,
  marginTop10: `${PREFIX}-marginTop10`,
  cardBottom: `${PREFIX}-cardBottom`,
  providerAvatar: `${PREFIX}-providerAvatar`,
  shareIcon: `${PREFIX}-shareIcon`,
  overflowText: `${PREFIX}-overflowText`,
  overflowSubText: `${PREFIX}-overflowSubText`,
  details: `${PREFIX}-details`,
  salaryIcon: `${PREFIX}-salaryIcon`,
};

const StyledCard = styled(Card)(({theme}) => ({
  [`&.${classes.gridRoot}`]: {
    maxWidth: 345,
    minWidth: '100%',
  },

  [`&.${classes.listRoot}`]: {
    maxWidth: 345,
    minWidth: '100%',

    [`& .MuiCardHeader-action`]: {
      margin: '0',
    },
    [`& .${classes.shareIcon}`]: {
      float: 'right',
      background: theme.palette.primary.main,
      borderRadius: '5px',
      color: theme.palette.common.white,
      padding: '5px',
      marginTop: '10px',
      cursor: 'pointer',
    },
  },

  [`& .${classes.providerLogo}`]: {
    height: 150,
    objectFit: 'unset',
  },

  [`& .${classes.marginRight10}`]: {
    marginRight: '10px',
  },
  [`& .${classes.cardBottom}`]: {
    marginTop: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    borderTop: '1px solid #888',
    padding: '5px',
  },
  [`& .${classes.marginTop10}`]: {
    marginTop: '10px',
  },
  [`& .${classes.providerAvatar}`]: {
    width: '80px',
    height: '80px',
    border: '1px solid #e9e9e9',
    [`& img`]: {
      objectFit: 'contain',
    },
  },
  [`& .${classes.overflowText}`]: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  [`& .${classes.overflowSubText}`]: {
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    minHeight: '45px',
  },
  [`& .${classes.details}`]: {
    whiteSpace: 'break-spaces',
    maxHeight: '100px',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 4,
    WebkitBoxOrient: 'vertical',
    textOverflow: 'ellipsis',
  },
  [`& .${classes.salaryIcon}`]: {
    background: '#616161',
    color: '#e4e4e4 !important',
    padding: '2px 6px',
    borderRadius: '50%',
  },
}));

interface JobCardComponentProps {
  job: any;
  isGridView?: boolean;
  onPopupClose?: () => void;
  isShowingInMyJobs?: boolean;
  size?: 'small' | 'large';
}

const JobCardComponent: FC<JobCardComponentProps> = ({
  job,
  onPopupClose,
  isGridView = false,
  isShowingInMyJobs = false,
  size = 'large',
}) => {
  const {messages, formatDate, formatNumber} = useIntl();
  const [isOpenJobApplyModal, setIsOpenJobApplyModal] = useState(false);
  const [isOpenScheduleResponseModal, setIsOpenScheduleResponseModal] =
    useState(false);

  const [time, setTime] = useState('');

  const authUser = useAuthUser<YouthAuthUser>();
  const router = useRouter();
  const customStyle = useCustomStyle();

  const closeJobApplyModal = useCallback(() => {
    setIsOpenJobApplyModal(false);
    if (onPopupClose) {
      onPopupClose();
    }
  }, []);

  const closeJobScheduleResponseModal = useCallback(() => {
    setIsOpenScheduleResponseModal(false);
    if (onPopupClose) {
      onPopupClose();
    }
  }, []);

  useEffect(() => {
    if (job?.interview_scheduled_at) {
      let day = moment(job?.interview_scheduled_at);

      setTime(day.toLocaleString());
    }
  }, [job]);

  const onJobApply = useCallback(() => {
    if (authUser) {
      setIsOpenJobApplyModal(true);
    } else {
      const redirect_url = window?.location?.origin+'/job-details/'+job?.job_id;
      router.push(gotoLoginSignUpPage(LINK_YOUTH_SIGNUP, redirect_url));
    }
  }, [authUser]);

  const onScheduleResponse = useCallback(() => {
    if (authUser) {
      setIsOpenScheduleResponseModal(true);
    }
  }, [authUser]);

  const getJobProviderTitle = () => {
    if (job?.company_info_visibility?.is_company_name_visible == SHOW) {
      if (job?.industry_association_id) {
        if (job?.organization_id) {
          return job?.organization_title;
        } else {
          return job?.industry_association_title;
        }
      } else if (job?.organization_id) {
        return job?.organization_title;
      } else {
        return '';
      }
    } else {
      return job?.company_info_visibility?.company_name;
    }
  };

  const getJobProviderImage = () => {
    let logo = '';
    if (job?.industry_association_id && job?.industry_association_logo) {
      if (job?.organization_id && job?.organization_logo) {
        logo = job.organization_logo;
      } else if (!job?.organization_id && job?.industry_association_logo) {
        logo = job.industry_association_logo;
      }
    } else if (
      job?.industry_association_id &&
      job?.organization_id &&
      job?.organization_logo
    ) {
      logo = job.organization_logo;
    } else if (job?.organization_id && job?.organization_logo) {
      logo = job.organization_logo;
    }
    return logo;
  };

  const getExperienceText = () => {
    let experienceText: any = '';
    if (!job?.minimum_year_of_experience && !job?.maximum_year_of_experience) {
      return messages['common.n_a'];
    } else if (
      job?.minimum_year_of_experience &&
      job?.maximum_year_of_experience
    ) {
      experienceText = (
        <IntlMessages
          id={'job_preview.experience_from_to'}
          values={{
            from: formatNumber(job?.minimum_year_of_experience),
            to: formatNumber(job?.maximum_year_of_experience),
          }}
        />
      );
    } else if (job?.minimum_year_of_experience) {
      experienceText = (
        <IntlMessages
          id={'job_preview.experience_at_least'}
          values={{
            from: formatNumber(job?.minimum_year_of_experience),
          }}
        />
      );
    } else if (job?.maximum_year_of_experience) {
      experienceText = (
        <IntlMessages
          id={'job_preview.experience_at_most'}
          values={{
            from: formatNumber(job?.maximum_year_of_experience),
          }}
        />
      );
    }
    return experienceText;
  };

  const getLocationText = () => {
    return (job?.additional_job_information?.job_locations || [])
      .map((location: any) => location.title)
      .join(', ');
  };

  const getSalary = () => {
    let salaryText: any = '';

    if (
      job?.additional_job_information?.is_salary_info_show ==
      SalaryShowOption.SALARY
    ) {
      salaryText =
        formatNumber(job?.additional_job_information?.salary_min) +
        ' - ' +
        formatNumber(job?.additional_job_information?.salary_max) +
        ` (${messages['common.monthly']})`;
    } else if (
      job?.additional_job_information?.is_salary_info_show ==
      SalaryShowOption.NEGOTIABLE
    ) {
      salaryText = messages['common.negotiable'];
    }

    return salaryText;
  };

  return (
    <StyledCard className={isGridView ? classes.gridRoot : classes.listRoot}>
      {isGridView ? (
        <React.Fragment>
          <CardMediaImageView
            className={classes.providerLogo}
            image={getJobProviderImage()}
            title={job?.job_title}
            alt={job?.job_title}
          />
          <CardContent sx={{paddingBottom: '5px'}}>
            <H5
              fontWeight={'bold'}
              title={job.job_title}
              className={classes.overflowText}>
              {job.job_title}
            </H5>
            <H6
              sx={{
                ...customStyle.body2,
                marginTop: '5px',
              }}
              className={classes.overflowSubText}
              title={getJobProviderTitle()}>
              {getJobProviderTitle()}
            </H6>
          </CardContent>
          <Divider />
          <CardContent>
            <Grid container spacing={1}>
              <Grid item xs={12} display={'flex'} alignItems={'center'}>
                <BusinessCenter className={classes.marginRight10} />
                {getExperienceText()}
              </Grid>
              <Grid item xs={12} display={'flex'} alignItems={'center'}>
                <Room className={classes.marginRight10} />
                {getLocationText()}
              </Grid>
              <Grid item xs={12} display={'flex'} alignItems={'center'}>
                <CalendarToday className={classes.marginRight10} />
                {job?.application_deadline
                  ? messages['common.publication_deadline'] +
                    ': ' +
                    getIntlDateFromString(
                      formatDate,
                      job.application_deadline,
                      'short',
                    )
                  : ''}
              </Grid>
              <Grid
                item
                xs={12}
                display={'flex'}
                justifyContent={'center'}
                mt={3}>
                <Link
                  passHref
                  href={`${LINK_FRONTEND_JOB_DETAILS}${job.job_id}`}>
                  <Button variant='outlined' color='primary' size={'small'}>
                    {messages['common.details']}
                  </Button>
                </Link>
                {(!authUser || authUser?.isYouthUser) &&
                  (job?.has_applied == '1' ? (
                    <CustomChip
                      label={messages['common.applied']}
                      color={'primary'}
                      sx={{
                        marginLeft: '15px',
                        borderRadius: '5px',
                        height: '35px',
                      }}
                    />
                  ) : (
                    <Button
                      variant={'contained'}
                      color={'primary'}
                      size={'small'}
                      sx={{marginLeft: '15px'}}
                      onClick={onJobApply}>
                      {messages['common.apply_now']}
                    </Button>
                  ))}
              </Grid>
            </Grid>
          </CardContent>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <CardHeader
            avatar={
              <AvatarImageView
                className={classes.providerAvatar}
                variant={'square'}
                src={getJobProviderImage()}
                title={job?.job_title}
                alt={job?.job_title}
              />
            }
            action={
              <Box>
                <Link
                  passHref
                  href={`${LINK_FRONTEND_JOB_DETAILS}${job.job_id}`}>
                  <Button variant='outlined' color='primary' size={'small'}>
                    {messages['common.details']}
                  </Button>
                </Link>
                {(!authUser || authUser?.isYouthUser) &&
                  (job?.has_applied == '1' ? (
                    <CustomChip
                      label={messages['common.applied']}
                      color={'primary'}
                      sx={{
                        marginLeft: '15px',
                        borderRadius: '5px',
                        height: '35px',
                      }}
                    />
                  ) : (
                    <Button
                      variant={'contained'}
                      color={'primary'}
                      size={'small'}
                      sx={{marginLeft: '15px'}}
                      onClick={onJobApply}>
                      {messages['common.apply_now']}
                    </Button>
                  ))}
              </Box>
            }
            title={
              <H5
                fontWeight={'bold'}
                sx={size == 'small' ? {fontSize: '1.3rem !important'} : {}}>
                {job.job_title}
              </H5>
            }
            subheader={
              <>
                <H6
                  sx={{
                    ...customStyle.body2,
                    marginTop: '5px',
                  }}>
                  {getJobProviderTitle()}
                </H6>
                {job?.application_deadline && size == 'small' && (
                  <Body2 fontWeight={'bold'}>
                    {`${
                      messages['common.publication_deadline']
                    } : ${getIntlDateFromString(
                      formatDate,
                      job.application_deadline,
                      'short',
                    )}`}
                  </Body2>
                )}
              </>
            }
          />
          <CardContent>
            <Body1
              className={classes.details}
              sx={size == 'small' ? {WebkitLineClamp: '2 !important'} : {}}>
              {job?.additional_job_information?.job_responsibilities}
            </Body1>
            <Box className={classes.marginTop10}>
              {job?.application_deadline && size != 'small' ? (
                <TagChip
                  label={
                    messages['common.publication_deadline'] +
                    ': ' +
                    getIntlDateFromString(
                      formatDate,
                      job.application_deadline,
                      'short',
                    )
                  }
                  icon={<CalendarToday />}
                />
              ) : (
                ''
              )}
              <TagChip label={getLocationText()} icon={<LocationOn />} />
              <TagChip label={getExperienceText()} icon={<BusinessCenter />} />
              {job?.additional_job_information?.is_salary_info_show !=
                SalaryShowOption.NOTHING && (
                <TagChip
                  label={getSalary()}
                  icon={<span className={classes.salaryIcon}>৳</span>}
                />
              )}
              {/*<Share className={classes.shareIcon} />*/}
            </Box>
            {isShowingInMyJobs && job?.interview_scheduled_at ? (
              <Box className={classes.cardBottom}>
                <Body1>
                  <Body1>
                    You have been invited in {job?.interview_address} at {time}
                  </Body1>
                </Body1>
                {job?.confirmation_status == ConfirmationStatus.ACCEPTED ? (
                  <CustomChip
                    label={messages['common.accepted']}
                    color={'primary'}
                    sx={{
                      marginLeft: '15px',
                      borderRadius: '5px',
                      height: '35px',
                    }}
                  />
                ) : job?.confirmation_status == ConfirmationStatus.REJECTED ? (
                  <CustomChip
                    label={messages['common.rejected']}
                    color={'primary'}
                    sx={{
                      marginLeft: '15px',
                      borderRadius: '5px',
                      height: '35px',
                    }}
                  />
                ) : job?.confirmation_status ==
                  ConfirmationStatus.RESCHEDULED ? (
                  <CustomChip
                    label={messages['common.rescheduled']}
                    color={'primary'}
                    sx={{
                      marginLeft: '15px',
                      borderRadius: '5px',
                      height: '35px',
                    }}
                  />
                ) : (
                  <Button
                    sx={{float: 'right'}}
                    variant={'outlined'}
                    color={'primary'}
                    size={'small'}
                    onClick={onScheduleResponse}>
                    {messages['common.response']}
                  </Button>
                )}
              </Box>
            ) : (
              ''
            )}
          </CardContent>
        </React.Fragment>
      )}

      {isOpenJobApplyModal && (
        <JobApplyPopup job={job} onClose={closeJobApplyModal} />
      )}
      {isOpenScheduleResponseModal && (
        <JobScheduleResponsePopup
          job={job}
          onClose={closeJobScheduleResponseModal}
        />
      )}
    </StyledCard>
  );
};
export default JobCardComponent;

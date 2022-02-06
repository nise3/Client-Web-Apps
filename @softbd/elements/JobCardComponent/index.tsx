import React, {FC, useCallback, useState} from 'react';
import {styled} from '@mui/material/styles';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Grid,
} from '@mui/material';
import {
  BusinessCenter,
  CalendarToday,
  LocationOn,
  Paid,
  Room,
  Share,
} from '@mui/icons-material';
import {useIntl} from 'react-intl';
import {Body1, Body2, H5, Link} from '../common';
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
import {SalaryShowOption} from '../../../modules/dashboard/jobLists/jobPost/enums/JobPostEnums';
import JobApplyPopup from '../../components/JobApplyPopup';

const PREFIX = 'JobCardComponent';

const classes = {
  gridRoot: `${PREFIX}-gridRoot`,
  listRoot: `${PREFIX}-listRoot`,
  providerLogo: `${PREFIX}-providerLogo`,
  marginRight10: `${PREFIX}-marginRight10`,
  marginTop10: `${PREFIX}-marginTop10`,
  providerAvatar: `${PREFIX}-providerAvatar`,
  shareIcon: `${PREFIX}-shareIcon`,
  overflowText: `${PREFIX}-overflowText`,
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
  [`& .${classes.marginTop10}`]: {
    marginTop: '10px',
  },
  [`& .${classes.providerAvatar}`]: {
    width: '80px',
    height: '80px',
    border: '1px solid #e9e9e9',
  },
  [`& .${classes.overflowText}`]: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
}));

interface JobCardComponentProps {
  job: any;
  isGridView?: boolean;
}

const JobCardComponent: FC<JobCardComponentProps> = ({
  job,
  isGridView = false,
}) => {
  const {messages, formatDate, formatNumber} = useIntl();
  const [isOpenJobApplyModal, setIsOpenJobApplyModal] = useState(false);
  const authUser = useAuthUser<YouthAuthUser>();
  const router = useRouter();

  const closeJobApplyModal = useCallback(() => {
    setIsOpenJobApplyModal(false);
  }, []);

  const onJobApply = useCallback(() => {
    if (authUser) {
      setIsOpenJobApplyModal(true);
    } else {
      router.push(gotoLoginSignUpPage(LINK_YOUTH_SIGNUP));
    }
  }, []);

  console.log('job: ', job);

  const getJobProviderTitle = () => {
    if (job.industry_association_id) {
      return job.industry_association_title;
    } else if (job.organization_id) {
      return job.organization_title;
    }
  };

  const getJobProviderImage = () => {
    let logo = '/images/blank_image.png';
    if (job.industry_association_id && job?.industry_association_logo) {
      logo = job.industry_association_logo;
    } else if (job.organization_id && job?.organization_logo) {
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
            from: job?.minimum_year_of_experience,
            to: job?.maximum_year_of_experience,
          }}
        />
      );
    } else if (job?.minimum_year_of_experience) {
      experienceText = (
        <IntlMessages
          id={'job_preview.experience_at_least'}
          values={{
            from: job?.minimum_year_of_experience,
          }}
        />
      );
    } else if (job?.maximum_year_of_experience) {
      experienceText = (
        <IntlMessages
          id={'job_preview.experience_at_most'}
          values={{
            from: job?.maximum_year_of_experience,
          }}
        />
      );
    }
    return experienceText;
  };

  const getLocationText = () => {
    return job?.job_locations
      ?.map((location: any) => location.title)
      .join(', ');
  };

  const getSalary = () => {
    let salaryText: any = '';

    if (job?.is_salary_info_show == SalaryShowOption.SALARY) {
      salaryText =
        '৳ ' +
        formatNumber(job?.salary_min) +
        ' - ' +
        formatNumber(job?.salary_max) +
        ` (${messages['common.monthly']})`;
    } else if (job?.is_salary_info_show == SalaryShowOption.NEGOTIABLE) {
      salaryText = messages['common.negotiable'];
    }

    return salaryText;
  };

  return (
    <StyledCard className={isGridView ? classes.gridRoot : classes.listRoot}>
      {isGridView ? (
        <React.Fragment>
          <CardMedia
            component={'img'}
            className={classes.providerLogo}
            image={getJobProviderImage()}
            title={job.job_title}
            alt={job.job_title}
          />
          <CardContent sx={{paddingBottom: '5px'}}>
            <H5
              fontWeight={'bold'}
              title={job.job_title}
              className={classes.overflowText}>
              {job.job_title}
            </H5>
            <Body2 className={classes.overflowText}>
              {getJobProviderTitle()}
            </Body2>
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
                  ? getIntlDateFromString(formatDate, job.application_deadline)
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
                <Button
                  variant={'contained'}
                  color={'primary'}
                  sx={{marginLeft: '15px'}}
                  onClick={onJobApply}>
                  {messages['common.apply_now']}
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <CardHeader
            avatar={
              <Avatar
                className={classes.providerAvatar}
                src={getJobProviderImage()}
                title={job.job_title}
                alt={job.job_title}
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
                <Button
                  variant={'contained'}
                  color={'primary'}
                  sx={{marginLeft: '15px'}}
                  onClick={onJobApply}>
                  {messages['common.apply_now']}
                </Button>
              </Box>
            }
            title={<H5 fontWeight={'bold'}>{job.job_title}</H5>}
            subheader={<Body2>{getJobProviderTitle()}</Body2>}
          />
          <CardContent>
            <Body1>{job?.job_responsibilities}</Body1>
            <Box className={classes.marginTop10}>
              <TagChip label={getLocationText()} icon={<LocationOn />} />
              <TagChip label={getExperienceText()} icon={<BusinessCenter />} />
              {job?.is_salary_info_show != SalaryShowOption.NOTHING && (
                <TagChip label={getSalary()} icon={<Paid />} />
              )}
              <Share className={classes.shareIcon} />
            </Box>
          </CardContent>
        </React.Fragment>
      )}

      {isOpenJobApplyModal && (
        <JobApplyPopup job={job} onClose={closeJobApplyModal} />
      )}
    </StyledCard>
  );
};
export default JobCardComponent;

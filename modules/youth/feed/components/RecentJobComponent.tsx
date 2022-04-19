import React, {FC, useCallback, useState} from 'react';
import {styled} from '@mui/material/styles';
import {Box, Button} from '@mui/material';
import {Fonts} from '../../../../shared/constants/AppEnums';
import {useIntl} from 'react-intl';
import {H3, Link} from '../../../../@softbd/elements/common';
import {useCustomStyle} from '../../../../@softbd/hooks/useCustomStyle';
import {
  LINK_FRONTEND_JOB_DETAILS,
  LINK_YOUTH_SIGNUP,
} from '../../../../@softbd/common/appLinks';
import CustomChip from '../../../../@softbd/elements/display/CustomChip/CustomChip';
import {useAuthUser} from '../../../../@crema/utility/AppHooks';
import {YouthAuthUser} from '../../../../redux/types/models/CommonAuthUser';
import {useRouter} from 'next/router';
import {gotoLoginSignUpPage} from '../../../../@softbd/common/constants';
import JobApplyPopup from '../../../../@softbd/components/JobApplyPopup';
import {SHOW} from '../../../dashboard/jobLists/jobPost/enums/JobPostEnums';
import AvatarImageView from '../../../../@softbd/elements/display/ImageView/AvatarImageView';

const PREFIX = 'RecentJobComponent';

const classes = {
  jobProviderImage: `${PREFIX}-jobProviderImage`,
  jobTitle: `${PREFIX}-jobTitle`,
  jobProviderName: `${PREFIX}-jobProviderName`,
  detailsButton: `${PREFIX}-detailsButton`,
};

const StyledBox = styled(Box)(({theme}) => ({
  padding: '5px 10px 0px 20px',

  [`& .${classes.jobProviderImage}`]: {
    height: 45,
    width: 45,
    border: '1px solid ' + theme.palette.grey['300'],
    '& img': {
      objectFit: 'contain',
    },
  },

  [`& .${classes.jobTitle}`]: {
    fontWeight: Fonts.BOLD,
  },

  [`& .${classes.jobProviderName}`]: {
    color: theme.palette.grey['600'],
    marginBottom: 10,
  },
  [`& .${classes.detailsButton}`]: {
    boxShadow: 'none',
    marginLeft: 10,
  },
}));

interface RecentJobProps {
  data: any;
}

const RecentJobComponent: FC<RecentJobProps> = ({data}) => {
  const {messages} = useIntl();
  const result = useCustomStyle();
  const authUser = useAuthUser<YouthAuthUser>();
  const router = useRouter();
  const [isOpenJobApplyModal, setIsOpenJobApplyModal] = useState(false);

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

  const getJobProviderTitle = () => {
    if (data?.company_info_visibility?.is_company_name_visible == SHOW) {
      if (data?.industry_association_id) {
        if (data?.organization_id) {
          return data?.organization_title;
        } else {
          return data?.industry_association_title;
        }
      } else if (data?.organization_id) {
        return data?.organization_title;
      } else {
        return '';
      }
    } else {
      return data?.company_info_visibility?.company_name;
    }
  };

  const getCompanyAddress = () => {
    let address: string = '';

    if (data?.industry_association_id) {
      if (data?.organization_id) {
        address = data?.organization_address;
      } else {
        address = data?.industry_association_address;
      }
    } else if (data?.organization_id) {
      address = data?.organization_address;
    }

    return address;
  };

  return (
    <StyledBox display={'flex'}>
      <Box>
        <AvatarImageView
          alt='provider image'
          variant={'square'}
          src={data?.industry_association_logo}
          className={classes.jobProviderImage}
        />
      </Box>
      <Box marginLeft={'10px'}>
        <H3 sx={{...result.body2}} className={classes.jobTitle}>
          {data?.job_title}
        </H3>
        <Box className={classes.jobProviderName}>
          {getJobProviderTitle()} &#8226; {getCompanyAddress()}
        </Box>
        <Box>
          <Link passHref href={`${LINK_FRONTEND_JOB_DETAILS}${data.job_id}`}>
            <Button variant='outlined' color='primary' size={'small'}>
              {messages['common.details']}
            </Button>
          </Link>
          {(!authUser || authUser?.isYouthUser) &&
            (data?.has_applied == '1' ? (
              <CustomChip
                label={messages['common.applied']}
                color={'primary'}
                sx={{marginLeft: '15px', borderRadius: '5px', height: '35px'}}
              />
            ) : (
              <Button
                variant={'contained'}
                color={'primary'}
                size={'small'}
                sx={{marginLeft: '10px'}}
                onClick={onJobApply}>
                {messages['common.apply_now']}
              </Button>
            ))}
        </Box>
      </Box>
      {isOpenJobApplyModal && (
        <JobApplyPopup job={data} onClose={closeJobApplyModal} />
      )}
    </StyledBox>
  );
};

export default RecentJobComponent;

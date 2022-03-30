import React, {useState} from 'react';
import {useIntl} from 'react-intl';
import {useRouter} from 'next/router';
import {Chip, Tab} from '@mui/material';
import {useFetchJobPreview} from '../../../services/IndustryManagement/hooks';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import {TabContext, TabList, TabPanel} from '@mui/lab';
import {JobInterviewTabs} from './JobInterviewTabs';
import {Body1, Body2, H4} from '../../../@softbd/elements/common';
import InterviewManagementPage from './InterviewManagementPage';
import JobPreviewPage from './JobPreviewPage';
import {getIntlDateFromString} from '../../../@softbd/utilities/helpers';
import {ServiceTypes} from '../jobLists/jobPost/enums/JobPostEnums';

const PREFIX = 'CandidatesPage';

const classes = {
  tabBox: `${PREFIX}-tabBox`,
  tabList: `${PREFIX}-tabList`,
  tabPanel: `${PREFIX}-tabPanel`,
};

const StyledBox = styled(Box)(({theme}) => ({
  [`& .${classes.tabBox}`]: {
    borderBottom: '1px solid',
    borderBottomColor: theme.palette.divider,
    display: 'flex',
    justifyContent: 'space-between',
  },
  [`& .${classes.tabList}`]: {
    width: 'fit-content',
    maxWidth: '100%',
    backgroundColor: theme.palette.background.paper,
    borderRadius: '10px 10px 0px 0px',
  },
  [`& .${classes.tabPanel}`]: {
    padding: '15px',
    background: theme.palette.common.white,
  },
}));

const CandidatesPage = () => {
  const {messages, formatDate} = useIntl();

  const router = useRouter();
  const {jobId} = router.query;
  const [value, setValue] = useState<string>(JobInterviewTabs.APPLICANTS);

  const {data: job} = useFetchJobPreview(String(jobId));

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const getServiceTypeName = () => {
    switch (job?.primary_job_information?.service_type) {
      case ServiceTypes.BASIC_LISTING:
        return messages['job_posting.service_type_basic'];
      case ServiceTypes.STAND_OUT_LISTING:
        return messages['job_posting.service_type_st_out_listing'];
      case ServiceTypes.STAND_OUT_PREMIUM:
        return messages['job_posting.service_type_st_out_premium'];
      default:
        return '';
    }
  };

  const getJobStatus = () => {
    switch (job?.job_status) {
      case 'live':
        return messages['common.job_status_live'];
      case 'pending':
        return messages['common.job_status_pending'];
      case 'expired':
        return messages['common.job_status_expired'];
      default:
        return '';
    }
  };
  const getColorByStatus = () => {
    switch (job?.job_status) {
      case 'live':
        return 'success';
      case 'pending':
        return 'warning';
      case 'expired':
        return 'error';
      default:
        return 'success';
    }
  };

  return (
    <StyledBox>
      <Box>
        <H4>{job?.primary_job_information?.job_title}</H4>
        <Box display={'flex'} mt={2} mb={2}>
          <Box>
            <Body1 fontWeight={'bold'}>{messages['common.job_status']}</Body1>
            {job?.job_status && (
              <Chip
                size={'small'}
                color={getColorByStatus()}
                label={getJobStatus()}
              />
            )}
          </Box>
          <Box ml={3}>
            <Body1 fontWeight={'bold'}>{messages['common.job_type']}</Body1>
            <Body2>{getServiceTypeName()}</Body2>
          </Box>
          <Box ml={3}>
            <Body1 fontWeight={'bold'}>{messages['common.published_on']}</Body1>
            <Body2>
              {job?.primary_job_information?.published_at
                ? getIntlDateFromString(
                    formatDate,
                    job?.primary_job_information?.published_at,
                  )
                : ''}
            </Body2>
          </Box>
        </Box>
      </Box>

      <TabContext value={value}>
        <Box className={classes.tabBox}>
          <TabList
            onChange={handleChange}
            aria-label='Dashboard Tabs'
            className={classes.tabList}>
            <Tab
              label={messages['common.applicants']}
              value={JobInterviewTabs.APPLICANTS}
            />
            <Tab
              label={messages['job_posting.preview']}
              value={JobInterviewTabs.JOB_PREVIEW}
            />
          </TabList>
        </Box>

        <TabPanel
          className={classes.tabPanel}
          value={JobInterviewTabs.APPLICANTS}>
          <InterviewManagementPage jobId={jobId} />
        </TabPanel>
        <TabPanel
          className={classes.tabPanel}
          value={JobInterviewTabs.JOB_PREVIEW}>
          <JobPreviewPage job={job} />
        </TabPanel>
      </TabContext>
    </StyledBox>
  );
};

export default CandidatesPage;

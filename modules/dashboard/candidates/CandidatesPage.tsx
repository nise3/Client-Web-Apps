import React, {useState} from 'react';
import {useIntl} from 'react-intl';
import {useRouter} from 'next/router';
import {Chip, Tab} from '@mui/material';
import {useFetchJobPreview} from '../../../services/IndustryManagement/hooks';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import {TabContext, TabList, TabPanel} from '@mui/lab';
import {JobInterviewTabs} from './JobInterviewTabs';
import {Body1, H4} from '../../../@softbd/elements/common';
import InterviewManagementPage from './InterviewManagementPage';
import JobPreviewPage from './JobPreviewPage';
import {getIntlDateFromString} from '../../../@softbd/utilities/helpers';

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

  return (
    <StyledBox>
      <Box>
        <H4>{job?.primary_job_information?.job_title}</H4>
        <Box display={'flex'}>
          <Box>
            <Body1>Job Status</Body1>
            <Chip label={'Expired'} />
          </Box>
          <Box ml={2}>
            <Body1>Job Type</Body1>
            Basic listing
          </Box>
          <Box ml={2}>
            <Body1>Published on</Body1>
            {job?.primary_job_information?.published_at
              ? getIntlDateFromString(
                  formatDate,
                  job?.primary_job_information?.published_at,
                )
              : ''}
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

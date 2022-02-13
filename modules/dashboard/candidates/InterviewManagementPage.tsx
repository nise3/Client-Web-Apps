import React, {useState} from 'react';
import {
  Avatar,
  Box,
  LinearProgress,
  linearProgressClasses,
  Typography,
} from '@mui/material';
import {styled} from '@mui/material/styles';
import {Body1, Body2, Caption, H5} from '../../../@softbd/elements/common';
import RecruitmentStepsViewSection from './RecruitmentStepsViewSection';
import Grid from '@mui/material/Grid';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import CallIcon from '@mui/icons-material/Call';
import {useIntl} from 'react-intl';
import {useFetchIndustryAssociationRecruitmentStepCandidateList} from '../../../services/IndustryManagement/hooks';
import ApproveButton from '../../../@softbd/elements/button/ApproveButton/ApproveButton';
import RejectButton from '../applicationManagement/RejectButton';

const PREFIX = 'InterviewManagementPage';

const classes = {
  cardHeader: `${PREFIX}-cardHeader`,
  age: `${PREFIX}-age`,
  approveButton: `${PREFIX}-approveButton`,
};

const StyledBox = styled(Box)(({theme}) => ({
  [`& .${classes.cardHeader}`]: {
    boxShadow: '0px 0px 5px 2px #e9e9e9',
    borderRadius: '5px',
    padding: '10px',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },
  [`& .${classes.age}`]: {
    border: '1px solid black',
    padding: '2px',
    borderRadius: '5px',
  },
  [`& .${classes.approveButton}`]: {
    color: theme.palette.primary.main,
  },
}));

const BorderLinearProgress = styled(LinearProgress)(({theme}) => ({
  height: 10,
  borderRadius: 5,
  width: '100%',
  marginRight: '10px',
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));

interface InterviewManagementPageProps {
  jobId: any;
}

const InterviewManagementPage = ({jobId}: InterviewManagementPageProps) => {
  const {messages} = useIntl();
  const [candidatesFilter] = useState({});
  const {data: candidateList} =
    useFetchIndustryAssociationRecruitmentStepCandidateList(
      jobId,
      candidatesFilter,
    );

  console.log('candidateList->', candidateList);

  const onRecruitmentStepChange = (filters: any) => {};

  return (
    <StyledBox>
      <RecruitmentStepsViewSection
        jobId={jobId}
        onClickStep={onRecruitmentStepChange}
      />

      <Body1>57 candidates </Body1>

      {[1, 2, 3].map((data: any) => (
        <Box className={classes.cardHeader} key={data}>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <Grid container>
                <Grid item xs={3}>
                  <Avatar
                    src={
                      'https://img.freepik.com/free-psd/metal-sign-logo-mockup_1389-1345.jpg'
                    }
                  />
                </Grid>
                <Grid item xs={9}>
                  <H5>
                    Super Man{' '}
                    <Caption className={classes.age}>Age: 28.5</Caption>
                  </H5>
                  <Body2 sx={{display: 'flex', justifyContent: 'flex-start'}}>
                    <FmdGoodIcon /> Daraus, Dhaka
                  </Body2>
                  <Body2>BUET</Body2>
                  <Body2>Bachelor of science(BSc)</Body2>
                  <Box display={'flex'} alignItems={'center'}>
                    <BorderLinearProgress variant='determinate' value={10} />
                    <Typography fontWeight={'bold'} color={'primary.main'}>
                      10%
                    </Typography>
                  </Box>
                  <Body2 sx={{display: 'flex', justifyContent: 'flex-start'}}>
                    <CallIcon /> 01918819191
                  </Body2>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={3}>
              <Box>
                <Body2 sx={{fontWeight: 'bold'}}>SoftBd Ltd.</Body2>
                <Caption>Software Engineer (2+ years)</Caption>
              </Box>
              <Box>
                <Body2 sx={{fontWeight: 'bold'}}>SoftBd Ltd.</Body2>
                <Caption>Software Engineer (2+ years)</Caption>
              </Box>
            </Grid>
            <Grid item xs={2}>
              <Box>
                <Body2>2+ years</Body2>
                <Body2>&#2547; 30,000</Body2>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <ApproveButton
                className={classes.approveButton}
                onClick={() => console.log('dfad')}
              />
              <RejectButton
                rejectAction={() => console.log('dfad')}
                rejectTitle={messages['common.delete_confirm'] as string}
              />
            </Grid>
          </Grid>
        </Box>
      ))}
    </StyledBox>
  );
};

export default InterviewManagementPage;

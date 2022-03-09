import React, {FC} from 'react';
import {Grid} from '@mui/material';
import {H2, H6} from '../../../@softbd/elements/common';
import {useIntl} from 'react-intl';

interface ResultProps {
  responseData: any;
}

const AssessmentResult: FC<ResultProps> = ({responseData}) => {
  const {messages} = useIntl();
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        {responseData && Object.keys(responseData).length ? (
          responseData?.result == 1 ? (
            <H2>Passed</H2>
          ) : (
            <H6>{messages['common.assessment_result_message']}</H6>
          )
        ) : (
          <></>
        )}
      </Grid>
    </Grid>
  );
};

export default AssessmentResult;

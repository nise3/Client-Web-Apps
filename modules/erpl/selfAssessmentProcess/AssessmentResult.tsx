import React, {FC} from 'react';
import {Button, Grid} from '@mui/material';
import {H2, H6, Link} from '../../../@softbd/elements/common';
import {useIntl} from 'react-intl';

interface ResultProps {
  responseData: any;
}

const AssessmentResult: FC<ResultProps> = ({responseData}) => {
  const {messages} = useIntl();
  console.log('response: ', responseData);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={12}>
        {responseData && Object.keys(responseData).length ? (
          responseData?.data?.result == 1 ? (
            <>
              <H2 centered={true}>{messages['common.passed_text']}</H2>
              <Grid container justifyContent={'center'}>
                <Link
                  passHref
                  href={
                    window.location.origin +
                    '/applications?assessment_id=' +
                    responseData?.data?.assessmentId
                  }>
                  <Button variant='outlined' color='primary' size={'small'}>
                    {messages['common.application']}
                  </Button>
                </Link>
              </Grid>
            </>
          ) : (
            <H6 centered={true}>
              {messages['common.assessment_result_message']}
            </H6>
          )
        ) : (
          <></>
        )}
      </Grid>
    </Grid>
  );
};

export default AssessmentResult;

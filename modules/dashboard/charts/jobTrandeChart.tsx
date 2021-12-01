import {Card, CardContent, Grid} from '@mui/material';
import React from 'react';
import {H3} from '../../../@softbd/elements/common';

// interface IStyledCardProps{
//   className: string,
//   headerNumber: number,
//   message: string
// }

const JobTrandsChart = () => {
  // const {formatNumber} = useIntl();
  return (
    <Card>
      <Grid container>
        <Grid item sm={9}>
          <H3 style={{fontSize: '1.4rem'}}>Job Trands</H3>
        </Grid>
        <Grid item sm={3}>
          select
          {/*<CustomFormSelect*/}
          {/*  id='year_id'*/}
          {/*  label={messages['course.label']}*/}
          {/*  isLoading={false}*/}
          {/*  control={control}*/}
          {/*  options={courses}*/}
          {/*  optionValueProp='id'*/}
          {/*  optionTitleProp={['title_en', 'title']}*/}
          {/*  errorInstance={errors}*/}
          {/*/>*/}
        </Grid>
      </Grid>
      <CardContent>
        chart
      </CardContent>
    </Card>
  );
};

export default JobTrandsChart;
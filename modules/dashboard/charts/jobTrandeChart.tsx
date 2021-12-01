import {Card, CardContent, Grid} from '@mui/material';
import React from 'react';
import {H3} from '../../../@softbd/elements/common';
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from 'recharts';

// interface IStyledCardProps{
//   className: string,
//   headerNumber: number,
//   message: string
// }

const JobTrandsChart = () => {
  // const {formatNumber} = useIntl();
  const data =[
    {name: 'Jan', design: 2500, salesman: 1700, mgt: 1000, servicing: 600, operating: 490, welding: 430 },
    {name: 'Feb', design: 1300, salesman: 1000, mgt: 1500, servicing: 2900, operating: 750, welding: 700 },
    {name: 'Mar', design: 950, salesman: 350, mgt: 3900, servicing: 2300, operating: 2800, welding: 900 },
    {name: 'Apr', design: 490, salesman: 2200, mgt: 1900, servicing: 2400, operating: 1900, welding: 250 },
    {name: 'May', design: 700, salesman: 1050, mgt: 3300, servicing: 2000, operating: 2200, welding: 200 },
    {name: 'Jun', design: 1800, salesman: 2105, mgt: 3320, servicing: 3500, operating: 2200, welding: 150 },
    {name: 'JUl', design: 2100, salesman: 850, mgt: 2400, servicing: 3700, operating: 1500, welding: 630 }
  ]


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
          <LineChart width={550} height={400} data={data}>
            <Line type="monotone" dataKey="design" stroke="#63FFE3" />
            <Line type="monotone" dataKey="salesman" stroke="#FF99C0" />
            <Line type="monotone" dataKey="mgt" stroke="#3CCF80" />
            <Line type="monotone" dataKey="servicing" stroke="#FFA93C" />
            <Line type="monotone" dataKey="operating" stroke="#A667F7" />
            <Line type="monotone" dataKey="welding" stroke="#62A9F9" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
          </LineChart>
      </CardContent>
    </Card>
  );
};

export default JobTrandsChart;
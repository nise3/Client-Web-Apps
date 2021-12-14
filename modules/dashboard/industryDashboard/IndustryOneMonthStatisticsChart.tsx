import React, {useEffect, useState} from 'react';
import {Card, CardContent, CardHeader, Grid} from '@mui/material';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {useIntl} from 'react-intl';
import CustomFilterableSelect from '../../youth/training/components/CustomFilterableSelect';
import {getMomentMonths} from '../../../@softbd/utilities/helpers';

const IndustryOneMonthStatisticsChart = () => {
  const {messages} = useIntl();
  const [months, setMonths] = useState<any>([]);

  useEffect(() => {
    const momentMonths = getMomentMonths();
    const months1: any = [];
    momentMonths.map((month: string, index) => {
      months1.push({
        id: index + 1,
        name: month,
      });
    });
    setMonths(months1);
  }, []);

  const data = [
    {
      name: '1st week',
      Unemployed: 0,
      Employed: 0,
      'Job Vacancy': 250,
      Recruitment: 120,
      'New Skilled People': 200,
    },
    {
      name: '2nd week',
      Unemployed: 100,
      Employed: 350,
      'Job Vacancy': 200,
      recruitment: 380,
      'New Skilled People': 250,
    },
    {
      name: '3rd week',
      Unemployed: 305,
      Employed: 450,
      'Job Vacancy': 96,
      recruitment: 340,
      'New Skilled People': 480,
    },
    {
      name: '4th week',
      Unemployed: 220,
      Employed: 150,
      'Job Vacancy': 300,
      recruitment: 360,
      'New Skilled People': 405,
    },
    {
      name: '5th week',
      Unemployed: 305,
      Employed: 105,
      'Job Vacancy': 175,
      recruitment: 205,
      'New Skilled People': 490,
    },
  ];

  return (
    <Card>
      <Grid container>
        <Grid item xs={6} md={6}>
          <CardHeader title={messages['dashboard.one_month_stat']} />
        </Grid>
        <Grid style={{padding: 20}} item xs={6} md={6}>
          <CustomFilterableSelect
            id='month'
            label={'Month'}
            isLoading={false}
            options={months}
            optionValueProp={'id'}
            optionTitleProp={['name']}
          />
        </Grid>
      </Grid>
      <CardContent>
        <ResponsiveContainer width={'100%'} height={270}>
          <LineChart width={600} height={270} data={data}>
            <CartesianGrid stroke='#ccc' strokeDasharray='5 5' />
            <XAxis dataKey='name' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type='monotone' dataKey='Unemployed' stroke='#F76767' />
            <Line type='monotone' dataKey='Employed' stroke='#62A9F9' />
            <Line type='monotone' dataKey='Job Vacancy' stroke='#53D0C0' />
            <Line type='monotone' dataKey='Recruitment' stroke='#FFA93C' />
            <Line
              type='monotone'
              dataKey='New Skilled People'
              stroke='#A667F7'
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default IndustryOneMonthStatisticsChart;

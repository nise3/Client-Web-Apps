import React from 'react';
import {Card, CardContent, CardHeader} from '@mui/material';
import {
  BarChart,
  Bar,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {useIntl} from 'react-intl';

const SectorBasedPeopleChart = () => {
  const {messages} = useIntl();

  const data = [
    {
      name: 'Engineer',
      Unemployed: 80,
      Employed: 150,
    },
    {
      name: 'Mechanic',
      Unemployed: 45,
      Employed: 85,
    },
    {
      name: 'Delivery Man',
      Unemployed: 90,
      Employed: 175,
    },
    {
      name: 'Driver',
      Unemployed: 200,
      Employed: 130,
    },
    {
      name: 'Salesman',
      Unemployed: 130,
      Employed: 90,
    },
    {
      name: 'Electrician',
      Unemployed: 65,
      Employed: 95,
    },
  ];

  return (
    <Card>
      <CardHeader title={messages['dashboard.sector_based_people']} />
      <CardContent>
        <ResponsiveContainer width={'100%'} height={270}>
          <BarChart width={600} height={250} data={data}>
            <CartesianGrid stroke='#ccc' strokeDasharray='5 5' />
            <XAxis dataKey='name' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey='Unemployed' fill='#A667F7' />
            <Bar dataKey='Employed' fill='#287CF9' />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default SectorBasedPeopleChart;

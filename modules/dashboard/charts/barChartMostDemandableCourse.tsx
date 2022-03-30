import {Card, CardContent, CardHeader, Typography} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {styled} from '@mui/material/styles';
import {Box} from '@mui/system';
import {useIntl} from 'react-intl';
import {useFetchDashboardMostDemandableCourse} from '../../../services/global/hooks';

const StyledBox = styled(Box)(({theme}) => ({
  [`& .MuiCardHeader-title`]: {
    fontSize: '1.4rem',
    color: '#000',
    fontWeight: 400,
  },
}));

const MostDemandableCourseChart = () => {
  const {messages} = useIntl();

  const barChartSize: number = 30;
  const barChartSpace: number = 20;
  const {data: dashData} = useFetchDashboardMostDemandableCourse();
  const [demandableCourse, setDemandableCourse] = useState<any>([]);

  const heightNumber: number = demandableCourse
    ? demandableCourse.length * (barChartSize + barChartSpace)
    : 0;

  useEffect(() => {
    if (dashData) {
      let courseData: any = [];
      dashData.map((data: any) => {
        if (data.name.length > 10) {
          data.yAxisName = data.name.substr(0, 10) + '...';
          courseData.push(data);
        } else {
          data.yAxisName = data.name;
          courseData.push(data);
        }
      });
      setDemandableCourse(courseData);
    }
  }, [dashData]);

  const CustomTooltip = ({payload, active}: any) => {
    if (active && payload && payload.length) {
      const {payload: data} = payload[0];
      return (
        <Card>
          <CardContent>
            <Typography>{`${data.name}`}</Typography>
            <Typography>Value: {`${data.value}`}</Typography>
          </CardContent>
        </Card>
      );
    }

    return null;
  };

  return (
    <StyledBox>
      <Card>
        <CardHeader title={messages['dashboard.MostDemandableCourse']} />
        <CardContent>
          <ResponsiveContainer
            width={'100%'}
            height={heightNumber == 0 ? 270 : heightNumber}>
            <BarChart
              width={420}
              height={heightNumber == 0 ? 250 : heightNumber - 30}
              barSize={barChartSize}
              data={demandableCourse}
              layout={'vertical'}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis type='number' />
              <YAxis width={100} type='category' dataKey='yAxisName' />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey='value' fill='#4B66F1' />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </StyledBox>
  );
};

export default MostDemandableCourseChart;

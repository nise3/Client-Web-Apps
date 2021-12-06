import {Card, CardContent, CardHeader} from '@mui/material';
import React from 'react';
import {Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis} from 'recharts';
import {styled} from '@mui/material/styles';
import {Box} from '@mui/system';
import {useIntl} from 'react-intl';
import {useDashboardMostDemandableCourse} from '../../../services/global/hooks';
import {useAuthUser} from '../../../@crema/utility/AppHooks';

const StyledContainer = styled(Box)(({theme}) => ({
  [`& .MuiCardHeader-title`]: {
    fontSize: '1.4rem',
    color: '#000',
    fontWeight: 400
  }
}));

const MostDemandableCourseChart = () => {
  const {messages} = useIntl();
  const authUser = useAuthUser();
  const {data: dashData} = useDashboardMostDemandableCourse(authUser?.isInstituteUser ? authUser?.institute_id as number : undefined);

  return (
    <StyledContainer>
      <Card>
        <CardHeader title={messages['dashboard.MostDemandableCourse']}/>
        <CardContent>
          <BarChart width={authUser?.isInstituteUser ? 500 : 750 } height={520} data={dashData} layout={ 'vertical'}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number"/>
            <YAxis type="category" dataKey="name"/>
            <Tooltip />
            <Bar dataKey="value" fill="#4B66F1" />
            </BarChart>
        </CardContent>
      </Card>
    </StyledContainer>
  );
};

export default MostDemandableCourseChart;


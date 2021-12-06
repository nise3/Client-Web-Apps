import {Card, CardContent, CardHeader} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis} from 'recharts';
import {styled} from '@mui/material/styles';
import {Box} from '@mui/system';
import {useIntl} from 'react-intl';
import {useDashboardMostDemandableCourse} from '../../../services/global/hooks';
import {useAuthUser} from '../../../@crema/utility/AppHooks';

const StyledContainer = styled(Box)(({theme}) => ({
  // marginRight: 10,
  [`& .MuiCardHeader-title`]: {
    fontSize: '1.4rem',
    color: '#000',
    fontWeight: 400
  }
}));

const MostDemandableCourseChart = () => {
  const {messages} = useIntl();
  const authUser = useAuthUser();
  const [dashDemandable, setDashDemandable] = useState<any>();
  let {data: dash_data} = useDashboardMostDemandableCourse(authUser?.isInstituteUser ? authUser?.institute_id as number : undefined);
  // const dta = useDashboardStatistics();
  // console.log(`useAuthUser`, authUser)
  // debugger
  useEffect(() => {
    // dash_data[0].value = 25;
    // dash_data[1].value = 50;
    // dash_data[2].value = 63;
    setDashDemandable(dash_data);
  }, [dash_data]);
  // const data = [
  //   {
  //     "name": "Welding",
  //     "value": 1200
  //   },
  //   {
  //     "name": "Computer Operating",
  //     "value": 1000
  //   },
  //   {
  //     "name": "Mobile Servicing",
  //     "value": 900
  //   },
  //   {
  //     "name": "Office Management",
  //     "value": 800
  //   },
  //   {
  //     "name": "Salesman",
  //     "value": 700
  //   },
  //   {
  //     "name": "Graphic Design",
  //     "value": 600
  //   }
  // ]
  return (
    <StyledContainer>
      <Card>
        <CardHeader title={messages['dashboard.MostDemandableCourse']}/>
        <CardContent>
          <BarChart width={750} height={520} data={dashDemandable} layout={ 'vertical'}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number"/>
            <YAxis type="category" dataKey="Name"/>
            <Tooltip />
            <Bar dataKey="value" fill="#4B66F1" />
            </BarChart>
        </CardContent>
      </Card>
    </StyledContainer>
  );
};

export default MostDemandableCourseChart;
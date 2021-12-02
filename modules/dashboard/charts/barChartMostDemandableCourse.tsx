import {Card, CardContent, CardHeader} from '@mui/material';
import React from 'react';
import {Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis} from 'recharts';
import {styled} from '@mui/material/styles';
import {Box} from '@mui/system';

const StyledContainer = styled(Box)(({theme}) => ({
  // marginRight: 10,
  [`& .MuiCardHeader-title`]: {
    fontSize: '1.4rem',
    color: '#000',
    fontWeight: 400
  }
}));

const MostDemandableCourseChart = () => {
  // const {formatNumber} = useIntl();
  const data = [
    {
      "name": "Welding",
      "value": 1200
    },
    {
      "name": "Computer Operating",
      "value": 1000
    },
    {
      "name": "Mobile Servicing",
      "value": 900
    },
    {
      "name": "Office Management",
      "value": 800
    },
    {
      "name": "Salesman",
      "value": 700
    },
    {
      "name": "Graphic Design",
      "value": 600
    }
  ]
  return (
    <StyledContainer>
      <Card>
        <CardHeader title={'Most Demandable Course'}/>
          {/*<H3 style={{fontSize: '1.4rem'}}>*/}
          {/*  Most Demandable Course*/}
          {/*</H3>*/}
        <CardContent>
          <BarChart width={750} height={525} data={data} layout={ 'vertical'}>
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
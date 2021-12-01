import {Card, CardContent, CardHeader, Container} from '@mui/material';
import React from 'react';
import {Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis} from 'recharts';
import {styled} from '@mui/material/styles';

const StyledContainer = styled(Container)(({theme}) => ({
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
      "uv": 1200
    },
    {
      "name": "Computer Operating",
      "uv": 1000
    },
    {
      "name": "Mobile Servicing",
      "uv": 900
    },
    {
      "name": "Office Management",
      "uv": 800
    },
    {
      "name": "Salesman",
      "uv": 700
    },
    {
      "name": "Graphic Design",
      "uv": 600
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
          <BarChart width={750} height={250} data={data} layout={ 'vertical'}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number"/>
            <YAxis type="category" dataKey="name"/>
            <Tooltip />
            <Bar dataKey="uv" fill="#4B66F1" />
          </BarChart>
        </CardContent>
      </Card>
    </StyledContainer>
  );
};

export default MostDemandableCourseChart;
import {Card, CardContent} from '@mui/material';
import React from 'react';
import { H3 } from '../../../@softbd/elements/common';

// interface IStyledCardProps{
//   className: string,
//   headerNumber: number,
//   message: string
// }

const MostDemandableCourseChart = () => {
  // const {formatNumber} = useIntl();
  return (
    <Card>
        <H3 style={{fontSize: '1.4rem'}}>
          Most Demandable Course
        </H3>
      <CardContent>
        chart
      </CardContent>
    </Card>
  );
};

export default MostDemandableCourseChart;
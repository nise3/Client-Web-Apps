import {Card, CardContent} from '@mui/material';
import React from 'react';
import { H3 } from '../../../@softbd/elements/common';

// interface IStyledCardProps{
//   className: string,
//   headerNumber: number,
//   message: string
// }

const JobTrandsChart = () => {
  // const {formatNumber} = useIntl();
  return (
    <Card>
      <H3 style={{fontSize: '1.4rem'}}>
        Job Trands
      </H3>
      <CardContent>
        chart
      </CardContent>
    </Card>
  );
};

export default JobTrandsChart;
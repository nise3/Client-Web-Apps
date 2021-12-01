import {Card, CardContent, CardHeader, Container} from '@mui/material';
import React from 'react';
import { H3 } from '../../../@softbd/elements/common';
import mapPath from '../../../public/images/map-districts.jpg';
import Image from 'next/image';
import {styled} from '@mui/material/styles';

const StyledContainer = styled(Container)(({theme}) => ({
  [`& .MuiCardHeader-title`]: {
    fontSize: '1.4rem',
    color: '#000',
    fontWeight: 400
  }
}));

const BangladeshMap = () => {
  // const {formatNumber} = useIntl();
  return (
    <StyledContainer>
      <Card>
        <CardHeader title={'Map'}/>
        {/*<H3 style={{fontSize: '1.4rem'}}>*/}
        {/*  Map*/}
        {/*</H3>*/}
        <CardContent>
          <Image src={mapPath} />
        </CardContent>
      </Card>
  </StyledContainer>
  )
};

export default BangladeshMap;
import {H3, Text} from '../elements/common';
import {Card} from '@mui/material';
import React from 'react';
import {useIntl} from 'react-intl';

interface IStyledCardProps{
  className: string,
  headerNumber: number,
  message: string
}

const StyledTile = (props: IStyledCardProps) => {
  const {messages, formatNumber} = useIntl();
  return (
  <Card className={props.className}>
    <H3 style={{fontSize: '2.5rem', fontWeight: '500'}}>
      {/*{props.headerNumber}*/}
      {formatNumber(props.headerNumber)}
    </H3>
    <Text style={{fontSize: '1.563rem'}}>
      { messages[props.message] }
    </Text>
  </Card>
  );
};

export default StyledTile;

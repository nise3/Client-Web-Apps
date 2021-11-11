import {Box, Card} from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import React from 'react';
import {CremaTheme} from '../../../../redux/types/AppContextPropsType';
import {createStyles, makeStyles} from '@mui/styles';

const PREFIX = 'CardItem';

const classes = {
  image: `${PREFIX}-image`
};

const StyledBox = styled(Box)((
  {
    theme: CremaTheme
  }
) => ({
  [`& .${classes.image}`]: {
    width: '100%',
    height: '200px',
  }
}));

const CardItem = (item: any, key: number) => {


  return (
    <StyledBox mr={6} key={key}>
      <Card>
        <Box>
          <Image
            className={classes.image}
            src={item.img}
            alt='crema-logo'
            height={50}
            width={'100%'}
            layout={'responsive'}
          />
        </Box>
      </Card>
    </StyledBox>
  );
};

export default CardItem;

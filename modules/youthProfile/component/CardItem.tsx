import {Box, Card} from '@material-ui/core';
import Image from 'next/image';
import React from 'react';
import {createStyles, makeStyles} from '@material-ui/core/styles';
import {CremaTheme} from '../../../types/AppContextPropsType';

const useStyles = makeStyles((theme: CremaTheme) =>
  createStyles({
    image: {
      width: '100%',
      height: '200px',
    },
  }),
);

const CardItem = (item: any, key: number) => {
  const classes = useStyles();

  return (
    <Box mr={6} key={key}>
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
    </Box>
  );
};

export default CardItem;

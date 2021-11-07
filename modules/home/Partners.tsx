import {Box, Card, Container, Grid} from '@mui/material';
import CustomCarousel from '../../@softbd/elements/display/CustomCarousel/CustomCarousel';
import {Theme} from '@mui/material/styles';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import {H3} from '../../@softbd/elements/common';
import {useIntl} from 'react-intl';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: '50px',
    },
    title: {
      color: '#682988',
      display: 'flex',
      alignItems: 'center',
    },
    vBar: {
      height: '33px',
      width: '2px',
      background: 'linear-gradient(45deg, #ec5c17,#5affab)',
      marginRight: '10px',
    },
    courseItem: {
      position: 'relative',
      boxShadow: '2px 8px 7px #ddd',
      border: '1px solid #ddd',
      display: 'flex',
      justifyContent: 'center',
    },
    image: {
      width: '100%',
    },
    timeDetails: {
      display: 'flex',
      alignItems: 'center',
    },
  }),
);

let items = [
  {
    img: '/images/partner1.png',
    title: 'partner1',
  },
  {
    img: '/images/partner2.png',
    title: 'partner2',
  },
  {
    img: '/images/partner1.png',
    title: 'partner3',
  },
  {
    img: '/images/partner2.png',
    title: 'partner4',
  },
];

const Partners = () => {
  const classes = useStyles();
  const {messages} = useIntl();
  const cardItem = (item: any, key: number) => {
    return (
      <Box mr={1} ml={1} key={key}>
        <Card className={classes.courseItem}>
          <Box>
            <img
              className={classes.image}
              src={item.img}
              alt={item.title}
              title={item.title}
            />
          </Box>
        </Card>
      </Box>
    );
  };
  return (
    <Grid container xl={12} className={classes.root}>
      <Container maxWidth='lg'>
        <H3 style={{fontSize: '33px', fontWeight: 'bold'}}>
          <Box
            style={{marginBottom: '50px', marginTop: '10px'}}
            className={classes.title}
            justifyContent={'center'}>
            <Box className={classes.vBar} />
            <Box fontWeight='fontWeightBold'>{messages['nise.partners']}</Box>
          </Box>
        </H3>
        <Box mb={2}>
          <CustomCarousel>
            {items.map((item: any, key: number) => cardItem(item, key))}
          </CustomCarousel>
        </Box>
      </Container>
    </Grid>
  );
};

export default Partners;

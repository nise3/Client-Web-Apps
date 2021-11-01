import {Box, Card, Container, Grid, Typography} from '@mui/material';
import CustomCarousel from '../../@softbd/elements/display/CustomCarousel/CustomCarousel';
import {Theme} from '@mui/material/styles';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';

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
      height: '40px',
      width: '5px',
      background: 'linear-gradient(45deg, #ec5c17,#5affab)',
      marginRight: '10px',
    },
    courseItem: {
      position: 'relative',
      boxShadow: '2px 8px 7px #ddd',
      border: '1px solid #ddd',
    },
    image: {
      width: '100%',
      height: '100px',
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
  },
  {
    img: '/images/partner2.png',
  },
  {
    img: '/images/partner1.png',
  },
  {
    img: '/images/partner2.png',
  },
];

const Partners = () => {
  const classes = useStyles();
  const cardItem = (item: any, key: number) => {
    return (
      <Box mr={1} ml={1} key={key}>
        <Card className={classes.courseItem}>
          <Box>
            <img className={classes.image} src={item.img} alt='crema-logo' />
          </Box>
        </Card>
      </Box>
    );
  };
  return (
    <Grid container xl={12} className={classes.root}>
      <Container maxWidth='lg'>
        <Typography variant='h5'>
          <Box
            style={{marginBottom: '50px', marginTop: '10px'}}
            className={classes.title}
            justifyContent={'center'}>
            <Box className={classes.vBar} />
            <Box fontWeight='fontWeightBold'>পার্টনার সমূহ</Box>
          </Box>
        </Typography>
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

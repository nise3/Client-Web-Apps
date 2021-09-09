import {Box, Card, Container} from '@material-ui/core';
import CustomCarousel from '../../@softbd/elements/display/CustomCarousel/CustomCarousel';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import React from 'react';
import SectionTitle from './SectionTitle';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: '50px',
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
  const cardItem = (item: any) => {
    return (
      <Box mr={10}>
        <Card className={classes.courseItem}>
          <Box>
            <img className={classes.image} src={item.img} alt='crema-logo' />
          </Box>
        </Card>
      </Box>
    );
  };
  return (
    <Container maxWidth='md' disableGutters className={classes.root}>
      <SectionTitle title='পার্টনার সমূহ' center={true}></SectionTitle>
      <Box mb={2}>
        <CustomCarousel>
          {items.map((item: any) => cardItem(item))}
        </CustomCarousel>
      </Box>
    </Container>
  );
};

export default Partners;

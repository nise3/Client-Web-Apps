import {Box, Card, Container, Grid} from '@mui/material';
import {styled} from '@mui/material/styles';
import CustomCarousel from '../../@softbd/elements/display/CustomCarousel/CustomCarousel';
import React from 'react';
import {H3} from '../../@softbd/elements/common';
import {useIntl} from 'react-intl';

const PREFIX = 'Partners';

const classes = {
  title: `${PREFIX}-title`,
  vBar: `${PREFIX}-vBar`,
  courseItem: `${PREFIX}-courseItem`,
  image: `${PREFIX}-image`,
};

const StyledGrid = styled(Grid)(({theme}) => ({
  marginTop: '50px',

  [`& .${classes.title}`]: {
    color: theme.palette.primary.main,
    display: 'flex',
    alignItems: 'center',
  },

  [`& .${classes.vBar}`]: {
    height: '33px',
    width: '2px',
    background: 'linear-gradient(45deg, #ec5c17,#5affab)',
    marginRight: '10px',
  },

  [`& .${classes.courseItem}`]: {
    position: 'relative',
    /*boxShadow: '2px 8px 7px #ddd',*/
    /*border: '1px solid #ddd',*/
    display: 'flex',
    justifyContent: 'center',
  },

  [`& .${classes.image}`]: {
    width: '100%',
  },
}));

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
    <StyledGrid container xl={12}>
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
    </StyledGrid>
  );
};

export default Partners;

import {Box, Card, Container, Grid} from '@mui/material';
import {styled} from '@mui/material/styles';
import CustomCarousel from '../../@softbd/elements/display/CustomCarousel/CustomCarousel';
import React, {useState} from 'react';
import {H2, H6} from '../../@softbd/elements/common';
import {useIntl} from 'react-intl';
import {useFetchPublicPartners} from '../../services/cmsManagement/hooks';
import VerticalBar from './components/VerticalBar';

const PREFIX = 'Partners';

const classes = {
  title: `${PREFIX}-title`,
  vBar: `${PREFIX}-vBar`,
  cardItem: `${PREFIX}-courseItem`,
  image: `${PREFIX}-image`,
  imageAlt: `${PREFIX}-imageAlt`,
};

const StyledGrid = styled(Grid)(({theme}) => ({
  marginTop: '50px',

  [`& .${classes.title}`]: {
    color: theme.palette.primary.main,
    display: 'flex',
    alignItems: 'center',
  },

  [`& .${classes.cardItem}`]: {
    position: 'relative',
    /*boxShadow: '2px 8px 7px #ddd',*/
    /*border: '1px solid #ddd',*/
    display: 'flex',
    justifyContent: 'center',
    height: '135px',
  },

  [`& .${classes.image}`]: {
    width: '100%',
    height: '100%',
  },
  [`& .${classes.imageAlt}`]: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  '& .react-multi-carousel-list': {
    padding: '20px 0px',
  },
}));

const Partners = () => {
  const {messages} = useIntl();
  const [partnerFilters] = useState({});
  const {data: partners} = useFetchPublicPartners(partnerFilters);
  const cardItem = (partner: any, key: number) => {
    return (
      <Box mr={1} ml={1} key={key}>
        <Card className={classes.cardItem}>
          <Box className={classes.imageAlt}>
            <img
              className={classes.image}
              src={
                partner?.main_image_path
                  ? partner?.main_image_path
                  : '/images/blank_image.png'
              }
              alt={partner?.image_alt_title}
              title={partner?.title}
            />
          </Box>
        </Card>
      </Box>
    );
  };
  return (
    <StyledGrid container xl={12}>
      <Container maxWidth='lg'>
        <Box
          style={{marginBottom: '50px', marginTop: '10px'}}
          className={classes.title}
          justifyContent={'center'}>
          <VerticalBar />
          <H2 style={{fontSize: '2.063rem', fontWeight: 'bold'}}>
            {messages['nise.partners']}
          </H2>
        </Box>
        <Box mb={2}>
          {partners && partners.length > 0 ? (
            <CustomCarousel>
              {partners.map((partner: any, key: number) =>
                cardItem(partner, key),
              )}
            </CustomCarousel>
          ) : (
            <H6 style={{textAlign: 'center'}}>
              {messages['common.no_data_found']}
            </H6>
          )}
        </Box>
      </Container>
    </StyledGrid>
  );
};

export default Partners;

import React from 'react';
import {styled} from '@mui/material/styles';
import {Card, Container, Grid} from '@mui/material';
import {Fade} from 'react-awesome-reveal';
import {H3, Text} from '../../@softbd/elements/common';
import {useIntl} from 'react-intl';

const PREFIX = 'InfoCardSection';

const classes = {
  youthBoxItem: `${PREFIX}-youthBoxItem`,
  skillBoxItem: `${PREFIX}-skillBoxItem`,
  industryBoxItem: `${PREFIX}-industryBoxItem`,
};

const StyledFade = styled(Fade)(({theme}) => ({
  [`& .${classes.youthBoxItem}`]: {
    background: '#1B69BC',
    textAlign: 'center',
    padding: theme.spacing(3),
    color: '#fff',
    '& h3': {
      marginTop: '30px !important',
      marginBottom: '10px !important',
      fontSize: '28px !important',
      fontWeight: '600 !important',
    },
    '& p': {
      fontSize: '16px !important',
      lineHeight: '22px',
    },
  },

  [`& .${classes.skillBoxItem}`]: {
    background: '#682988',
    textAlign: 'center',
    padding: theme.spacing(3),
    color: '#fff',
    '& h3': {
      marginTop: '30px !important',
      marginBottom: '10px !important',
      fontSize: '28px !important',
      fontWeight: '600 !important',
    },
    '& p': {
      fontSize: '16px !important',
      lineHeight: '22px',
    },
  },

  [`& .${classes.industryBoxItem}`]: {
    background: '#E77F38',
    textAlign: 'center',
    padding: theme.spacing(3),
    color: '#fff',
    '& h3': {
      marginTop: '30px !important',
      marginBottom: '10px !important',
      fontSize: '28px !important',
      fontWeight: '600 !important',
    },
    '& p': {
      fontSize: '16px !important',
      lineHeight: '22px',
    },
  },
}));

const InfoCardSection = () => {
  const {messages} = useIntl();

  return (
    <StyledFade direction='up'>
      <Container maxWidth='lg'>
        <Grid
          container
          spacing={4}
          mb={{xs: 2, md: 5}}
          sx={{marginTop: '115px'}}>
          <Grid item xs={12} md={4}>
            <Card className={classes.youthBoxItem}>
              <img src={'/images/home-page/man-n-woman.png'} />
              <H3>{messages['common.youth_2']}</H3>
              <Text>{messages['nise.card_youth']}</Text>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card className={classes.skillBoxItem}>
              <img src={'/images/home-page/training.png'} />
              <H3>{messages['common.skill_develop']}</H3>
              <Text> {messages['nise.card_youth']}</Text>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card className={classes.industryBoxItem}>
              <img src={'/images/home-page/industry.png'} />
              <H3>{messages['common.industrial']}</H3>
              <Text>{messages['nise.card_youth']}</Text>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </StyledFade>
  );
};
export default InfoCardSection;

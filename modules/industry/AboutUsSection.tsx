import {styled} from '@mui/material/styles';
import {Button, CardMedia, Container, Grid} from '@mui/material';
import {useIntl} from 'react-intl';
import {Body1, H3} from '../../@softbd/elements/common';
import React from 'react';
import {ArrowRightAlt} from '@mui/icons-material';
import UnderlinedHeading from '../institute/UnderlinedHeading';

const PREFIX = 'AboutUsSection';

const classes = {
  youtubePlayer: `${PREFIX}-youtubePlayer`,
  header: `${PREFIX}-header`,
};

const StyledContainer = styled(Container)(({theme}) => ({
  [`& .${classes.youtubePlayer}`]: {
    width: '100%',
    height: '253px',
  },

  [`& .${classes.header}`]: {
    color: theme.palette.primary.main,
  },
}));

const AboutUsSection = () => {
  const {messages} = useIntl();
  return (
    <StyledContainer maxWidth='lg' sx={{marginTop: '50px'}}>
      <UnderlinedHeading color='black'>
        {messages['footer.about_us']}
      </UnderlinedHeading>

      <Grid container spacing={4}>
        <Grid item md={6} xs={12}>
          <CardMedia
            component='img'
            height='253'
            image={'/images/industry-about-us/demo_purpouse.png'}
            alt={'alt'}
            title={'title'}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <H3 fontWeight={'bold'} className={classes.header}>
            {messages['footer.about_us']}
          </H3>
          <Body1>
            বেসিস সদস্য কোম্পানিগুলোর উচ্চাকাঙ্ক্ষা, সক্ষমতা এবং টেকসই প্রবৃদ্ধি
            বিকাশ করা এবং ওয়ান বাংলাদেশ-এ বেসিস অবদানকে নেতৃত্ব দেওয়া ও প্রদান
            করা।
          </Body1>
          <Button
            sx={{borderRadius: '10px', marginTop: '2rem'}}
            variant='outlined'
            color='primary'
            endIcon={<ArrowRightAlt />}>
            {messages['common.see_more']}
          </Button>
        </Grid>
        <Grid item md={6} xs={12}>
          <H3 fontWeight={'bold'} className={classes.header}>
            {messages['industry.purpose_and_goal']}
          </H3>
          <Body1>
            বেসিস সদস্য কোম্পানিগুলোর উচ্চাকাঙ্ক্ষা, সক্ষমতা এবং টেকসই প্রবৃদ্ধি
            বিকাশ করা এবং ওয়ান বাংলাদেশ-এ বেসিস অবদানকে নেতৃত্ব দেওয়া ও প্রদান
            করা।
          </Body1>
          <Button
            sx={{borderRadius: '10px', marginTop: '2rem'}}
            variant='outlined'
            color='primary'
            endIcon={<ArrowRightAlt />}>
            {messages['common.see_more']}
          </Button>
        </Grid>
        <Grid item md={6} xs={12}>
          <iframe
            className={classes.youtubePlayer}
            src={'https://www.youtube.com/embed/I7sVDcJ8YF4'}
            frameBorder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            allowFullScreen
            title='Embedded youtube'
          />
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default AboutUsSection;

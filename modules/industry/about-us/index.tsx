import {CardMedia, Container, Grid} from '@mui/material';
import {Body1, H1, H2} from '../../../@softbd/elements/common';
import React from 'react';
import {useIntl} from 'react-intl';
import {styled} from '@mui/material/styles';
import {useCustomStyle} from '../../../@softbd/hooks/useCustomStyle';

const PREFIX = 'AboutUs';

const classes = {
  youtubePlayer: `${PREFIX}-youtubePlayer`,
};

const StyledContainer = styled(Container)(({theme}) => ({
  [`& .${classes.youtubePlayer}`]: {
    width: '100%',
    height: '253px',
  },
}));

const AboutUs = () => {
  const {messages} = useIntl();
  const result = useCustomStyle();

  return (
    <StyledContainer maxWidth='lg' sx={{marginTop: '20px'}}>
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <H1
            py={3}
            sx={{
              ...result.h2,
              fontWeight: 'bold',
            }}>
            {messages['footer.about_us']}
          </H1>
          <Body1>
            বেসিস সদস্য কোম্পানিগুলোর উচ্চাকাঙ্ক্ষা, সক্ষমতা এবং টেকসই প্রবৃদ্ধি
            বিকাশ করা এবং ওয়ান বাংলাদেশ-এ বেসিস অবদানকে নেতৃত্ব দেওয়া ও প্রদান
            করা।
          </Body1>
        </Grid>
        <Grid item xs={6}>
          <iframe
            className={classes.youtubePlayer}
            src={'https://www.youtube.com/embed/I7sVDcJ8YF4'}
            frameBorder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            allowFullScreen
            title='Embedded youtube'
          />
        </Grid>
        <Grid item xs={6}>
          <CardMedia
            component='img'
            height='253'
            image={'/images/industry-about-us/demo_purpouse.png'}
            alt={'alt'}
            title={'title'}
          />
        </Grid>
        <Grid item xs={6}>
          <H2 py={3} fontWeight={'bold'}>
            {messages['common.purpose']}
          </H2>
          <Body1>
            বেসিস সদস্য কোম্পানিগুলোর উচ্চাকাঙ্ক্ষা, সক্ষমতা এবং টেকসই প্রবৃদ্ধি
            বিকাশ করা এবং ওয়ান বাংলাদেশ-এ বেসিস অবদানকে নেতৃত্ব দেওয়া ও প্রদান
            করা।
          </Body1>
        </Grid>
        <Grid item xs={6}>
          <H2 py={3} fontWeight={'bold'}>
            {messages['common.goal']}
          </H2>
          <Body1>
            বেসিস সদস্য কোম্পানিগুলোর উচ্চাকাঙ্ক্ষা, সক্ষমতা এবং টেকসই প্রবৃদ্ধি
            বিকাশ করা এবং ওয়ান বাংলাদেশ-এ বেসিস অবদানকে নেতৃত্ব দেওয়া ও প্রদান
            করা।
          </Body1>
        </Grid>
        <Grid item xs={6}>
          <CardMedia
            component='img'
            height='253'
            image={'/images/industry-about-us/demo_goal.png'}
            alt={'alt'}
            title={'title'}
          />
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default AboutUs;

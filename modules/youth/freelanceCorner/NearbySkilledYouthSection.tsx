import React from 'react';
import {useIntl} from 'react-intl';
import {
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import {ChevronRight} from '@mui/icons-material';
import {makeStyles} from '@mui/styles';
import {CremaTheme} from '../../../types/AppContextPropsType';
import NearbyFreelancerComponent from './components/NearbyFreelancerComponent';

const useStyle = makeStyles((theme: CremaTheme) => ({
  nearbyYouthSectionRoot: {},
  divider: {
    width: '100%',
    height: 1,
    marginBottom: 5,
  },
  seeMoreButton: {
    boxShadow: 'none',
    marginTop: 10,
  },
  selectControl: {
    marginLeft: 20,
    marginBottom: 10,
  },
}));

const NearbySkilledYouthSection = () => {
  const classes = useStyle();
  const {messages} = useIntl();

  const users = [
    {
      image: '/images/userPageImages/profileImage.jpeg',
      name: 'Jamal khan',
      designation: 'Graphic Designer',
    },
    {
      image: '/images/userPageImages/profileImage.jpeg',
      name: 'Noman khan',
      designation: 'UX Designer',
    },
    {
      image: '/images/userPageImages/profileImage.jpeg',
      name: 'Jesmin Rahman',
      designation: 'Graphic Designer',
    },
    {
      image: '/images/userPageImages/profileImage.jpeg',
      name: 'Imtiaz Ahmed',
      designation: 'UI Designer',
    },
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant={'h5'} sx={{marginBottom: 3, fontWeight: 'bold'}}>
          {messages['freelance_corner.nearby_skilled_youth']}
        </Typography>
        <Grid container className={classes.nearbyYouthSectionRoot}>
          {users.map((user: any, index: number) => {
            return (
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                key={index}
                sx={{marginBottom: 3}}>
                {index != 0 && <Divider className={classes.divider} />}
                <NearbyFreelancerComponent freelanceUser={user} />
              </Grid>
            );
          })}
          <Grid item xs={12} sm={12} md={12} style={{paddingLeft: 15}}>
            <Button
              variant={'text'}
              color={'primary'}
              size={'medium'}
              className={classes.seeMoreButton}>
              {messages['freelance_corner.see_more']}
              <ChevronRight color={'primary'} />
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default NearbySkilledYouthSection;

import React from 'react';
import {Button, Grid, Typography} from '@mui/material';
import {ChevronRight} from '@mui/icons-material';
import useStyles from './index.style';
import TrainingCenterCardComponent from './conponents/TrainingCenterCardComponent';
import {useIntl} from 'react-intl';

const NearbyTrainingCenterSection = () => {
  const classes = useStyles();
  const {messages} = useIntl();

  const trainingCenterList = [
    {
      id: 1,
      image: '/images/popular-course1.png',
      name: 'Creative IT Institute',
      logo: '/images/creative_it.jpeg',
      address: '9 NO, Kapasgola Road, Chawk Bazar Telpotti More, Chattogram',
      tags: [
        'Graphic Design',
        'Web Design',
        'UX',
        'Motion Graphic',
        'Programming',
      ],
    },
    {
      id: 2,
      image: '/images/popular-course1.png',
      name: 'Creative IT Institute',
      logo: '/images/creative_it.jpeg',
      address: '9 NO, Kapasgola Road, Chawk Bazar Telpotti More, Chattogram',
      tags: [
        'Graphic Design',
        'Web Design',
        'UX',
        'Motion Graphic',
        'Programming',
      ],
    },
    {
      id: 3,
      image: '/images/popular-course1.png',
      name: 'Creative IT Institute',
      logo: '/images/creative_it.jpeg',
      address: '9 NO, Kapasgola Road, Chawk Bazar Telpotti More, Chattogram',
      tags: [
        'Graphic Design',
        'Web Design',
        'UX',
        'Motion Graphic',
        'Programming',
      ],
    },
    {
      id: 4,
      image: '/images/popular-course1.png',
      name: 'Creative IT Institute',
      logo: '/images/creative_it.jpeg',
      address: '9 NO, Kapasgola Road, Chawk Bazar Telpotti More, Chattogram',
      tags: [
        'Graphic Design',
        'Web Design',
        'UX',
        'Motion Graphic',
        'Programming',
      ],
    },
  ];

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={12}>
        <Grid container alignItems={'center'}>
          <Grid item xs={8} sm={9} md={10}>
            <Typography variant={'h5'} className={classes.sectionTitle}>
              {messages['common.nearby_training_center']}
            </Typography>
          </Grid>
          <Grid item xs={4} sm={3} md={2} style={{textAlign: 'right'}}>
            <Button variant={'outlined'} size={'medium'} color={'primary'}>
              {messages['common.see_all']}
              <ChevronRight />
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <Grid container spacing={2}>
          {trainingCenterList.map((trainingCenter: any) => {
            return (
              <Grid item xs={12} sm={6} md={3} key={trainingCenter.id}>
                <TrainingCenterCardComponent trainingCenter={trainingCenter} />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default NearbyTrainingCenterSection;

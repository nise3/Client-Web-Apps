import {Avatar, Card, CardContent, Grid, Typography} from '@mui/material';
import React from 'react';

interface TrainingCenterCardProps {
  trainingCenter: any;
}

const TrainingCenterCard = ({trainingCenter}: TrainingCenterCardProps) => {
  return (
    <Card sx={{height: '100%'}}>
      <CardContent>
        <Grid container sx={{alignItems: 'center', flexDirection: 'column'}}>
          <Grid item xs={12}>
            <Avatar
              alt={trainingCenter.institute_title}
              variant='square'
              src={'http://lorempixel.com/300/200?id=' + trainingCenter?.id}
              sx={{
                width: 110,
                height: 110,
                '>img': {height: 'auto'},
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography mt={4} variant={'h5'}>
              {trainingCenter.title}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TrainingCenterCard;

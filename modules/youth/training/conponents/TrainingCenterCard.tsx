import {Avatar, Card, CardContent, Grid, Typography} from '@mui/material';
import React from 'react';

interface TrainingCenterCardProps {
  trainingCenter: any;
}

const TrainingCenterCard = ({trainingCenter}: TrainingCenterCardProps) => {
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 300,
      }}>
      <CardContent>
        <Grid container>
          <Grid
            item
            xs={12}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Avatar
              alt={'logo'}
              //src={trainingCenter.logo}
              src={'http://lorempixel.com/400/200?id=' + trainingCenter?.id}
              sx={{width: 70, height: 70}}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography mt={4} sx={{textAlign: 'center'}} variant={'h4'}>
              {trainingCenter.title}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TrainingCenterCard;

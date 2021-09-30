import React, {FC} from 'react';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from '@material-ui/core';
import useStyles from '../index.style';

interface TrainingCenterCardComponentProps {
  trainingCenter: any;
}

const TrainingCenterCardComponent: FC<TrainingCenterCardComponentProps> = ({
  trainingCenter,
}) => {
  const classes = useStyles();
  return (
    <Card className={classes.trainingCardRoot}>
      <CardMedia
        className={classes.trainingCardImage}
        image={trainingCenter.image}
        title={trainingCenter.name}
      />
      <CardContent>
        <Avatar
          className={classes.providerLogo}
          alt={trainingCenter.name}
          src={trainingCenter.logo}
        />
        <Box fontWeight={'bold'} marginTop={'20px'}>
          {trainingCenter.name}
        </Box>
        <Box marginTop={'5px'}>
          <Typography variant={'caption'} className={classes.addressTextStyle}>
            Address:
          </Typography>
          {trainingCenter.address}
        </Box>

        <Box className={classes.tagBox}>
          {(trainingCenter.tags || []).map((tag: any, index: any) => {
            return <Chip className='tag' label={tag} key={index} />;
          })}
        </Box>
      </CardContent>
    </Card>
  );
};

export default TrainingCenterCardComponent;

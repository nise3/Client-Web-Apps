import React, {FC} from 'react';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from '@material-ui/core';
import useStyles from '../index.style';

interface CourseCardComponentProps {
  course: any;
}

const CourseCardComponent: FC<CourseCardComponentProps> = ({course}) => {
  const classes = useStyles();
  return (
    <Card className={classes.courseCardRoot}>
      <CardMedia
        className={classes.courseCardImage}
        image='/images/popular-course1.png'
        title='Contemplative Reptile'
      />
      <CardContent>
        <Typography gutterBottom variant='h5' component='h2'>
          Lizard
        </Typography>
        <Typography variant='body2' color='textSecondary' component='p'>
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Chip label={'test'} />
      </CardActions>
    </Card>
  );
};

export default CourseCardComponent;

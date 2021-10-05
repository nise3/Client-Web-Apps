import React, {FC} from 'react';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import useStyles from '../index.style';
import TagChip from '../../../@softbd/elements/display/TagChip';
import {useIntl} from 'react-intl';

interface TrainingCenterCardComponentProps {
  trainingCenter: any;
}

const TrainingCenterCardComponent: FC<TrainingCenterCardComponentProps> = ({
  trainingCenter,
}) => {
  const classes = useStyles();
  const {messages} = useIntl();

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
            {messages['common.address']}:
          </Typography>
          {trainingCenter.address}
        </Box>

        <Box className={classes.tagBox}>
          {(trainingCenter.tags || []).map((tag: any, index: any) => {
            return <TagChip label={tag} key={index} />;
          })}
        </Box>
      </CardContent>
    </Card>
  );
};

export default TrainingCenterCardComponent;

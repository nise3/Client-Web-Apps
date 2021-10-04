import React, {FC} from 'react';
import {Avatar, Box, Card, Chip, Grid} from '@mui/material';
import {makeStyles} from '@mui/styles';
import {CremaTheme} from '../../../types/AppContextPropsType';
import {Fonts} from '../../../shared/constants/AppEnums';
import {useIntl} from 'react-intl';

const useStyle = makeStyles((theme: CremaTheme) => ({
  featureJobRoot: {
    background: '#fff',
    borderRadius: 4,
    position: 'relative',
    padding: '10px 5px',
  },
  jobProviderImage: {
    marginLeft: 10,
    border: '1px solid ' + theme.palette.grey['300'],
  },
  tagStyle: {
    color: '#fca67e',
    position: 'absolute',
    top: 10,
    right: 10,
    borderRadius: 4,
    height: 25,
    background: '#fff2ed',
    borderColor: '#fdab85',
    '& .MuiChip-label': {
      padding: '0px 5px',
    },
  },
  jobTitle: {
    color: theme.palette.primary.main,
    fontWeight: Fonts.BOLD,
  },
}));

interface FeatureJobProps {
  data: {
    imageUrl: string;
    jobTitle: string;
    jobProviderName: string;
  };
}

const FeatureJobComponent: FC<FeatureJobProps> = ({data}) => {
  const classes = useStyle();
  const {messages} = useIntl();

  return (
    <>
      <Card className={classes.featureJobRoot}>
        <Grid container spacing={1} alignItems={'center'}>
          <Grid item xs={2} sm={2} md={2}>
            <Avatar
              className={classes.jobProviderImage}
              alt='provider image'
              src={data.imageUrl}
            />
          </Grid>
          <Grid item xs={8} sm={8} md={8}>
            <Box className={classes.jobTitle}>{data.jobTitle}</Box>
            <Box>{data.jobProviderName}</Box>
          </Grid>
          <Chip
            variant='outlined'
            label={messages['youth_feed.featured']}
            className={classes.tagStyle}
          />
        </Grid>
      </Card>
    </>
  );
};

export default FeatureJobComponent;

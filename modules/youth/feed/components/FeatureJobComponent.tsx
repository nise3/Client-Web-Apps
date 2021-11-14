import React, {FC} from 'react';
import {styled} from '@mui/material/styles';
import {Avatar, Box, Card, Chip, Grid} from '@mui/material';
import {Fonts} from '../../../../shared/constants/AppEnums';
import {useIntl} from 'react-intl';

const PREFIX = 'FeatureJobComponent';

const classes = {
  jobProviderImage: `${PREFIX}-jobProviderImage`,
  tagStyle: `${PREFIX}-tagStyle`,
  jobTitle: `${PREFIX}-jobTitle`,
};

const StyledCard = styled(Card)(({theme}) => ({
  background: '#fff',
  borderRadius: 4,
  position: 'relative',
  padding: '10px 5px',

  [`& .${classes.jobProviderImage}`]: {
    marginLeft: 6,
    border: '1px solid ' + theme.palette.grey['300'],
  },

  [`& .${classes.tagStyle}`]: {
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

  [`& .${classes.jobTitle}`]: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
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
  const {messages} = useIntl();

  return (
    <StyledCard>
      <Grid container spacing={2} alignItems={'center'}>
        <Grid item xs={2} mr={1}>
          <Avatar
            className={classes.jobProviderImage}
            alt='provider image'
            src={data.imageUrl}
          />
        </Grid>
        <Grid item xs={6}>
          <Box className={classes.jobTitle} title={data.jobTitle}>
            {data.jobTitle}
          </Box>
          <Box>{data.jobProviderName}</Box>
        </Grid>
        <Grid item>
          <Chip
            variant='outlined'
            label={messages['common.featured']}
            className={classes.tagStyle}
          />
        </Grid>
      </Grid>
    </StyledCard>
  );
};

export default FeatureJobComponent;

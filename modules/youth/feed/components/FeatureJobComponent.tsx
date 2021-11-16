import React, {FC} from 'react';
import {styled} from '@mui/material/styles';
import {Avatar, Box, Card, Grid} from '@mui/material';
import {Fonts} from '../../../../shared/constants/AppEnums';
import {Star} from '@mui/icons-material';

const PREFIX = 'FeatureJobComponent';

const classes = {
  jobProviderImage: `${PREFIX}-jobProviderImage`,
  tagStyle: `${PREFIX}-tagStyle`,
  jobTitle: `${PREFIX}-jobTitle`,
  starStyle: `${PREFIX}-starStyle`,
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
    color: theme.palette.warning.main,
    position: 'absolute',
    top: 14,
    right: 9,
    borderRadius: '50%',
    height: 21,
    width: 21,
    background: '#FEF0EA',
    '& .MuiChip-label': {
      padding: '0px 5px',
    },
  },

  [`& .${classes.starStyle}`]: {
    height: '13px',
    width: '13px',
    position: 'absolute',
    top: 4,
    left: 4,
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
          {/*<Chip
            variant='outlined'
            label={messages['common.featured']}
            className={classes.tagStyle}

          />*/}
          <div className={classes.tagStyle}>
            <Star className={classes.starStyle} />
          </div>
        </Grid>
      </Grid>
    </StyledCard>
  );
};

export default FeatureJobComponent;

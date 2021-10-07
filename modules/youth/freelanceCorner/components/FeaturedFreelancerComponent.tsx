import React, {FC} from 'react';
import {useIntl} from 'react-intl';
import {Avatar, Box, Card, Chip, Grid} from '@mui/material';
import {makeStyles} from '@mui/styles';
import {CremaTheme} from '../../../../types/AppContextPropsType';
import {Fonts} from '../../../../shared/constants/AppEnums';

const useStyle = makeStyles((theme: CremaTheme) => ({
  featureFreelancerRoot: {
    background: '#fff',
    borderRadius: 4,
    position: 'relative',
    padding: '10px 5px',
  },
  freelanceUserImage: {
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
  freelancerNameStyle: {
    color: theme.palette.primary.main,
    fontWeight: Fonts.BOLD,
  },
}));

interface FeaturedFreelancerComponentProps {
  freelanceUser: {
    image: string;
    name: string;
    designation: string;
  };
}

const FeaturedFreelancerComponent: FC<FeaturedFreelancerComponentProps> = ({
  freelanceUser,
}) => {
  const classes = useStyle();
  const {messages} = useIntl();

  return (
    <>
      <Card className={classes.featureFreelancerRoot}>
        <Grid container spacing={1} alignItems={'center'}>
          <Grid item xs={2} sm={2} md={2}>
            <Avatar
              className={classes.freelanceUserImage}
              alt='user image'
              src={freelanceUser.image}
            />
          </Grid>
          <Grid item xs={8} sm={8} md={8}>
            <Box className={classes.freelancerNameStyle}>
              {freelanceUser.name}
            </Box>
            <Box>{freelanceUser.designation}</Box>
          </Grid>
          <Chip
            variant='outlined'
            label={messages['common.featured']}
            className={classes.tagStyle}
          />
        </Grid>
      </Card>
    </>
  );
};

export default FeaturedFreelancerComponent;

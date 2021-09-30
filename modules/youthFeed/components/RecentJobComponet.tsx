import React, {FC} from 'react';
import {Avatar, Box, Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import {CremaTheme} from '../../../types/AppContextPropsType';
import {Fonts} from '../../../shared/constants/AppEnums';

const useStyle = makeStyles((theme: CremaTheme) => ({
  recentJobCompRoot: {
    padding: '5px 10px 0px 20px',
  },
  jobProviderImage: {
    height: 45,
    width: 45,
    border: '1px solid ' + theme.palette.grey['300'],
  },
  jobTitle: {
    fontWeight: Fonts.BOLD,
  },
  jobProviderName: {
    color: theme.palette.gray['600'],
    marginBottom: 10,
  },
}));

interface RecentJobProps {
  data: {
    imageUrl: string;
    jobTitle: string;
    jobProviderName: string;
    location: string;
  };
}

const RecentJobComponent: FC<RecentJobProps> = ({data}) => {
  const classes = useStyle();

  return (
    <>
      <Box display={'flex'} className={classes.recentJobCompRoot}>
        <Box>
          <Avatar
            alt='provider image'
            src={data.imageUrl}
            className={classes.jobProviderImage}
          />
        </Box>
        <Box marginLeft={'10px'}>
          <Box className={classes.jobTitle}>{data.jobTitle}</Box>
          <Box className={classes.jobProviderName}>
            {data.jobProviderName} &#8226; {data.location}
          </Box>
          <Box>
            <Button variant='contained' color='primary' size={'small'}>
              Apply
            </Button>
            <Button
              variant='contained'
              color='default'
              size={'small'}
              style={{marginLeft: 10}}>
              Details
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default RecentJobComponent;

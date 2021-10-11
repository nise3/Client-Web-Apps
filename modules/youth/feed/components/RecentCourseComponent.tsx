import React, {FC} from 'react';
import {Avatar, Box, Button} from '@mui/material';
import {makeStyles} from '@mui/styles';
import {CremaTheme} from '../../../../types/AppContextPropsType';
import {Fonts} from '../../../../shared/constants/AppEnums';
import {useIntl} from 'react-intl';

const useStyle = makeStyles((theme: CremaTheme) => ({
  recentCourseCompRoot: {
    padding: '5px 10px 0px 20px',
  },
  courseProviderImage: {
    height: 45,
    width: 45,
    border: '1px solid ' + theme.palette.grey['300'],
  },
  courseTitle: {
    fontWeight: Fonts.BOLD,
  },
  courseProviderName: {
    color: theme.palette.grey['600'],
    marginBottom: 10,
  },
}));

interface RecentCourseProps {
  data: {
    logoUrl: string;
    courseTitle: string;
    courseProvider: string;
  };
}

const RecentCourseComponent: FC<RecentCourseProps> = ({data}) => {
  const classes = useStyle();
  const {messages} = useIntl();

  return (
    <>
      <Box display={'flex'} className={classes.recentCourseCompRoot}>
        <Box>
          <Avatar
            alt='provider image'
            src={data.logoUrl}
            className={classes.courseProviderImage}
          />
        </Box>
        <Box marginLeft={'10px'}>
          <Box className={classes.courseTitle}>{data.courseTitle}</Box>
          <Box className={classes.courseProviderName}>
            {data.courseProvider}
          </Box>
          <Box>
            <Button variant='contained' size={'small'} style={{marginLeft: 10}}>
              {messages['common.details']}
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default RecentCourseComponent;

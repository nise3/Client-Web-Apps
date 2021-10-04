import React from 'react';
import {Box, Divider} from '@mui/material';
import {AddCircle, CheckCircle} from '@mui/icons-material';
import {CremaTheme} from '../../../types/AppContextPropsType';
import {makeStyles} from '@mui/styles';
import {useIntl} from 'react-intl';

const useStyles = makeStyles((theme: CremaTheme): any => ({
  profileItem: {
    paddingTop: 5,
    '& .itemIcon': {
      fill: '#1c98f7',
      float: 'right',
    },
    '& .itemIconAdd': {
      float: 'right',
    },
  },
  displayInline: {
    display: 'inline-block',
  },
  divider: {
    width: '100%',
    height: 1,
    marginTop: 10,
  },
}));

const BasicInfoItemBox = () => {
  const classes: any = useStyles();
  const {messages} = useIntl();

  return (
    <>
      <Box className={classes.profileItem}>
        <Box className={classes.displayInline}>{messages['common.phone']}</Box>
        <CheckCircle className='itemIcon' />
        <Divider className={classes.divider} />
      </Box>
      <Box className={classes.profileItem}>
        <Box className={classes.displayInline}>{messages['common.email']}</Box>
        <CheckCircle className='itemIcon' />
        <Divider className={classes.divider} />
      </Box>
      <Box className={classes.profileItem}>
        <Box className={classes.displayInline}>{messages['common.nid']}</Box>
        <CheckCircle className='itemIcon' />
        <Divider className={classes.divider} />
      </Box>
      <Box className={classes.profileItem}>
        <Box className={classes.displayInline}>{messages['common.bid']}</Box>
        <AddCircle className='itemIconAdd' color={'primary'} />
      </Box>
    </>
  );
};

export default BasicInfoItemBox;

import React from 'react';
import {Box, Divider} from '@mui/material';
import {AddCircle, CheckCircle} from '@mui/icons-material';
import {CremaTheme} from '../../../../redux/types/AppContextPropsType';
import {makeStyles} from '@mui/styles';
import {useIntl} from 'react-intl';
import {YouthAuthUser} from '../../../../redux/types/models/CommonAuthUser';

const useStyles = makeStyles((theme: CremaTheme): any => ({
  profileItem: {
    paddingTop: 5,
    '& .itemIcon': {
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

interface BasicInfoItemBoxProps {
  youthProfile: YouthAuthUser | null;
}

const BasicInfoItemBox = ({youthProfile}: BasicInfoItemBoxProps) => {
  const classes: any = useStyles();
  const {messages} = useIntl();

  return (
    <>
      <Box className={classes.profileItem}>
        <Box className={classes.displayInline}>{messages['common.phone']}</Box>
        {youthProfile?.mobile ? (
          <CheckCircle className='itemIcon' color={'primary'} />
        ) : (
          <AddCircle className='itemIcon' color={'primary'} />
        )}
        <Divider className={classes.divider} />
      </Box>
      <Box className={classes.profileItem}>
        <Box className={classes.displayInline}>{messages['common.email']}</Box>
        {youthProfile?.email ? (
          <CheckCircle className='itemIcon' color={'primary'} />
        ) : (
          <AddCircle className='itemIcon' color={'primary'} />
        )}
        <Divider className={classes.divider} />
      </Box>
      <Box className={classes.profileItem}>
        <Box className={classes.displayInline}>{messages['common.nid']}</Box>
        {youthProfile?.identity_number ? (
          <CheckCircle className='itemIcon' color={'primary'} />
        ) : (
          <AddCircle className='itemIcon' color={'primary'} />
        )}
        <Divider className={classes.divider} />
      </Box>
      <Box className={classes.profileItem}>
        <Box className={classes.displayInline}>{messages['common.bid']}</Box>
        {youthProfile?.identity_number ? (
          <CheckCircle className='itemIcon' color={'primary'} />
        ) : (
          <AddCircle className='itemIcon' color={'primary'} />
        )}
      </Box>
    </>
  );
};

export default BasicInfoItemBox;

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
    width: 'calc(100% + 32px)',
    marginLeft: '-16px',
    height: 1,
    marginTop: 5,
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
        <Box className={classes.displayInline}>{messages['common.mobile']}</Box>
        {youthProfile?.mobile ? (
          <CheckCircle className='itemIcon' color={'primary'} />
        ) : (
          <AddCircle className='itemIcon' color={'secondary'} />
        )}
        <Divider className={classes.divider} />
      </Box>
      <Box className={classes.profileItem}>
        <Box className={classes.displayInline}>{messages['common.email']}</Box>
        {youthProfile?.email ? (
          <CheckCircle className='itemIcon' color={'primary'} />
        ) : (
          <AddCircle className='itemIcon' color={'secondary'} />
        )}
        <Divider className={classes.divider} />
      </Box>
      <Box className={classes.profileItem}>
        <Box className={classes.displayInline}>
          {messages['common.identity_number']}
        </Box>
        {youthProfile?.identity_number ? (
          <CheckCircle className='itemIcon' color={'primary'} />
        ) : (
          <AddCircle className='itemIcon' color={'secondary'} />
        )}
        <Divider className={classes.divider} />
      </Box>
      <Box className={classes.profileItem}>
        <Box className={classes.displayInline}>
          {messages['common.education']}
        </Box>
        {youthProfile?.educations && youthProfile?.educations.length ? (
          <CheckCircle className='itemIcon' color={'primary'} />
        ) : (
          <AddCircle className='itemIcon' color={'secondary'} />
        )}
        <Divider className={classes.divider} />
      </Box>
      <Box className={classes.profileItem}>
        <Box className={classes.displayInline}>
          {messages['common.language']}
        </Box>
        {youthProfile?.languages_proficiencies &&
        youthProfile?.languages_proficiencies.length ? (
          <CheckCircle className='itemIcon' color={'primary'} />
        ) : (
          <AddCircle className='itemIcon' color={'secondary'} />
        )}
        <Divider className={classes.divider} />
      </Box>
      <Box className={classes.profileItem}>
        <Box className={classes.displayInline}>
          {messages['portfolio.label']}
        </Box>
        {youthProfile?.portfolios && youthProfile?.portfolios.length ? (
          <CheckCircle className='itemIcon' color={'primary'} />
        ) : (
          <AddCircle className='itemIcon' color={'secondary'} />
        )}
      </Box>
    </>
  );
};

export default BasicInfoItemBox;

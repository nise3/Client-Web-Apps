import {Card, CardContent, Divider, Grid} from '@mui/material';
import {AddCircle, CheckCircle} from '@mui/icons-material';
import React from 'react';
import {createStyles, makeStyles} from '@mui/styles';
import {useIntl} from 'react-intl';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import {YouthAuthUser} from '../../../redux/types/models/CommonAuthUser';

const useStyles = makeStyles(() =>
  createStyles({
    customDivider: {
      height: '2px',
      width: 'calc(100% + 32px)',
      marginLeft: '-16px',
      marginTop: '3px',
      marginBottom: '3px',
    },
  }),
);

const CustomDivider = () => {
  const classes = useStyles();
  return <Divider className={classes.customDivider} />;
};

const ProfileCompleteSignatureMenu = () => {
  const {messages} = useIntl();
  const authUser = useAuthUser<YouthAuthUser>();

  return (
    <Card>
      <CardContent>
        <Grid container>
          <Grid item xs={11}>
            {messages['common.phone']}
          </Grid>
          <Grid item xs={1}>
            {authUser?.mobile ? (
              <CheckCircle fontSize={'inherit'} color={'primary'} />
            ) : (
              <AddCircle fontSize={'inherit'} color={'primary'} />
            )}
          </Grid>
        </Grid>
        <CustomDivider />
        <Grid container>
          <Grid item xs={11}>
            {messages['common.email']}
          </Grid>
          <Grid item xs={1}>
            {authUser?.email ? (
              <CheckCircle fontSize={'inherit'} color={'primary'} />
            ) : (
              <AddCircle fontSize={'inherit'} color={'primary'} />
            )}
          </Grid>
        </Grid>
        <CustomDivider />
        <Grid container>
          <Grid item xs={11}>
            {messages['common.nid']}
          </Grid>
          <Grid item xs={1}>
            {authUser?.identity_number ? (
              <CheckCircle fontSize={'inherit'} color={'primary'} />
            ) : (
              <AddCircle fontSize={'inherit'} color={'primary'} />
            )}
          </Grid>
        </Grid>
        <CustomDivider />
        <Grid container>
          <Grid item xs={11}>
            {messages['common.bid']}
          </Grid>
          <Grid item xs={1}>
            {authUser?.identity_number ? (
              <CheckCircle fontSize={'inherit'} color={'primary'} />
            ) : (
              <AddCircle fontSize={'inherit'} color={'primary'} />
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ProfileCompleteSignatureMenu;

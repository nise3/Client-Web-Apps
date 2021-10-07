import {Card, CardContent, Divider, Grid} from '@mui/material';
import {CheckCircle} from '@mui/icons-material';
import React from 'react';
import {createStyles, makeStyles} from '@mui/styles';

const useStyles = makeStyles(() =>
  createStyles({
    customDivider: {
      height: '2px',
      width: '120%',
      marginLeft: '-20px',
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
  return (
    <Card>
      <CardContent>
        <Grid container>
          <Grid item xs={11}>
            Phone Number
          </Grid>
          <Grid item xs={1}>
            <CheckCircle fontSize={'inherit'} color={'primary'} />
          </Grid>
        </Grid>
        <CustomDivider />
        <Grid container>
          <Grid item xs={11}>
            Email Address
          </Grid>
          <Grid item xs={1}>
            <CheckCircle fontSize={'inherit'} color={'primary'} />
          </Grid>
        </Grid>
        <CustomDivider />
        <Grid container>
          <Grid item xs={11}>
            NID
          </Grid>
          <Grid item xs={1}>
            <CheckCircle fontSize={'inherit'} color={'primary'} />
          </Grid>
        </Grid>
        <CustomDivider />
        <Grid container>
          <Grid item xs={11}>
            BRN
          </Grid>
          <Grid item xs={1}>
            <CheckCircle fontSize={'inherit'} color={'primary'} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ProfileCompleteSignatureMenu;

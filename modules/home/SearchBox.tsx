import React from 'react';
import {
  Button,
  FormControl,
  Grid,
  InputAdornment,
  NativeSelect,
  OutlinedInput,
} from '@material-ui/core';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    searchBox: {
      padding: '12px 5px 5px 15px',
      background: '#fff',
      position: 'absolute',
      zIndex: 1,
      // borderRadius: '2px',
      border: 'none',
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        marginLeft: '-16px',
      },
      [theme.breakpoints.up('sm')]: {
        width: '100%',
        marginLeft: '-12px',
        paddingBottom: '14px',
      },
      [theme.breakpoints.up('md')]: {
        width: '60%',
        padding: '12px 15px 5px 15px',
      },
    },
    noBorder: {
      border: 'none',
    },
    location: {
      marginTop: '10px',
    },
    searchButton: {
      background: '#682988',
      color: '#fff',
      borderRadius: '0px',
      marginTop: '10px',
    },
  }),
);

function CustomSvgIcon(props: any) {
  return <LocationOnIcon {...props} />;
}

const SearchBox = () => {
  const classes = useStyles();

  return (
    <Grid container xl={12} spacing={2} className={classes.searchBox}>
      <Grid item xs={12} md={7}>
        <FormControl variant='outlined'>
          <OutlinedInput
            className={classes.noBorder}
            id='outlined-adornment-amount'
            startAdornment={
              <InputAdornment position='start'>
                <SearchIcon /> অনুসন্ধান করুন
              </InputAdornment>
            }
          />
        </FormControl>
      </Grid>
      <Grid
        item
        container
        xs={12}
        md={5}
        spacing={6}
        justifyContent={'space-around'}>
        <Grid item xs={6} md={6} className={classes.location}>
          <NativeSelect IconComponent={CustomSvgIcon}>
            <option>লোকেশন</option>
          </NativeSelect>
        </Grid>
        <Grid item xs={6} md={6}>
          <Button variant='contained' className={classes.searchButton}>
            অনুসন্ধান
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default SearchBox;

import React from 'react';
import {
  Button,
  Grid,
  InputAdornment,
  NativeSelect,
} from '@material-ui/core';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
// import LocationOnIcon from '@material-ui/icons/LocationOn';

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
        marginLeft: '-24px',
        paddingBottom: '14px',
      },
      [theme.breakpoints.up('md')]: {
        width: '50%',
        height : '85px',
        padding: '12px 15px 5px 15px',
      },
    },
    noBorder: {
      border: 'none',
    },
    location: {
      marginTop: '10px',
      width: '70px'
    },
    locationIcon:{

    },
    searchButton: {
      background: '#682988',
      color: '#fff',
      borderRadius: '0px',
      height: '63px',
      width: '162px',
      margin: '-8px'
    },
  }),
);

// function CustomSvgIcon(props: any) {
//   return <LocationOnIcon {...props} />;
// }

const SearchBox = () => {
  const classes = useStyles();

  return (
    <Grid container xl={12} spacing={2} className={classes.searchBox}>
      <Grid item xs={12} md={7}>
        <TextField
          variant="outlined"
          name="searchBox"
          autoFocus
          placeholder="অনুসন্ধান করুন"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            classes:{notchedOutline:classes.noBorder}
          }}
        />
      </Grid>
      <Grid
        item
        container
        xs={12}
        md={5}
        spacing={4}
        justifyContent={'space-around'}>
        {/*<Grid xs={1} md={1} className={classes.locationIcon}>*/}
        {/*  <LocationOnIcon/>*/}
        {/*</Grid>*/}
        <Grid item xs={6} md={6} className={classes.location}>
          <NativeSelect disableUnderline>
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

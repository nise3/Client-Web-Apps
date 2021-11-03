import React, {useState} from 'react';
import {
  Button,
  Divider,
  IconButton,
  InputBase,
  MenuItem,
  Paper,
  Select,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';
import {Theme} from '@mui/system';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    select: {
      '&>div, &>div:focus': {
        backgroundColor: 'transparent',
      },
      '&::before': {
        display: 'none',
      },
      '&::after': {
        display: 'none',
      },
    },
    topSelect: {
      border: '1px solid #5e6b0f',
      background: ' #5e6b0f',
      textAlign: 'center',
      color: '#fff',
      height: 40,
      width: 110,
      '& .MuiSelect-select': {
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 0,
      },
      '& .MuiSvgIcon-root': {
        color: '#fff',
      },
      '&>div, &>div:focus': {
        backgroundColor: 'transparent',
      },
      '&::before': {
        display: 'none',
      },
      '&::after': {
        display: 'none',
      },
    },
    resetDivider: {
      marginTop: '0px !important',
      marginBottom: '0px !important',
    },
  }),
);

const SearchBox = () => {
  const classes = useStyles();
  const [locationValue, setLocationValue] = useState(1);
  const [typeValue, setTypeValue] = useState(1);

  return (
    <>
      <Paper
        elevation={0}
        square
        component='form'
        sx={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          width: '760px',
          height: '86px',
          p: '10px',
          marginTop: '100px',
        }}>
        <IconButton sx={{p: '20px'}} aria-label='menu'>
          <SearchIcon />
        </IconButton>
        <InputBase
          sx={{ml: 1, flex: 1}}
          placeholder='অনুসন্ধান করুন'
          inputProps={{'aria-label': 'অনুসন্ধান করুন'}}
        />
        <Paper component='span' elevation={0}>
          <IconButton aria-label='location'>
            <LocationOnIcon />
          </IconButton>
          <Select
            className={classes.select}
            variant='standard'
            value={locationValue}
            label=''
            onChange={(e: any) => {
              setLocationValue(e?.target?.value);
            }}
            MenuProps={{disableScrollLock: true}}>
            <MenuItem value='1'>লোকেশন</MenuItem>
          </Select>
        </Paper>
        <Button
          variant='contained'
          size={'large'}
          sx={{borderRadius: 0, width: '150px', height: '100%'}}
          disableElevation>
          অনুসন্ধান
        </Button>
        <Select
          className={classes.topSelect}
          sx={{
            position: 'absolute',
            left: 0,
            top: '-40px',
            color: 'primary.contrastText',
          }}
          variant='filled'
          value={typeValue}
          label=''
          MenuProps={{disableScrollLock: true}}
          onChange={(e: any) => {
            setTypeValue(e?.target?.value);
          }}>
          <MenuItem value='1'>দক্ষতা</MenuItem>
          <Divider className={classes.resetDivider} />
          <MenuItem value='2'>চাকরি</MenuItem>
          <Divider className={classes.resetDivider} />
          <MenuItem value='3'>ব্যবসা</MenuItem>
          <Divider className={classes.resetDivider} />
          <MenuItem value='4'>শিক্ষা</MenuItem>
        </Select>
      </Paper>
    </>
  );
};
export default SearchBox;

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
import LocationOnOutlined from '@mui/icons-material/LocationOnOutlined';
import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';
import {Theme} from '@mui/system';
import {useIntl} from 'react-intl';
import Hidden from '../../@softbd/elements/Hidden';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    select: {
      color: '#818086',
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
    rootPaper: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      width: '760px',
      height: '86px',
      padding: '10px',
      marginTop: '114px',
      [theme.breakpoints.down('md')]: {
        display: 'flex',
        width: '100%',
      },
    },
    searchButton: {
      borderRadius: 0,
      width: '150px',
      height: '100%',
      marginLeft: '20px',
      [theme.breakpoints.down('md')]: {
        width: '80px',
      },
    },
  }),
);

const SearchBox = () => {
  const {messages} = useIntl();
  const classes = useStyles();
  const [locationValue, setLocationValue] = useState(1);
  const [typeValue, setTypeValue] = useState(1);

  return (
    <>
      <Paper
        sx={{zIndex: '999'}}
        elevation={0}
        square
        component='form'
        className={classes.rootPaper}>
        <Hidden mdDown>
          <IconButton sx={{p: '20px'}} aria-label='menu'>
            <SearchIcon />
          </IconButton>
        </Hidden>
        <InputBase
          sx={{ml: 1, flex: 1}}
          placeholder={messages['common.search_2'] as string}
          inputProps={{'aria-label': 'অনুসন্ধান করুন'}}
        />
        <Hidden mdDown>
          <Paper component='span' elevation={0}>
            <IconButton aria-label='location'>
              <LocationOnOutlined />
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
        </Hidden>
        <Button
          variant='contained'
          size={'large'}
          className={classes.searchButton}
          disableElevation>
          {messages['common.search']}
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
          <MenuItem value='1'>{messages['common.skills']}</MenuItem>
          <Divider className={classes.resetDivider} />
          <MenuItem value='2'>{messages['menu.jobs']}</MenuItem>
          <Divider className={classes.resetDivider} />
          <MenuItem value='3'>{messages['common.business']}</MenuItem>
          <Divider className={classes.resetDivider} />
          <MenuItem value='4'>{messages['common.educations']}</MenuItem>
        </Select>
      </Paper>
    </>
  );
};
export default SearchBox;

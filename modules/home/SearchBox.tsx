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
  const {messages} = useIntl();
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
          zIndex: '999',
        }}>
        <IconButton sx={{p: '20px'}} aria-label='menu'>
          <SearchIcon />
        </IconButton>
        <InputBase
          sx={{ml: 1, flex: 1}}
          placeholder={messages['common.search_2'] as string}
          inputProps={{'aria-label': 'অনুসন্ধান করুন'}}
        />
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
            <MenuItem value='1'>{messages['common.location_2']}</MenuItem>
          </Select>
        </Paper>
        <Button
          variant='contained'
          size={'large'}
          sx={{
            borderRadius: 0,
            width: '150px',
            height: '100%',
            marginLeft: '20px',
          }}
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

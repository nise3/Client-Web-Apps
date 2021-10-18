import React from 'react';
import InputBase from '@mui/material/InputBase';
import makeStyles from '@mui/styles/makeStyles';
import {Box, alpha} from '@mui/material';
import clsx from 'clsx';
import SearchIcon from '@mui/icons-material/Search';
import {Fonts} from '../../../shared/constants/AppEnums';
import {CremaTheme} from '../../../redux/types/AppContextPropsType';

const useStyles = makeStyles((theme: CremaTheme) => ({
  root: {
    display: 'flex',
    marginRight: 10,
    position: 'relative',
    [theme.breakpoints.up('sm')]: {
      marginRight: 20,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: (props: {borderLight: boolean; align: string}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    marginLeft: props.align === 'right' ? 'auto' : 0,
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    '&.cr-search': {
      [theme.breakpoints.down('xl')]: {
        position: 'absolute',
        right: 0,
        top: '50%',
        zIndex: 1,
        transform: 'translateY(-50%)',
      },
    },
  }),
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&.right': {
      left: 'auto',
      right: 0,
      '& + $inputRoot $inputInput': {
        paddingLeft: theme.spacing(2),
        paddingRight: `calc(1em + ${theme.spacing(4)})`,
      },
    },
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    padding: theme.spacing(2, 2, 2, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    backgroundColor: theme.palette.common.white,
    width: 162,
    height: 35,
    borderRadius: 4,
    boxSizing: 'border-box',
    [theme.breakpoints.down('xl')]: {
      width: 100,
    },
    '&:focus': {
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      borderColor: theme.palette.primary,
      width: 235,
      [theme.breakpoints.down('xl')]: {
        backgroundColor: theme.palette.common.white,
        width: 162,
      },
    },
  },
  inputBase: {
    backgroundColor: 'transparent',
    fontWeight: Fonts.MEDIUM,
    border: '1px solid',
    borderColor: (props: {borderLight: boolean; align: string}) =>
      props.borderLight ? '#efefef' : theme.palette.text.secondary,
    color: 'black',
    borderRadius: 4,

    '& > .Mui-focused': {
      borderColor: 'red',
    },
  },
  searchIconBox: {
    position: 'relative',
    '& $inputInput': {
      width: 35,
      borderRadius: 50,
      paddingLeft: 27,
      '&:focus': {
        width: 235,
        borderRadius: 4,
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      },
    },
    '& $searchIcon': {
      paddingLeft: 6,
      paddingRight: 6,
    },
  },
}));

interface AppSearchProps {
  placeholder?: string;
  iconPosition?: string;
  align?: string;
  overlap?: boolean;
  borderLight?: boolean;
  onlyIcon?: boolean;
  containerStyle?: any;
  inputStyle?: any;
  iconStyle?: any;

  [x: string]: any;
}

const AppSearch: React.FC<AppSearchProps> = ({
  onlyIcon = false,
  overlap = true,
  iconPosition = 'left',
  align = 'left',
  iconStyle = {
    color: 'grey',
  },
  placeholder,
  borderLight = false,
  containerStyle,
  inputStyle,
  ...rest
}) => {
  const classes = useStyles({borderLight, align});
  return (
    <Box className={classes.root} style={containerStyle}>
      <Box
        className={clsx(
          classes.search,
          {'cr-search': overlap},
          onlyIcon ? classes.searchIconBox : null,
        )}>
        <Box
          className={clsx(classes.searchIcon, {
            right: iconPosition === 'right',
          })}
          style={iconStyle}>
          <SearchIcon />
        </Box>
        <InputBase
          {...rest}
          placeholder={placeholder || 'Search…'}
          className={clsx(classes.inputBase, 'crAppsSearch')}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{'aria-label': 'search'}}
        />
      </Box>
    </Box>
  );
};

export default AppSearch;

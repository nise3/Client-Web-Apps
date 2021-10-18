import makeStyles from '@mui/styles/makeStyles';
import {Fonts} from '../../constants/AppEnums';
import {alpha} from '@mui/material';
import {CremaTheme} from '../../../redux/types/AppContextPropsType';

const useStyles = makeStyles((theme: CremaTheme) => ({
  '@global': {
    // for global styles
    '.MuiLink-root': {
      fontWeight: Fonts.REGULAR,
    },
    '.pointer': {
      cursor: 'pointer',
    },
    '.MuiTableCell-stickyHeader': {
      backgroundColor: theme.palette.background.paper,
    },
    '.item-hover': {
      transition: 'all .2s ease',
      transform: 'scale(1)',
      '&:hover': {
        backgroundColor: alpha(theme.palette.primary.main, 0.1),
        transform: 'translateY(-2px)',
        boxShadow: `0 3px 10px 0 ${alpha(theme.palette.common.black, 0.2)}`,
      },
    },
    '.card-hover': {
      transition: 'all 0.3s ease',
      transform: 'scale(1)',
      '&:hover': {
        boxShadow: '0 4px 8px rgba(0,0,0,.45)',
        transform: 'scale(1.05)',
      },
    },
  },
}));

export default useStyles;

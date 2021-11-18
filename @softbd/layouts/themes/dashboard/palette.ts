import {PaletteOptions} from '@mui/material/styles/createPalette';
import {ThemeMode} from '../../../../shared/constants/AppEnums';

const palette: PaletteOptions = {
  mode: ThemeMode.LIGHT,
  background: {
    paper: '#FFFFFF',
    default: '#FFF',
  },
  primary: {
    main: '#0A8FDC',
    light: '#0ab1ff',
    dark: '#085da6',
    contrastText: '#fff',
  },
  secondary: {
    main: '#dc570a',
    light: '#ec7f10',
    dark: '#c74d05',
    contrastText: '#fff',
  },
  text: {
    primary: '#495057',
    secondary: '#74788d',
    disabled: '#909098',
  },
};

export default palette;

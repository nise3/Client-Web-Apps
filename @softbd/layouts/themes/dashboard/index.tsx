import palette from './palette';
import typography from './typography';
import componentStyleOverrides from './componentStyleOverrides';
import {createTheme} from '@mui/material/styles';

export function theme() {
  let themeInstance = createTheme({
    direction: 'ltr',
    palette: palette,
  });
  
  themeInstance = createTheme(themeInstance, {
    typography: typography(themeInstance),
  });

  return createTheme(themeInstance, {
    mixins: {},
    components: componentStyleOverrides(themeInstance),
  });
}

export default theme;

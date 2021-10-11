import {Theme} from '@mui/system';
import {TypographyOptions} from '@mui/material/styles/createTypography';

export default function typography(theme: Theme) {
  const customTypography: TypographyOptions = {
    fontFamily: ['NotoSerifBangla', 'Poppins', 'sans-serif'].join(','),
  };

  return customTypography;
}

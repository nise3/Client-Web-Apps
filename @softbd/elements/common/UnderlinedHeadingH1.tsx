import React, {ReactNode, useContext} from 'react';
import {styled} from '@mui/material/styles';
import {Box, Typography, useTheme} from '@mui/material';
import typography from '../../layouts/themes/default/typography';
import AppContextPropsType from '../../../redux/types/AppContextPropsType';
import AppContext from '../../../@crema/utility/AppContext';
import AppLocale from '../../../shared/localization';
const PREFIX = 'UnderlinedHeading';

const classes = {
  heading: `${PREFIX}-heading`,
  line: `${PREFIX}-line`,
  lineOne: `${PREFIX}-lineOne`,
  lineTwo: `${PREFIX}-lineTwo`,
};

const StyledBoxLine = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  marginBottom: 48,

  [`& .${classes.lineOne}`]: {
    background: '#33c2a7',
    width: 120,
    height: 3,
  },

  [`& .${classes.lineTwo}`]: {
    background: '#f5a000',
    width: 100,
    height: 3,
  },
}));

type Props = {
  children?: ReactNode;
};

const UnderlinedHeading = ({children}: Props) => {
  const theme = useTheme();
  const {locale} = useContext<AppContextPropsType>(AppContext);
  const currentAppLocale = AppLocale[locale.locale];
  const result = typography(theme, currentAppLocale.locale);
  return (
    <>
      <Typography
        variant='h1'
        sx={result.h2}
        gutterBottom={true}
        fontWeight='fontWeightBold'>
        {children}
      </Typography>
      <StyledBoxLine mb={12}>
        <Box className={classes.lineOne} />
        <Box className={classes.lineTwo} />
      </StyledBoxLine>
    </>
  );
};

export default UnderlinedHeading;

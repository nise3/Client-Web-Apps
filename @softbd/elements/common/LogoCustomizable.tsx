import React, {useContext} from 'react';
import {styled} from '@mui/material/styles';
import {Box} from '@mui/material';
import {ThemeMode} from '../../../shared/constants/AppEnums';
import AppContextPropsType from '../../../redux/types/AppContextPropsType';
import AppContext from '../../../@crema/utility/AppContext';

const PREFIX = 'LogoCustomizable';

const classes = {
  logoRoot: `${PREFIX}-logoRoot`,
  logo: `${PREFIX}-logo`,
  texts: `${PREFIX}-texts`,
  textTop: `${PREFIX}-textTop`,
  textBottom: `${PREFIX}-textBottom`,
  logoLast: `${PREFIX}-logoLast`,
  logoInstitute: `${PREFIX}-logoInstitute`,
};

const StyledBox = styled(Box)((/*theme*/) => ({
  [`& .${classes.logoRoot}`]: {
    display: 'flex',
    flexDirection: 'row',
    cursor: 'pointer',
    alignItems: 'flex-start',
    marginTop: 20,
  },

  [`& .${classes.logo}`]: {
    height: 48,
    marginRight: 10,
  },

  [`& .${classes.texts}`]: {
    maxWidth: 256,
    textAlign: 'center',
  },

  [`& .${classes.textTop}`]: {
    fontSize: 12,
    fontWeight: 600,
    marginTop: 3,
  },

  [`& .${classes.textBottom}`]: {
    fontSize: 9,
    color: '#6f95ca', //theme.palette.primary.main,
  },

  [`& .${classes.logoLast}`]: {
    marginLeft: 10,
    width: 48,
  },

  [`& .${classes.logoInstitute}`]: {
    width: '100%',
    height: 48,
    objectFit: 'contain',
  },
}));

type Prop = {
  instituteName: string;
  instituteLogo: string;
  className?: any;
};

const LogoCustomizable = ({instituteName, instituteLogo, className}: Prop) => {
  const {themeMode} = useContext<AppContextPropsType>(AppContext);

  return (
    <StyledBox className={className}>
      <Box className={classes.logoRoot}>
        <Box sx={{display: {md: 'none', sm: 'block'}}}>
          <img
            className={classes.logo}
            src={
              themeMode === ThemeMode.DARK
                ? '/images/logo-white.png'
                : '/images/logo.png'
            }
            alt='crema-logo'
          />
        </Box>
        <Box sx={{display: {xs: 'none', md: 'block'}}}>
          <img
            className={classes.logo}
            src={
              themeMode === ThemeMode.DARK
                ? '/images/logo-white-with-name.png'
                : '/images/logo-with-name.png'
            }
            alt='crema-logo'
          />
        </Box>
        <Box className={classes.texts}>
          <Box className={classes.textTop}>
            National Intelligence for Skills Education, Employment and
            Entrepreneurship
          </Box>
          <Box className={classes.textBottom}>{instituteName}</Box>
        </Box>
        <Box className={classes.logoLast}>
          <img
            className={classes.logoInstitute}
            src={instituteLogo}
            alt='crema-logo'
          />
        </Box>
      </Box>
    </StyledBox>
  );
};

export default LogoCustomizable;

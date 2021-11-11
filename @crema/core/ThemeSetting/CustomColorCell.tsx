import React, {useContext} from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import {AppContext} from '../../index';
import CheckIcon from '@mui/icons-material/Check';
import IntlMessages from '../../utility/IntlMessages';
import {ThemeMode} from '../../../shared/constants/AppEnums';
import AppContextPropsType from '../../../redux/types/AppContextPropsType';

const PREFIX = 'CustomColorCell';

const classes = {
  colorOption: `${PREFIX}-colorOption`,
  colorOptionTriangle: `${PREFIX}-colorOptionTriangle`,
  colorOptionBorder: `${PREFIX}-colorOptionBorder`,
  colorOptionRightIcon: `${PREFIX}-colorOptionRightIcon`,
  textBase: `${PREFIX}-textBase`,
};

const StyledBox = styled(Box)(({theme}) => ({
  [`& .${classes.colorOption}`]: {
    position: 'relative',
    overflow: 'hidden',
    cursor: 'pointer',
    border: `1px solid ${theme.palette.text.primary}`,
  },

  [`& .${classes.colorOptionTriangle}`]: {
    transform: 'rotate(45deg)',
    marginTop: 10,
    marginLeft: 22,
  },

  [`& .${classes.colorOptionBorder}`]: {
    width: 10,
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 2,
  },

  [`& .${classes.colorOptionRightIcon}`]: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: 20,
    height: 20,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: '#fff',
    color: theme.palette.primary.main,
  },

  [`& .${classes.textBase}`]: {
    fontSize: 16,
  },
}));

interface CustomColorCellProps {
  themeColorSet: any;
  updateThemeColors: (color: any) => void;
}

const CustomColorCell: React.FC<CustomColorCellProps> = ({
  themeColorSet,
  updateThemeColors,
}) => {
  const {themeMode, theme} = useContext<AppContextPropsType>(AppContext);
  return (
    <StyledBox
      component='li'
      onClick={() => {
        updateThemeColors(themeColorSet);
      }}>
      <Box
        height={40}
        width={50}
        style={{backgroundColor: themeColorSet.PrimaryColor}}
        className={classes.colorOption}>
        <Box
          height={60}
          width={60}
          style={{
            backgroundColor: themeColorSet.SecondaryColor,
          }}
          className={classes.colorOptionTriangle}
        />
        <Box
          style={{
            borderColor: '#ADADAD',
            borderWidth: 1,
            backgroundColor:
              themeMode === ThemeMode.LIGHT
                ? 'white'
                : themeColorSet.SidebarColor,
          }}
          className={classes.colorOptionBorder}
        />

        {theme.palette.primary.main === themeColorSet.PrimaryColor &&
        theme.palette.secondary.main === themeColorSet.SecondaryColor ? (
          <span className={classes.colorOptionRightIcon}>
            <CheckIcon className={classes.textBase}>
              <IntlMessages id='customizer.checked' />
            </CheckIcon>
          </span>
        ) : null}
      </Box>
    </StyledBox>
  );
};

export default CustomColorCell;

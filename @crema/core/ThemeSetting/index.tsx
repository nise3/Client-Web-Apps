import React, {useContext, useState} from 'react';
import {styled} from '@mui/material/styles';
import AppContext from '../../utility/AppContext';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import PrimaryColorPicker from './PrimaryColorPicker';
import SecondaryColorPicker from './SecondaryColorPicker';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import SidebarColorPicker from './SidebarColorPicker';
import clsx from 'clsx';
import {Scrollbar} from '../../index';
import Box from '@mui/material/Box';
import IntlMessages from '../../utility/IntlMessages';
import themeColorSets from '../../../shared/constants/ColorSets';
import CustomColorCell from './CustomColorCell';
import {
  LayoutType,
  ThemeMode,
  ThemeStyle,
} from '../../../shared/constants/AppEnums';
import AppContextPropsType from '../../../redux/types/AppContextPropsType';
import {orange} from '@mui/material/colors';

const PREFIX = 'ThemeSetting';

const classes = {
  customizerButton: `${PREFIX}-customizerButton`,
  rightSidebar: `${PREFIX}-rightSidebar`,
  rightSidebarHeader: `${PREFIX}-rightSidebarHeader`,
  rightSidebarMain: `${PREFIX}-rightSidebarMain`,
  customizerItem: `${PREFIX}-customizerItem`,
  colorRow: `${PREFIX}-colorRow`,
  navOption: `${PREFIX}-navOption`,
  navOptionItem: `${PREFIX}-navOptionItem`,
  navOptionContent: `${PREFIX}-navOptionContent`,
  navOptionRightIcon: `${PREFIX}-navOptionRightIcon`,
  selectBox: `${PREFIX}-selectBox`,
  toggleBtn: `${PREFIX}-toggleBtn`,
  colorOptionList: `${PREFIX}-colorOptionList`,
  wFull: `${PREFIX}-wFull`,
  textWhite: `${PREFIX}-textWhite`,
  mb5: `${PREFIX}-mb5`,
};

const StyledBox = styled(Box)(({theme}) => ({
  position: 'absolute',
  right: 0,
  bottom: 20,
  zIndex: 1110,
  [theme.breakpoints.up('xl')]: {
    bottom: 20,
  },

  [`& .${classes.customizerButton}`]: {
    borderRadius: '30px 0 0 30px',
    backgroundColor: orange[500],
    '&:hover': {
      backgroundColor: orange[700],
    },
    '& button': {
      borderRadius: '30px 0 0 30px',

      '&:focus': {
        borderRadius: '30px 0 0 30px',
      },
    },
  },
  [`& .${classes.textWhite}`]: {
    color: 'white',
  },
}));

const StyledScrollbar = styled(Scrollbar)(({theme}) => ({
  width: 300,
  [theme.breakpoints.up('xl')]: {
    width: 400,
  },

  [`& .${classes.rightSidebarHeader}`]: {
    padding: '20px',
    borderBottom: '1px solid #e0e0e0',
    [theme.breakpoints.up('xl')]: {
      padding: '28px 22px',
    },
  },

  [`& .${classes.rightSidebarMain}`]: {
    padding: '20px',
    [theme.breakpoints.up('xl')]: {
      padding: '28px 22px',
    },
  },

  [`& .${classes.customizerItem}`]: {
    '&:not(:last-child)': {
      borderBottom: ['1px solid #e0e0e0'],
      paddingBottom: 20,
      marginBottom: 20,
      [theme.breakpoints.up('xl')]: {
        paddingBottom: 30,
        marginBottom: 30,
      },
    },
  },

  [`& .${classes.colorRow}`]: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    position: 'relative',
  },

  [`& .${classes.navOption}`]: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginLeft: '-10px',
    marginRight: '-10px',
  },

  [`& .${classes.navOptionItem}`]: {
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 20,
  },

  [`& .${classes.navOptionContent}`]: {
    position: 'relative',
    cursor: 'pointer',
  },

  [`& .${classes.navOptionRightIcon}`]: {
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
    backgroundColor: theme.palette.primary.main,
    color: '',
  },

  [`& .${classes.selectBox}`]: {
    '& .MuiOutlinedInput-input': {
      padding: '12px 32px 12px 14px',
    },
  },

  [`& .${classes.toggleBtn}`]: {
    height: 36,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
    '&:not(:first-of-type)': {
      borderColor: theme.palette.primary.main,
    },
    [theme.breakpoints.up('xl')]: {
      height: 48,
      minWidth: 96,
    },
    '&:hover,&:focus': {
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.primary.main,
    },
    '&.active': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      '&:hover,&:focus': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
      },
    },
  },

  [`& .${classes.colorOptionList}`]: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '0 -5px',
    padding: 0,
    listStyle: 'none',
    '& > li': {
      padding: '0 5px',
      marginBottom: 10,
    },
  },

  [`& .${classes.wFull}`]: {
    width: '100%',
  },

  [`& .${classes.mb5}`]: {
    marginBottom: 20,
  },
}));

interface ThemeSettingProps {
  props?: any;
}

const ThemeSetting: React.FC<ThemeSettingProps> = (props) => {
  const [open, setCustomizerStatus] = useState(false);
  const [themeColor, setThemeColor] = useState('preset');
  const {
    themeMode,
    updateThemeMode,
    themeStyle,
    updateThemeStyle,
    updateTheme,
    theme,
    layoutType,
  } = useContext<AppContextPropsType>(AppContext);
  const onStyleChange = (
    event: React.MouseEvent<HTMLElement>,
    themeStyle: ThemeStyle,
  ) => {
    if (themeStyle) {
      updateThemeStyle?.(themeStyle as ThemeStyle);
    }
  };

  const onModeChange = (
    event: React.MouseEvent<HTMLElement>,
    themeMode: ThemeMode,
  ) => {
    if (themeMode) updateThemeMode?.(themeMode);
  };

  const onSelectThemeColor = (
    event: React.MouseEvent<HTMLElement>,
    color: any,
  ) => {
    if (color) setThemeColor(color);
  };

  const updateThemeColors = (colorSet: any) => {
    theme.palette.primary.main = colorSet.PrimaryColor;
    theme.palette.secondary.main = colorSet.SecondaryColor;
    theme.palette.sidebar.bgColor = colorSet.SidebarColor;
    updateTheme?.(theme);
  };

  return (
    <StyledBox>
      <Box className={classes.customizerButton}>
        <IconButton onClick={() => setCustomizerStatus(!open)} size='large'>
          <i
            className={clsx(
              classes.textWhite,
              'material-icons animated infinite pulse',
            )}>
            settings
          </i>
        </IconButton>
      </Box>
      <Drawer
        anchor='right'
        className={layoutType === LayoutType.BOXED ? 'boxed-drawer' : ''}
        open={open}
        onClose={() => setCustomizerStatus(false)}>
        <StyledScrollbar>
          <Box className={classes.rightSidebarHeader}>
            <Box component='h3' mb={0.5} fontSize={18}>
              <IntlMessages id='customizer.customiseTheme' />
            </Box>
            <Box component='p' mb={0} color='text.secondary'>
              <IntlMessages id='customizer.customiseText' />
            </Box>
          </Box>
          <Box className={classes.rightSidebarMain}>
            <Box className={classes.customizerItem}>
              <Box component='h4' mb={{xs: 2, xl: 3}}>
                <IntlMessages id='customizer.themeStyle' />
              </Box>
              <ToggleButtonGroup
                value={themeStyle}
                exclusive={true}
                onChange={onStyleChange}
                aria-label='text alignment'>
                <ToggleButton
                  value={ThemeStyle.MODERN}
                  className={clsx(classes.toggleBtn, {
                    active: themeStyle === ThemeStyle.MODERN,
                  })}
                  aria-label='left aligned'>
                  <IntlMessages id='customizer.modern' />
                </ToggleButton>
                <ToggleButton
                  value={ThemeStyle.STANDARD}
                  className={clsx(classes.toggleBtn, {
                    active: themeStyle === ThemeStyle.STANDARD,
                  })}
                  aria-label='centered'>
                  <IntlMessages id='customizer.standard' />
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>

            <Box className={classes.customizerItem}>
              <Box component='h4' mb={{xs: 2, xl: 3}}>
                <IntlMessages id='customizer.themeMode' />
              </Box>
              <ToggleButtonGroup
                value={themeMode}
                exclusive
                onChange={onModeChange}
                aria-label='text alignment'>
                <ToggleButton
                  value={ThemeMode.LIGHT}
                  className={clsx(classes.toggleBtn, {
                    active:
                      themeMode === ThemeMode.LIGHT &&
                      theme.palette.mode === ThemeMode.LIGHT,
                  })}
                  aria-label='left aligned'>
                  <IntlMessages id='customizer.light' />
                </ToggleButton>
                <ToggleButton
                  value={ThemeMode.SEMI_DARK}
                  className={clsx(classes.toggleBtn, {
                    active:
                      themeMode === ThemeMode.SEMI_DARK &&
                      theme.palette.mode === ThemeMode.LIGHT,
                  })}
                  aria-label='centered'>
                  <IntlMessages id='customizer.semiDark' />
                </ToggleButton>
                <ToggleButton
                  value={ThemeMode.DARK}
                  className={clsx(classes.toggleBtn, {
                    active:
                      themeMode === ThemeMode.DARK ||
                      theme.palette.mode === ThemeMode.DARK,
                  })}
                  aria-label='right aligned'>
                  <IntlMessages id='customizer.dark' />
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>

            <Box className={classes.customizerItem}>
              <Box component='h4' mb={{xs: 2, xl: 3}}>
                <IntlMessages id='customizer.themeColors' />
              </Box>
              <ToggleButtonGroup
                value={themeColor}
                exclusive
                onChange={onSelectThemeColor}
                aria-label='text alignment'>
                <ToggleButton
                  value='preset'
                  className={clsx(classes.toggleBtn, {
                    active: themeColor === 'preset',
                  })}
                  aria-label='centered'>
                  <IntlMessages id='customizer.preset' />
                </ToggleButton>
                <ToggleButton
                  value='custom'
                  className={clsx(classes.toggleBtn, {
                    active: themeColor === 'custom',
                  })}
                  aria-label='left aligned'>
                  <IntlMessages id='customizer.custom' />
                </ToggleButton>
              </ToggleButtonGroup>
              {themeColor === 'custom' ? (
                <Box className={classes.colorRow} mt={4}>
                  <PrimaryColorPicker />
                  <SecondaryColorPicker />
                  <SidebarColorPicker />
                </Box>
              ) : (
                <Box mt={4}>
                  <Box component='ul' className={classes.colorOptionList}>
                    {themeColorSets.map((colorSet, index) => (
                      <CustomColorCell
                        key={index}
                        updateThemeColors={updateThemeColors}
                        themeColorSet={colorSet}
                      />
                    ))}
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        </StyledScrollbar>
      </Drawer>
    </StyledBox>
  );
};

export default ThemeSetting;

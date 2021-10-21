import React, {useContext, useState} from 'react';
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
import useStyles from './index.style';
import themeColorSets from '../../../shared/constants/ColorSets';
import CustomColorCell from './CustomColorCell';
import {
  LayoutType,
  ThemeMode,
  ThemeStyle,
} from '../../../shared/constants/AppEnums';
import AppContextPropsType from '../../../redux/types/AppContextPropsType';

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
  const classes = useStyles(props);

  return (
    <Box className={clsx(classes.customizerOption, 'customizerOption')}>
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
        <Scrollbar className={classes.rightSidebar}>
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
        </Scrollbar>
      </Drawer>
    </Box>
  );
};

export default ThemeSetting;

import React, {useContext, useState} from 'react';
import {styled} from '@mui/material/styles';
import {SketchPicker} from 'react-color';
import Box from '@mui/material/Box';
import AppContext from '../../utility/AppContext';
import {grey} from '@mui/material/colors';

const PREFIX = 'SidebarColorPicker';

const classes = {
  cpSwatch: `${PREFIX}-cpSwatch`,
  cpColor: `${PREFIX}-cpColor`,
  cpPopover: `${PREFIX}-cpPopover`,
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')(({theme}) => {
  const {sidebarColors} = useContext(AppContext);

  return {
    [`& .${classes.cpSwatch}`]: {
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      cursor: 'pointer',
      marginBottom: 10,
      marginRight: 10,
    },

    [`& .${classes.cpColor}`]: {
      width: 30,
      height: 16,
      backgroundColor: sidebarColors?.bgColor,
      border: `solid 1px ${grey[100]}`,
      marginRight: 10,
      [theme.breakpoints.up('xl')]: {
        width: 40,
        height: 26,
      },
    },

    [`& .${classes.cpPopover}`]: {
      position: 'absolute',
      left: 0,
      top: 0,
      zIndex: 1,
    },
  };
});

interface SidebarColorPickerProps {
  props?: any;
}

const SidebarColorPicker: React.FC<SidebarColorPickerProps> = (props) => {
  const [visible, setVisibility] = useState(false);
  const {sidebarColors, updateSidebarColors} = useContext(AppContext);
  console.log('sidebarColorssss', sidebarColors);
  return (
    <Root>
      <Box className={classes.cpSwatch} onClick={() => setVisibility(!visible)}>
        <Box className={classes.cpColor} />
        <span className='font-extrabold'>Sidebar</span>
      </Box>
      {visible ? (
        <Box className={classes.cpPopover} onClick={() => setVisibility(false)}>
          <SketchPicker
            color={sidebarColors?.bgColor}
            onChangeComplete={(color) => {
              updateSidebarColors!({...sidebarColors, ...{bgColor: color.hex}});
            }}
          />
        </Box>
      ) : null}
    </Root>
  );
};

export default SidebarColorPicker;

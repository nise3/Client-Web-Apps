import React, {useContext, useState} from 'react';
import {styled} from '@mui/material/styles';
import AppContext from '../../utility/AppContext';
import {SketchPicker} from 'react-color';
import Box from '@mui/material/Box';
import {grey} from '@mui/material/colors';

const PREFIX = 'SecondaryColorPicker';

const classes = {
  cpSwatch: `${PREFIX}-cpSwatch`,
  cpColor: `${PREFIX}-cpColor`,
  cpPopover: `${PREFIX}-cpPopover`,
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')(({theme}) => ({
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
    backgroundColor: theme.palette.secondary.main,
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
}));

interface SecondaryColorPickerProps {
  props?: any;
}

const SecondaryColorPicker: React.FC<SecondaryColorPickerProps> = (props) => {
  const [visible, setVisibility] = useState(false);
  const {theme, updateTheme, secondary} = useContext(AppContext);

  return (
    <Root>
      <Box className={classes.cpSwatch} onClick={() => setVisibility(!visible)}>
        <Box className={classes.cpColor} />
        <Box component='span' className='font-extrabold'>
          Secondary
        </Box>
      </Box>
      {visible ? (
        <Box className={classes.cpPopover} onClick={() => setVisibility(false)}>
          <SketchPicker
            color={secondary}
            onChangeComplete={(color) => {
              theme.palette.secondary.main = color.hex;
              updateTheme!(theme);
            }}
          />
        </Box>
      ) : null}
    </Root>
  );
};

export default SecondaryColorPicker;

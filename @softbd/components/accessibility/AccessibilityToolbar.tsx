import React, {useCallback, useEffect, useState} from 'react';
import {styled} from '@mui/material/styles';
import {Box, Card, FormGroup, FormControlLabel, Checkbox} from '@mui/material';
import {H4} from '../../elements/common';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SettingsAccessibilityIcon from '@mui/icons-material/SettingsAccessibility';

const PREFIX = 'InfoCard';

const classes = {
  logo: `${PREFIX}-logo`,
  label: `${PREFIX}-label`,
  card: `${PREFIX}-card`,
  button: `${PREFIX}-button`,
};

const StyledBox = styled(Box)(({theme}) => ({
  // marginTop: '-18px',
  // backgroundColor: '#fff',
  // padding: '30px 5px 5px 5px',
  // boxShadow: '1px 1px 10px #dfdfdf',
  position: 'fixed',
  zIndex: 99999,
  left: '-260px',
  top: 0,
  height: '100vh',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  pointerEvents: 'none',
  userSelect: 'none',
  transition: 'left 200ms ease',
  willChange: 'opacity transform',
  transform: 'translateZ(0px)',

  [`& .${classes.card}`]: {
    // pointerEvents: 'all',
    // height: '500px',
    width: '256px',
    padding: '16px',
  },

  [`&.opened`]: {
    left: '8px',
    [`&.opened .${classes.card}`]: {
      pointerEvents: 'all',
    },
  },

  [`& .${classes.button}`]: {
    pointerEvents: 'all',
    height: '54px',
    width: '54px',
    cursor: 'pointer',
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    borderRadius: '40px',
    marginLeft: '8px',
    padding: '15px',
  },
}));

const AccessibilityToolbar = () => {
  console.log('AccessibilityToolbar');
  const [isOpened, setIsOpened] = useState(false);
  const toggleFn = useCallback(() => {
    setIsOpened(!isOpened);
  }, [isOpened, setIsOpened]);
  const formToggle = useCallback((e) => {
    console.log('a11y togg', e);
    document.documentElement.classList.toggle(e.target.name);
  }, []);
  useEffect(() => {
    let elem: any = document.createElement('div');
    elem.style.height = '4px';
    elem.style.width = '100vw';
    elem.style.position = 'fixed';
    elem.style.left = '0px';
    elem.style.top = '-10px';
    elem.style.display = 'none';
    elem.style.zIndex = '999999';
    elem.style.pointerEvents = 'none';
    elem.id = 'readingGuide';
    document.body.appendChild(elem);
    const mousemoveCB = (e: any) => {
      // console.log('mousemove', e);
      elem.style.top = e?.y + 'px';
    };
    document.documentElement.addEventListener('mousemove', mousemoveCB);
    return () => {
      elem.remove();
      document.documentElement.removeEventListener('mousemove', mousemoveCB);
    };
  }, []);
  return (
    <StyledBox className={isOpened ? 'opened' : ''}>
      <Card className={classes.card} elevation={8}>
        <H4>Accessibility</H4>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked={document.documentElement.classList.contains(
                  'monochrome',
                )}
              />
            }
            onClick={formToggle}
            label='Monochrome'
            name='monochrome'
          />
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked={document.documentElement.classList.contains(
                  'inverted',
                )}
              />
            }
            onClick={formToggle}
            label='Inverted Colors'
            name='inverted'
          />
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked={document.documentElement.classList.contains(
                  'bigCursor',
                )}
              />
            }
            onClick={formToggle}
            label='Big Cursor'
            name='bigCursor'
          />
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked={document.documentElement.classList.contains(
                  'highlightLinks',
                )}
              />
            }
            onClick={formToggle}
            label='Highlight Links'
            name='highlightLinks'
          />
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked={document.documentElement.classList.contains(
                  'highlightHeadings',
                )}
              />
            }
            onClick={formToggle}
            label='Highlight Headings'
            name='highlightHeadings'
          />
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked={document.documentElement.classList.contains(
                  'guide',
                )}
              />
            }
            onClick={formToggle}
            label='Reading Guide'
            name='guide'
          />
          {/*<FormControlLabel
              control={<Button />}
              onClick={formToggle}
              label='Reset'
              name='Reset'
            />*/}
        </FormGroup>
      </Card>
      <Card
        className={classes.button}
        onClick={toggleFn}
        elevation={8}
        title='Accessibility Options'>
        {isOpened ? <ArrowBackIcon /> : <SettingsAccessibilityIcon />}
      </Card>
    </StyledBox>
  );
};
export default AccessibilityToolbar;

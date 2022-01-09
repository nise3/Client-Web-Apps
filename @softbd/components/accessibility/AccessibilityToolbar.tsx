import React, {useCallback, useEffect, useState} from 'react';
import {styled} from '@mui/material/styles';
import {
  Box,
  Card,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
} from '@mui/material';
import {H4} from '../../elements/common';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SettingsAccessibilityIcon from '@mui/icons-material/SettingsAccessibility';

const PREFIX = 'InfoCard';

const classes = {
  logo: `${PREFIX}-logo`,
  label: `${PREFIX}-label`,
  card: `${PREFIX}-card`,
  button: `${PREFIX}-button`,
  action: `${PREFIX}-action`,
  downloadLink: `${PREFIX}-downloadLink`,
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
  flexDirection: 'row-reverse',
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
    // padding: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  [`& .${classes.action}`]: {
    width: '100%',
    marginTop: '12px',
  },

  [`& .${classes.downloadLink}`]: {
    textAlign: 'center',
    marginBottom: '0px',
    color: theme.palette.primary.main,
    textDecoration: 'underline',
    fontSize: `${14 / 16}rem`,
  },
}));

const StyledLink = styled('a')(({theme}) => ({
  display: 'block',
  padding: '10px 20px',
  borderRadius: '40px',
  fontSize: `${14 / 16}rem`,
  cursor: 'pointer',
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
  zIndex: 99999,
  position: 'fixed',
  top: '10px',
  left: '50%',
  transition: 'transform 200ms ease 200ms',
  transform: 'translateX(-50%) translateY(-150%)',
  '&:focus': {
    backgroundColor: theme.palette.primary.light,
    transform: 'translateX(-50%) translateY(0%)',
  },
}));

const AccessibilityToolbar = () => {
  // console.log('AccessibilityToolbar');
  const [isOpened, setIsOpened] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const toggleFn = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsOpened(!isOpened);
    },
    [isOpened, setIsOpened],
  );
  const skipFn = useCallback((e) => {
    // console.log('skipFn >>');
    const main = document.querySelector('#maincontent');
    if (!main) {
      e.preventDefault();
      const head =
        document.querySelector('h1') ||
        document.querySelector('h2') ||
        document.querySelector('h3');
      if (head) {
        window.scrollTo({
          left: 0,
          top: -8 + head.getBoundingClientRect().y + window.scrollY,
        });
        head.focus();
      }
    }
  }, []);
  const formToggle = useCallback((e) => {
    // console.log('a11y togg', e?.target?.name);
    if (e?.target?.name) {
      const name = e.target.name;
      // const size = parseInt(document.documentElement.style.fontSize) || 16;
      const classAttr = document?.documentElement?.getAttribute('class') || '';
      const size =
        classAttr.search('fontsize-') >= 0
          ? parseInt(classAttr.split('fontsize-')[1])
          : 16;
      let newClass = classAttr;
      let newSize = size;
      switch (name) {
        case 'fontInc':
          newSize = Math.max(16, Math.min(36, size + 2));
          newClass = classAttr.replace(/fontsize-\d\d/, `fontsize-${newSize}`);
          // document.documentElement.style.fontSize = newSize + 'px';
          document.documentElement.setAttribute('class', newClass);
          document.documentElement.classList.add(`fontsize-${newSize}`);
          break;
        case 'fontDec':
          newSize = Math.max(16, Math.min(36, size - 2));
          newClass = classAttr.replace(/fontsize-\d\d/, `fontsize-${newSize}`);
          // document.documentElement.style.fontSize = newSize + 'px';
          document.documentElement.setAttribute('class', newClass);
          document.documentElement.classList.add(`fontsize-${newSize}`);
          break;
        case 'reset':
          if (e?.target?.parentElement) {
            const checkboxes = e.target.parentElement.querySelectorAll('input');
            for (let elem of checkboxes) {
              // console.log(elem);
              // elem.checked = false;
              const evt = new MouseEvent('click', e);
              if (elem.checked) elem.dispatchEvent(evt);
            }
          }
          // document.documentElement.style.fontSize = 'inherit';
          document.documentElement.setAttribute('class', '');
          break;
        default:
          document.documentElement.classList.toggle(name);
          break;
      }
    }
    localStorage.HTMLClasses = document.documentElement.getAttribute('class');
  }, []);
  useEffect(() => {
    if (window?.localStorage?.HTMLClasses)
      document.documentElement.setAttribute(
        'class',
        window.localStorage.HTMLClasses,
      );
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
    setIsReady(true);
    return () => {
      elem.remove();
      document.documentElement.removeEventListener('mousemove', mousemoveCB);
    };
  }, []);
  return (
    <>
      <StyledLink onClick={skipFn} onKeyPress={skipFn} href='#maincontent'>
        Skip to content
      </StyledLink>
      <StyledBox className={isOpened ? 'opened' : ''}>
        <Card
          tabIndex={0}
          className={classes.button}
          onClick={toggleFn}
          onKeyPress={toggleFn}
          elevation={8}
          title='Accessibility Options'>
          {isOpened ? <ArrowBackIcon /> : <SettingsAccessibilityIcon />}
        </Card>
        <Card className={classes.card} elevation={8}>
          <H4 style={{fontSize: '1.5rem'}}>Accessibility</H4>
          {isReady && (
            <FormGroup>
              <Button
                variant='outlined'
                name='fontInc'
                size='small'
                className={classes.action}
                disabled={!isOpened}
                onClick={formToggle}>
                Increase Font Size
              </Button>
              <Button
                variant='outlined'
                name='fontDec'
                size='small'
                className={classes.action}
                disabled={!isOpened}
                onClick={formToggle}>
                Decrease Font Size
              </Button>
              <div style={{borderBottom: '1px solid #bbb', marginTop: 12}} />
              <FormControlLabel
                control={
                  <Checkbox
                    disabled={!isOpened}
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
                    disabled={!isOpened}
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
                    disabled={!isOpened}
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
                    disabled={!isOpened}
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
                    disabled={!isOpened}
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
                    disabled={!isOpened}
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
              <div style={{borderBottom: '1px solid #bbb'}} />
              <Button
                variant='contained'
                className={classes.action}
                disabled={!isOpened}
                onClick={formToggle}
                name='reset'>
                RESET
              </Button>
              <p className={classes.downloadLink}>
                <a
                  tabIndex={isOpened ? 0 : -1}
                  target='_blank'
                  rel='noreferrer'
                  href='https://www.nvaccess.org/files/nvda/releases/2020.4/nvda_2020.4.exe'>
                  Download Screen Reader
                </a>
              </p>
            </FormGroup>
          )}
        </Card>
      </StyledBox>
    </>
  );
};
export default AccessibilityToolbar;

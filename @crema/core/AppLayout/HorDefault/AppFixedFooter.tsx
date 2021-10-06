import React, {useContext} from 'react';
import AppContext from '../../../utility/AppContext';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import clsx from 'clsx';
import AppContextPropsType from '../../../../types/AppContextPropsType';

const useStyles = makeStyles(theme => ({
  footer: {
    position: 'fixed',
    left: 0,
    bottom: 0,
    width: '100%',
    zIndex: 99,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    margin: '0',
    '& .footerContainer': {
      padding: '5px 20px',
      [theme.breakpoints.up('xl')]: {
        padding: '10px 20px',
      },
    },
  },
  btnRoot: {
    paddingLeft: 20,
    paddingRight: 20,
  },
}));

interface AppFixedFooterProps {
  props?: any;
}

const AppFixedFooter: React.FC<AppFixedFooterProps> = props => {
  const {footer, footerType} = useContext<AppContextPropsType>(AppContext);

  const classes = useStyles(props);

  return (
    <>
      {footer && footerType === 'fixed' ? (
        <Box className={clsx(classes.footer, 'footer')}>
          <Box
            className='footerContainer'
            alignItems='center'
            flexDirection='row'
            display='flex'>
            <Box>Copy right @crema 2020</Box>
            <Box ml='auto'>
              <Button className={classes.btnRoot} color='primary'>
                Buy Now
              </Button>
            </Box>
          </Box>
        </Box>
      ) : null}
    </>
  );
};

export default AppFixedFooter;

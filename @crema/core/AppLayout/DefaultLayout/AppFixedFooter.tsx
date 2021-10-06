import React, {useContext} from 'react';
import AppContext from '../../../utility/AppContext';
import Box from '@mui/material/Box';
import {Button} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import clsx from 'clsx';
import AppContextPropsType from '../../../../types/AppContextPropsType';

const useStyles = makeStyles((theme) => ({
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
      [theme.breakpoints.up('md')]: {
        paddingLeft: 32,
        paddingRight: 32,
      },
      [theme.breakpoints.up('xl')]: {
        padding: '10px 32px',
      },
    },
  },
}));

interface AppFixedFooterProps {
  props?: any;
}

const AppFixedFooter: React.FC<AppFixedFooterProps> = (props) => {
  const {footer, footerType} = useContext<AppContextPropsType>(AppContext);

  const classes = useStyles(props);

  return (
    <>
      {footer && footerType === 'fixed' ? (
        <Box className={clsx(classes.footer, 'footer fixed-footer')}>
          <Box
            className='footerContainer'
            alignItems='center'
            flexDirection='row'
            display='flex'>
            <Box>Copy right @crema 2020</Box>
            <Box ml='auto'>
              <Box px={5}>
                <Button color='primary'>Buy Now</Button>
              </Box>
            </Box>
          </Box>
        </Box>
      ) : null}
    </>
  );
};

export default AppFixedFooter;

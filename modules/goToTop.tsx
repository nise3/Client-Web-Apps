import {Container, Grid} from '@mui/material';
import {useEffect, useState} from 'react';
import makeStyles from '@mui/styles/makeStyles';
import {ArrowUpward} from '@mui/icons-material';

const useStyles = makeStyles((theme) => {
  return {
    backToTop: {
      position: 'fixed',
      cursor: 'pointer',
      bottom: '17%',
      right: '8%',
      padding: '5px',
      margin: '30px auto',
      background: theme.palette.primary.dark,
      height: ' 50px',
      width: '50px',
      borderRadius: '50%',
      transition: 'all 0.2s linear',
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex',
    },
  };
});

const GoToTop = () => {
  const [showButton, setShowButton] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    });
  }, []);

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <Container>
      {showButton && (
        <Grid item className={classes.backToTop}>
          <div onClick={scrollToTop}>
            <ArrowUpward sx={{color: 'background.default', marginTop: '7px'}} />
          </div>
        </Grid>
      )}
    </Container>
  );
};

export default GoToTop;

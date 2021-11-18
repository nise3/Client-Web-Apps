import {Container, Grid} from '@mui/material';
import {useEffect, useState} from 'react';
import {ArrowUpward} from '@mui/icons-material';

const GoToTop = () => {
  const [showButton, setShowButton] = useState(false);

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
        <Grid
          item
          sx={{
            position: 'fixed',
            cursor: 'pointer',
            bottom: '17%',
            right: '8%',
            padding: '5px',
            margin: '30px auto',
            backgroundColor: 'primary.dark',
            height: ' 50px',
            width: '50px',
            borderRadius: '50%',
            transition: 'all 0.2s linear',
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
          }}>
          <div onClick={scrollToTop}>
            <ArrowUpward sx={{color: 'background.default', marginTop: '5px'}} />
          </div>
        </Grid>
      )}
    </Container>
  );
};

export default GoToTop;

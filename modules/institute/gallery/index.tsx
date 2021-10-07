import FilterComponent from '../FilterComponent';
import {Box, Grid} from '@mui/material';
import {makeStyles} from '@mui/styles';

const useStyles = makeStyles((theme) => {
  return {
    mainGrid: {
      marginRight: 'auto',
      marginLeft: 'auto',
    },
  };
});

const InstituteGallery = () => {

  const classes = useStyles();

  return (
    <>
      <Box>
        <Grid className={classes.mainGrid} md={6} sm={6}>
          <FilterComponent />
        </Grid>
      </Box>
    </>
  );
};

export default InstituteGallery;

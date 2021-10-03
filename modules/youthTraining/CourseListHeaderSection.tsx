import React from 'react';
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import useStyles from './index.style';
import {Search} from '@mui/icons-material';

const CourseListHeaderSection = () => {
  const classes: any = useStyles();

  return (
    <Box className={classes.pageRootHeader}>
      <Container maxWidth={'xl'}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={7}>
            <Box fontSize={'16px'}>Search Courses and Training</Box>
            <Card className={classes.searchBox}>
              <Grid container spacing={1}>
                <Grid item xs={9} sm={10} md={10}>
                  <TextField
                    variant='outlined'
                    name='searchBox'
                    placeholder='Search'
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <Search />
                        </InputAdornment>
                      ),
                      className: classes.searchInputBorderHide,
                    }}
                  />
                </Grid>
                <Grid item xs={3} sm={2} md={2}>
                  <Button
                    variant='contained'
                    color={'primary'}
                    className={classes.searchButton}>
                    Search
                  </Button>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={7}>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={4} md={2}>
                <Select
                  id='select1'
                  fullWidth
                  value={1}
                  variant='outlined'
                  className={classes.selectStyle}>
                  <MenuItem value={1}>Select</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={6} sm={4} md={2}>
                <Select
                  id='select1'
                  fullWidth
                  value={1}
                  variant='outlined'
                  className={classes.selectStyle}>
                  <MenuItem value={1}>Select</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={6} sm={4} md={2}>
                <Select
                  id='select1'
                  fullWidth
                  value={1}
                  variant='outlined'
                  className={classes.selectStyle}>
                  <MenuItem value={1}>Select</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={6} sm={4} md={2}>
                <Select
                  id='select1'
                  fullWidth
                  value={1}
                  variant='outlined'
                  className={classes.selectStyle}>
                  <MenuItem value={1}>Select</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={6} sm={4} md={2}>
                <Select
                  id='select1'
                  fullWidth
                  value={1}
                  variant='outlined'
                  className={classes.selectStyle}>
                  <MenuItem value={1}>Select</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={6} sm={4} md={2}>
                <Select
                  id='select1'
                  fullWidth
                  value={1}
                  variant='outlined'
                  className={classes.selectStyle}>
                  <MenuItem value={1}>Select</MenuItem>
                </Select>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CourseListHeaderSection;

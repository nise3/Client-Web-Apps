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
} from '@material-ui/core';
import useStyles from '../../pages/course-list/index.style';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';

const CourseListPage = () => {
  const classes: any = useStyles();

  return (
    <>
      <Box className={classes.pageRootHeader}>
        <Container>
          <Grid container>
            <Grid item xs={12} sm={7} md={7}>
              <Box>Search Courses and Training</Box>
              <Card className={classes.searchBox}>
                <Grid container>
                  <Grid item xs={10} sm={10} md={10}>
                    <TextField
                      variant='outlined'
                      name='searchBox'
                      placeholder='Search'
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <SearchIcon />
                          </InputAdornment>
                        ),
                        className: classes.searchInputBorderHide,
                      }}
                    />
                  </Grid>
                  <Grid item xs={2} sm={2} md={2}>
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
            <Grid item xs={12} sm={7} md={7}>
              <Grid container>
                <Grid item xs={6} sm={4} md={2}>
                  <Select
                    id='select1'
                    autoWidth
                    value={1}
                    variant='outlined'
                    className={classes.selectStyle}>
                    <MenuItem value={1}>Select</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={6} sm={4} md={2}>
                  <Select
                    id='select1'
                    autoWidth
                    value={1}
                    variant='outlined'
                    className={classes.selectStyle}>
                    <MenuItem value={1}>Select</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={6} sm={4} md={2}>
                  <Select
                    id='select1'
                    autoWidth
                    value={1}
                    variant='outlined'
                    className={classes.selectStyle}>
                    <MenuItem value={1}>Select</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={6} sm={4} md={2}>
                  <Select
                    id='select1'
                    autoWidth
                    value={1}
                    variant='outlined'
                    className={classes.selectStyle}>
                    <MenuItem value={1}>Select</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={6} sm={4} md={2}>
                  <Select
                    id='select1'
                    autoWidth
                    value={1}
                    variant='outlined'
                    className={classes.selectStyle}>
                    <MenuItem value={1}>Select</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={6} sm={4} md={2}>
                  <Select
                    id='select1'
                    autoWidth
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
      <Container>
        <Card>sdasd</Card>
      </Container>
    </>
  );
};

export default CourseListPage;

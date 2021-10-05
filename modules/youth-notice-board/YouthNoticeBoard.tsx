import React from 'react';
import {
  Box,
  Container,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import useStyles from './NoticeBoard.style';
import NoticeCard from './NoticeCard';
import SearchIcon from '@mui/icons-material/Search';
import {Pagination} from '@mui/lab';
const YouthNoticeBoard = () => {
  const classes = useStyles();
  return (
    <Container maxWidth={'xl'} className={classes.containerBox}>
      <Box className={classes.noticeTopBox}>
        <Typography variant={'h5'} className={classes.noticeBoardText}>
          Notice Board
        </Typography>
        <Box>
          <Paper component='form' className={classes.paperSearch}>
            <InputBase
              sx={{ml: 1, flex: 1, paddingLeft: '20px'}}
              placeholder='Search'
              inputProps={{'aria-label': 'Search'}}
            />
            <IconButton type='submit' sx={{p: '10px'}} aria-label='search'>
              <SearchIcon />
            </IconButton>
          </Paper>
        </Box>
      </Box>

      <Grid container spacing={5} style={{marginTop: 0}}>
        <Grid item xs={12} md={6}>
          <NoticeCard />
        </Grid>
        <Grid item xs={12} md={6}>
          <NoticeCard />
        </Grid>
        <Grid item xs={12} md={6}>
          <NoticeCard />
        </Grid>
        <Grid item xs={12} md={6}>
          <NoticeCard />
        </Grid>
        <Grid item xs={12} md={6}>
          <NoticeCard />
        </Grid>
        <Grid item xs={12} md={6}>
          <NoticeCard />
        </Grid>
        <Grid item xs={12} md={6}>
          <NoticeCard />
        </Grid>
        <Grid item xs={12} md={6}>
          <NoticeCard />
        </Grid>
        <Grid item xs={12} md={6}>
          <NoticeCard />
        </Grid>
        <Grid item xs={12} md={6}>
          <NoticeCard />
        </Grid>
      </Grid>

      <Box className={classes.paginationBox}>
        <Stack spacing={2}>
          <Pagination count={3} color={'primary'} shape='rounded' />
        </Stack>
      </Box>
    </Container>
  );
};

export default YouthNoticeBoard;

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
import {useIntl} from 'react-intl';
const YouthNoticeBoard = () => {
  const noticeList = [
    {
      id: 1,
      logo: '/images/creativeIt.png',
      title: 'CreativeIt give 20% waver based on result notice',
      providerName: 'CreativeIt Institutes',
      noticeDate: '2021-03-12',
    },
    {
      id: 2,
      logo: '/images/creativeIt.png',
      title: 'CreativeIt give 20% waver based on result notice',
      providerName: 'CreativeIt Institutes',
      noticeDate: '2021-03-12',
    },
    {
      id: 3,
      logo: '/images/creativeIt.png',
      title: 'CreativeIt give 20% waver based on result notice',
      providerName: 'CreativeIt Institutes',
      noticeDate: '2021-03-12',
    },
    {
      id: 4,
      logo: '/images/creativeIt.png',
      title: 'CreativeIt give 20% waver based on result notice',
      providerName: 'CreativeIt Institutes',
      noticeDate: '2021-03-12',
    },
  ];
  const classes = useStyles();
  const {messages} = useIntl();
  return (
    <Container maxWidth={'xl'} className={classes.containerBox}>
      <Box className={classes.noticeTopBox}>
        <Typography variant={'h5'} className={classes.noticeBoardText}>
          {messages['common.notice_board']}
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
        {noticeList.map((notice: any) => {
          return (
            <Grid item xs={12} md={6}>
              <NoticeCard notice={notice} />
            </Grid>
          );
        })}
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

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
import {useFetchNoticeBoard} from '../../../services/niseManagement/hooks';
import {H3} from '../../../@softbd/elements/common';

const YouthNoticeBoard = () => {
  const {data: noticeList} = useFetchNoticeBoard();

  const classes = useStyles();
  const {messages} = useIntl();
  return (
    <Box>
      {noticeList && noticeList.length > 0 ? (
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
            {noticeList?.map((notice: any) => {
              return (
                <Grid item xs={12} md={6} key={notice.id}>
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
      ) : (
        <Container maxWidth={'xl'} className={classes.containerBox}>
          <Box className={classes.noticeTopBox}>
            <Typography variant={'h5'} className={classes.noticeBoardText}>
              {messages['common.notice_board']}
            </Typography>
          </Box>
          <Box>
            <H3>{messages['common.no_data_found']}</H3>
          </Box>
        </Container>
      )}
    </Box>
  );
};

export default YouthNoticeBoard;

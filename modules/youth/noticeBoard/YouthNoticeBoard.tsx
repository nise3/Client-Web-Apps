import React, {useCallback} from 'react';
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
import {debounce} from 'lodash';
import NoDataFoundComponent from '../common/NoDataFoundComponent';

const YouthNoticeBoard = () => {
  const {data: noticeList} = useFetchNoticeBoard();

  const classes = useStyles();
  const {messages} = useIntl();

  const onChangeSearchInput = useCallback((e: any) => {
    console.log(e.target.value);
  }, []);

  return (
    <Container maxWidth={'lg'} className={classes.containerBox}>
      <Box className={classes.noticeTopBox}>
        <Typography variant={'h5'} className={classes.noticeBoardText}>
          {messages['common.notice_board']}
        </Typography>
        <Box>
          <Paper className={classes.paperSearch}>
            <InputBase
              sx={{ml: 1, flex: 1, paddingLeft: '20px'}}
              placeholder={messages['common.search'] as string}
              inputProps={{'aria-label': 'Search'}}
              onChange={debounce(onChangeSearchInput, 1000)}
            />
            <IconButton sx={{p: '10px'}} aria-label='search'>
              <SearchIcon />
            </IconButton>
          </Paper>
        </Box>
      </Box>

      {noticeList && noticeList.length ? (
        <Grid container spacing={3} style={{marginTop: 0}}>
          {noticeList.map((notice: any) => {
            return (
              <Grid item xs={12} md={6} key={notice.id}>
                <NoticeCard notice={notice} />
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <NoDataFoundComponent
          message={messages['common.no_notice_found'] as string}
          messageTextType={'h4'}
        />
      )}

      <Box className={classes.paginationBox}>
        <Stack spacing={2}>
          <Pagination count={3} color={'primary'} shape='rounded' />
        </Stack>
      </Box>
    </Container>
  );
};

export default YouthNoticeBoard;

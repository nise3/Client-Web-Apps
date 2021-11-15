import React, {useCallback, useEffect, useRef, useState} from 'react';
import {styled} from '@mui/material/styles';
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
import NoticeCard from './NoticeCard';
import SearchIcon from '@mui/icons-material/Search';
import {Pagination} from '@mui/lab';
import {useIntl} from 'react-intl';
import NoDataFoundComponent from '../common/NoDataFoundComponent';
import {useFetchPublicNoticeOrNewses} from '../../../services/cmsManagement/hooks';
import NoticeOrNewsTypes from '../../../@softbd/utilities/NoticeOrNewsTypes';
import ShowInTypes from '../../../@softbd/utilities/ShowInTypes';
import {useRouter} from 'next/router';
import {getShowInTypeFromPath} from '../../../@softbd/utilities/helpers';

const PREFIX = 'YouthNoticeBoard';

const classes = {
  noticeBoardText: `${PREFIX}-noticeBoardText`,
  paperSearch: `${PREFIX}-paperSearch`,
  noticeTopBox: `${PREFIX}-noticeTopBox`,
  paginationBox: `${PREFIX}-paginationBox`,
};

const StyledContainer = styled(Container)(({theme}) => ({
  padding: 20,
  [`& .${classes.noticeBoardText}`]: {
    fontWeight: 'bold',
  },

  [`& .${classes.paperSearch}`]: {
    display: 'flex',
    alignItems: 'center',
  },

  [`& .${classes.noticeTopBox}`]: {
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  },

  [`& .${classes.paginationBox}`]: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
  },
}));

const YouthNoticeBoard = () => {
  const {messages} = useIntl();
  const router = useRouter();
  const showInType = getShowInTypeFromPath(router.asPath);
  const inputFieldRef = useRef<any>();
  const page = useRef<any>(1);

  const [noticeFilters, setNoticeFilters] = useState<any>({
    page: 1,
    page_size: 8,
    type: NoticeOrNewsTypes.NOTICE,
  });

  const {data: noticeList, metaData} =
    useFetchPublicNoticeOrNewses(noticeFilters);

  useEffect(() => {
    if (showInType) {
      let params: any = {
        show_in: showInType,
      };

      if (showInType == ShowInTypes.TSP) {
        //params.institute_id = 1;
      }

      setNoticeFilters((prev: any) => {
        return {...prev, ...params};
      });
    }
  }, [showInType]);

  const onSearchClick = useCallback(() => {
    console.log(inputFieldRef.current);
    console.log(inputFieldRef.current?.value);
    setNoticeFilters((params: any) => {
      return {...params, ...{search_text: inputFieldRef.current?.value}};
    });
  }, []);

  const onPaginationChange = useCallback((event: any, currentPage: number) => {
    page.current = currentPage;
    setNoticeFilters((params: any) => {
      return {...params, ...{page: currentPage}};
    });
  }, []);

  return (
    <StyledContainer maxWidth={'lg'}>
      <Box className={classes.noticeTopBox}>
        <Typography
          color={'primary'}
          variant={'h5'}
          className={classes.noticeBoardText}>
          {messages['common.notice_board']}
        </Typography>
        <Box>
          <Paper className={classes.paperSearch}>
            <InputBase
              sx={{ml: 1, flex: 1, paddingLeft: '20px'}}
              placeholder={messages['common.search'] as string}
              inputProps={{'aria-label': 'Search'}}
              ref={inputFieldRef}
            />
            <IconButton
              sx={{p: '10px'}}
              aria-label='search'
              onClick={onSearchClick}>
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

      {metaData && metaData.total_page && metaData.total_page > 1 && (
        <Box className={classes.paginationBox}>
          <Stack spacing={2}>
            <Pagination
              page={page.current}
              count={metaData.total_page}
              color={'primary'}
              shape='rounded'
              onChange={onPaginationChange}
            />
          </Stack>
        </Box>
      )}
    </StyledContainer>
  );
};

export default YouthNoticeBoard;

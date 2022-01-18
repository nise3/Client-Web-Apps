import React, {useCallback, useEffect, useRef, useState} from 'react';
import {styled} from '@mui/material/styles';
import {
  Box,
  Container,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Skeleton,
  Stack,
} from '@mui/material';
import NoticeCard from './NoticeCard';
import SearchIcon from '@mui/icons-material/Search';
import {Pagination} from '@mui/lab';
import {useIntl} from 'react-intl';
import NoDataFoundComponent from '../common/NoDataFoundComponent';
import {useFetchPublicNoticeOrNewses} from '../../../services/cmsManagement/hooks';
import NoticeOrNewsTypes from '../../../@softbd/utilities/NoticeOrNewsTypes';
import ShowInTypes from '../../../@softbd/utilities/ShowInTypes';
import {
  getShowInTypeByDomain,
  objectFilter,
} from '../../../@softbd/utilities/helpers';
import {useVendor} from '../../../@crema/utility/AppHooks';
import {H1} from '../../../@softbd/elements/common';
import PageSizes from '../../../@softbd/utilities/PageSizes';
import KeyCodes from '../../../@softbd/utilities/KeyCodes';

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
    fontSize: '1.421875rem',
    color: theme.palette.primary.main,
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
  const showInType = getShowInTypeByDomain();
  const searchFieldRef = useRef<any>();
  const page = useRef<any>(1);
  const vendor = useVendor();

  const [noticeFilters, setNoticeFilters] = useState<any>({
    page: 1,
    page_size: PageSizes.EIGHT,
    type: NoticeOrNewsTypes.NOTICE,
  });

  const {
    data: noticeList,
    isLoading: isNoticeLoading,
    metaData,
  } = useFetchPublicNoticeOrNewses(objectFilter(noticeFilters));

  useEffect(() => {
    if (showInType) {
      let params: any = {
        show_in: showInType,
      };

      if (showInType == ShowInTypes.TSP) {
        params.institute_id = vendor?.id;
      }

      setNoticeFilters((prev: any) => {
        return {...prev, ...params};
      });
    }
  }, [showInType]);

  const onSearchClick = useCallback((e) => {
    if (e.keyCode && e.keyCode !== KeyCodes.ENTER) {
      return false;
    }

    setNoticeFilters((params: any) => {
      return objectFilter({
        ...params,
        ...{search_text: searchFieldRef.current?.value},
      });
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
        <H1 className={classes.noticeBoardText}>
          {messages['common.notice_board']}
        </H1>
        <Box>
          <Paper className={classes.paperSearch}>
            <InputBase
              sx={{ml: 1, flex: 1, paddingLeft: '20px'}}
              placeholder={messages['common.search'] as string}
              inputProps={{'aria-label': 'Search'}}
              inputRef={searchFieldRef}
              onKeyDown={onSearchClick}
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

      {isNoticeLoading ? (
        <Grid container spacing={2} mt={2}>
          <Grid
            item
            xs={12}
            style={{display: 'flex', justifyContent: 'space-around'}}>
            <Skeleton variant='rectangular' width={'35%'} height={126} />
            <Skeleton variant='rectangular' width={'35%'} height={126} />
          </Grid>
        </Grid>
      ) : noticeList && noticeList.length ? (
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

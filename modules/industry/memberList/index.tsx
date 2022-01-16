import React, {useCallback, useRef, useState} from 'react';
import {styled} from '@mui/material/styles';
import {
  Box,
  Button,
  Chip,
  Container,
  Grid,
  IconButton,
  InputBase,
  Pagination,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import CustomFilterableSelect from '../../youth/training/components/CustomFilterableSelect';
import clsx from 'clsx';
import SearchIcon from '@mui/icons-material/Search';
import {H1, H2} from '../../../@softbd/elements/common';
import {useIntl} from 'react-intl';
import MemberComponent from './MemberComponent';
import {useFetchIndustryMembers} from '../../../services/IndustryManagement/hooks';
import {useCustomStyle} from '../../../@softbd/hooks/useCustomStyle';
import NoDataFoundComponent from '../../youth/common/NoDataFoundComponent';

const PREFIX = 'IndustryMemberList';

const classes = {
  gridMargin: `${PREFIX}-gridMargin`,
  selectStyle: `${PREFIX}-selectStyle`,
  filterBox: `${PREFIX}-filterBox`,
  chipStyle: `${PREFIX}-chipStyle`,
};

const StyledContainer = styled(Container)(({theme}) => ({
  [`& .${classes.gridMargin}`]: {
    marginLeft: '15px',
    [theme.breakpoints.only('xs')]: {
      marginLeft: 0,
      marginTop: '15px',
    },
  },
  [`& .${classes.selectStyle}`]: {
    minWidth: '220px',
    [theme.breakpoints.only('xs')]: {
      width: '100%',
    },
  },
  [`& .${classes.filterBox}`]: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    [theme.breakpoints.only('xs')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },
  [`& .${classes.chipStyle}`]: {
    color: theme.palette.primary.light,
    padding: '3px 7px',
    marginLeft: '10px',
  },
}));

const MemberListPage = () => {
  const {messages, formatNumber} = useIntl();
  const result = useCustomStyle();

  const inputFieldRef = useRef<any>();
  const page = useRef<any>(1);

  //Todo: industry_association_id is static now. Have to update after implement domain base implementation is done
  const [industryMemberFilter, setIndustryMemberFilter] = useState<any>({
    industry_association_id: 2,
    page: 1,
    page_size: 8,
  });

  const {data, isLoading, metaData} =
    useFetchIndustryMembers(industryMemberFilter);

  const onResetClicked = useCallback(() => {
    setIndustryMemberFilter({
      industry_association_id: 2,
      page: 1,
      page_size: 8,
    });
  }, []);

  const onPaginationChange = useCallback((event: any, currentPage: number) => {
    page.current = currentPage;
    setIndustryMemberFilter((prev: any) => ({
      ...prev,
      ...{page: page.current},
    }));
  }, []);

  const onSearch = useCallback(() => {
    page.current = 1;
    setIndustryMemberFilter((param: any) => {
      return {...param, ...{title: inputFieldRef.current?.value}};
    });
  }, []);

  return (
    <StyledContainer maxWidth='lg' sx={{marginBottom: '25px'}}>
      <H1
        py={3}
        sx={{
          ...result.h2,
          fontWeight: 'bold',
        }}
        centered={true}>
        {messages['common.member_list']}
      </H1>

      <Grid container justifyContent={'space-between'} mt={3}>
        <Grid item>
          <Box className={classes.filterBox}>
            <Box display={'flex'}>
              <FilterListIcon />
              <Typography sx={{marginLeft: '15px'}}>
                {messages['common.filter']}
              </Typography>
            </Box>

            <Box display={'flex'}>
              <CustomFilterableSelect
                id='title'
                label={messages['common.company_name']}
                isLoading={isLoading}
                optionValueProp={'id'}
                options={data}
                optionTitleProp={['title']}
                className={clsx(classes.gridMargin, classes.selectStyle)}
              />
              <Button
                onClick={onResetClicked}
                variant={'contained'}
                size={'small'}
                color={'primary'}
                className={classes.gridMargin}
                sx={{height: '40px', marginLeft: '15px !important'}}>
                {messages['common.reset']}
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item>
          <Paper
            style={{
              display: 'flex',
              width: 220,
              height: '40px',
            }}
            className={classes.gridMargin}>
            <InputBase
              size={'small'}
              style={{
                paddingLeft: '20px',
              }}
              placeholder={messages['common.search'] as string}
              inputProps={{'aria-label': 'Search'}}
              inputRef={inputFieldRef}
              onKeyDown={(event) => {
                if (event.code == 'Enter') onSearch();
              }}
            />
            <IconButton sx={{p: '5px'}} aria-label='search' onClick={onSearch}>
              <SearchIcon />
            </IconButton>
          </Paper>
        </Grid>
      </Grid>

      {isLoading ? (
        <Grid container spacing={1}>
          <Grid
            item
            xs={12}
            sx={{display: 'flex', justifyContent: 'space-evenly'}}>
            <Skeleton variant='rectangular' width={'22%'} height={140} />
            <Skeleton variant='rectangular' width={'22%'} height={140} />
            <Skeleton variant='rectangular' width={'22%'} height={140} />
            <Skeleton variant='rectangular' width={'22%'} height={140} />
          </Grid>
        </Grid>
      ) : data && data.length > 0 ? (
        <React.Fragment>
          <H2
            gutterBottom
            mt={3}
            mb={3}
            sx={{
              ...result.h6,
            }}>
            {messages['common.total_result']}{' '}
            <Chip
              label={formatNumber(data ? data.length : '0')}
              className={classes.chipStyle}
            />
          </H2>

          {data && data.length > 0 && (
            <Grid container spacing={3}>
              {data.map((member: any) => (
                <Grid item xs={12} key={member.id}>
                  <MemberComponent member={member} />
                </Grid>
              ))}
            </Grid>
          )}
        </React.Fragment>
      ) : (
        <Grid item xs={12}>
          <NoDataFoundComponent />
        </Grid>
      )}

      {metaData?.total_page > 1 && (
        <Stack spacing={2} mt={3} alignItems={'center'}>
          <Pagination
            page={page.current}
            count={metaData.total_page}
            color={'primary'}
            shape='rounded'
            onChange={onPaginationChange}
          />
        </Stack>
      )}
    </StyledContainer>
  );
};

export default MemberListPage;

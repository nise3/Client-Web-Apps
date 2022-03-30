import React, {useCallback, useEffect, useRef, useState} from 'react';
import {styled} from '@mui/material/styles';
import {
  Button,
  Chip,
  Container,
  Grid,
  Pagination,
  Skeleton,
  Stack,
} from '@mui/material';
import {H1, H2, NavLink as Link} from '../../../@softbd/elements/common';
import {useIntl} from 'react-intl';
import MemberComponent from './MemberComponent';
import {useFetchPublicIndustryMembers} from '../../../services/IndustryManagement/hooks';
import {useCustomStyle} from '../../../@softbd/hooks/useCustomStyle';
import NoDataFoundComponent from '../../youth/common/NoDataFoundComponent';
import PageSizes from '../../../@softbd/utilities/PageSizes';
import MemberListSearchSection from './MemberListSearchSection';
import {objectFilter} from '../../../@softbd/utilities/helpers';
import {LINK_FRONTEND_INDUSTRY_MEMBER_REGISTRATION} from '../../../@softbd/common/appLinks';

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
  const [selectedMemberTitle] = useState<any>('');

  const page = useRef<any>(1);

  const [industryMemberFilter, setIndustryMemberFilter] = useState<any>({
    page: 1,
    page_size: PageSizes.EIGHT,
  });

  const {data, isLoading, metaData} =
    useFetchPublicIndustryMembers(industryMemberFilter);

  const onPaginationChange = useCallback((event: any, currentPage: number) => {
    page.current = currentPage;
    setIndustryMemberFilter((prev: any) => ({
      ...prev,
      ...{page: page.current},
    }));
  }, []);

  useEffect(() => {
    page.current = 1;
    setIndustryMemberFilter((param: any) => {
      return {...param, ...{title: selectedMemberTitle}};
    });
  }, [selectedMemberTitle]);

  const filterMemberList = useCallback((filterKey: any, filterValue: any) => {
    const newFilter: any = {};
    newFilter[filterKey] = filterValue;

    setIndustryMemberFilter((prev: any) => {
      return objectFilter({...prev, ...newFilter});
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

      <MemberListSearchSection addFilterKey={filterMemberList} />

      {isLoading ? (
        <Grid container spacing={1} mt={5}>
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
          <Grid container>
            <Grid item xs={12} md={6}>
              <H2
                gutterBottom
                mt={3}
                mb={3}
                sx={{
                  ...result.h6,
                }}>
                {messages['member.total_result']}{' '}
                <Chip
                  label={formatNumber(data ? data.length : '0')}
                  className={classes.chipStyle}
                />
              </H2>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{display: 'flex', justifyContent: 'end'}}>
              <H2
                gutterBottom
                mt={3}
                mb={3}
                sx={{
                  ...result.h6,
                }}>
                {messages['member.be_our_member']}
              </H2>
              <Link href={LINK_FRONTEND_INDUSTRY_MEMBER_REGISTRATION}>
                <Button
                  variant='contained'
                  size='small'
                  sx={{marginY: 3, marginLeft: 2}}>
                  {messages['common.register']}
                </Button>
              </Link>
            </Grid>
          </Grid>

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
        <Grid item xs={12} marginY={15}>
          <NoDataFoundComponent messageType={messages['common.member']} />
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

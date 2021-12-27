import React, {useCallback, useContext, useRef, useState} from 'react';
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
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import CustomFilterableSelect from '../../youth/training/components/CustomFilterableSelect';
import clsx from 'clsx';
import SearchIcon from '@mui/icons-material/Search';
import {H1, H2} from '../../../@softbd/elements/common';
import {useIntl} from 'react-intl';
import MemberComponent from './MemberComponent';
import {useFetchIndustryMembers} from '../../../services/IndustryManagement/hooks';
import {objectFilter} from '../../../@softbd/utilities/helpers';
import AppContextPropsType from '../../../redux/types/AppContextPropsType';
import AppContext from '../../../@crema/utility/AppContext';
import AppLocale from '../../../shared/localization';
import typography from '../../../@softbd/layouts/themes/default/typography';
import {useCustomStyle} from '../../../@softbd/hooks/useCustomStyle';

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

const dummyData = {
  isLoading: false,
  total_page: 2,
};

const MemberListPage = () => {
  const {messages, formatNumber} = useIntl();
  const result = useCustomStyle();
  const inputFieldRef = useRef<any>();
  const page = useRef<any>(1);
  const [industryMemberFilter, setIndustryMemberFilter] = useState<any>({
    page: 1,
    page_size: 8,
  });
  const {data} = useFetchIndustryMembers(industryMemberFilter);
  console.log('data->', data);

  const onResetClicked = useCallback(() => {}, []);

  const onPaginationChange = useCallback((event: any, currentPage: number) => {
    page.current = currentPage;
    setIndustryMemberFilter((prev: any) => ({
      ...prev,
      ...{page: page.current},
    }));
  }, []);

  const onSearch = useCallback(() => {
    page.current = 1;
    setIndustryMemberFilter((prev: any) =>
      objectFilter({
        ...prev,
        ...{page: page.current, search_text: inputFieldRef.current?.value},
      }),
    );
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
                id='company'
                label={messages['common.company_name']}
                isLoading={false}
                optionValueProp={'id'}
                options={[]}
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

      {dummyData.isLoading ? (
        <Typography variant={'h6'} alignItems={'center'}>
          {messages['common.no_data_found']}
        </Typography>
      ) : (
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

          {dummyData?.total_page > 1 && (
            <Stack spacing={2} mt={3} alignItems={'center'}>
              <Pagination
                page={page.current}
                count={dummyData?.total_page}
                color={'primary'}
                shape='rounded'
                onChange={onPaginationChange}
              />
            </Stack>
          )}
        </React.Fragment>
      )}
    </StyledContainer>
  );
};

export default MemberListPage;

import React, {useCallback, useRef} from 'react';
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
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import CustomFilterableSelect from '../../youth/training/components/CustomFilterableSelect';
import clsx from 'clsx';
import SearchIcon from '@mui/icons-material/Search';
import {H2} from '../../../@softbd/elements/common';
import {useIntl} from 'react-intl';

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
      alignItems: 'flex-end',
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
  const inputFieldRef = useRef<any>();
  const page = useRef<any>(1);

  const onResetClicked = useCallback(() => {}, []);

  const onPaginationChange = useCallback((event: any, currentPage: number) => {
    //page.current = currentPage;
  }, []);
  const onChangeCompany = useCallback((companyId: number | null) => {}, []);

  const onSearch = useCallback(() => {
    //inputFieldRef.current?.value
  }, []);

  return (
    <StyledContainer maxWidth='lg' sx={{marginBottom: '25px'}}>
      <H2 py={3} fontWeight={'bold'} centered={true}>
        {messages['industry.member_list']}
      </H2>

      <Grid container justifyContent={'space-between'} mt={3}>
        <Grid item>
          <Box className={classes.filterBox}>
            <Box display={'flex'}>
              <FilterListIcon />
              <Typography sx={{marginLeft: '15px'}}>
                {messages['common.filter']}
              </Typography>
            </Box>

            <CustomFilterableSelect
              id='company'
              label={messages['common.company_name']}
              isLoading={false}
              optionValueProp={'id'}
              options={[]}
              optionTitleProp={['title']}
              onChange={onChangeCompany}
              className={clsx(classes.gridMargin, classes.selectStyle)}
            />
            <Button
              onClick={onResetClicked}
              variant={'contained'}
              size={'small'}
              color={'primary'}
              className={classes.gridMargin}
              sx={{height: '40px'}}>
              {messages['common.reset']}
            </Button>
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
      <Typography gutterBottom variant='h6' mt={3}>
        {messages['common.total_result']}{' '}
        <Chip label={formatNumber(10)} className={classes.chipStyle} />
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          fdff
        </Grid>
        <Grid item xs={12}>
          asdasd
        </Grid>
        <Grid item xs={12}>
          asdasd
        </Grid>
      </Grid>

      <Stack spacing={2} alignItems={'center'}>
        <Pagination
          page={page.current}
          count={5}
          color={'primary'}
          shape='rounded'
          onChange={onPaginationChange}
        />
      </Stack>
    </StyledContainer>
  );
};

export default MemberListPage;

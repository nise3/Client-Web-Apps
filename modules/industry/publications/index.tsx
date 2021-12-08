import React, {useCallback} from 'react';
import {
  Box,
  Button,
  CardMedia,
  Container,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Typography,
} from '@mui/material';
import {H2, H6} from '../../../@softbd/elements/common';
import FilterListIcon from '@mui/icons-material/FilterList';
import CustomFilterableSelect from '../../youth/training/components/CustomFilterableSelect';
import clsx from 'clsx';
import SearchIcon from '@mui/icons-material/Search';
import {styled} from '@mui/material/styles';
import {useIntl} from 'react-intl';

const PREFIX = 'Publications';
const classes = {
  resetButton: `${PREFIX}-resetButton`,
  cardTitle: `${PREFIX}-cardTitle`,
  gridMargin: `${PREFIX}-gridMargin`,
  selectStyle: `${PREFIX}-selectStyle`,
  filterBox: `${PREFIX}-filterBox`,
  chipStyle: `${PREFIX}-chipStyle`,
  imageBox: `${PREFIX}-imageBox`,
};

const StyledContainer = styled(Container)(({theme}) => ({
  [`& .${classes.resetButton}`]: {
    [theme.breakpoints.up('md')]: {
      paddingLeft: '3% !important',
    },
  },
  [`& .${classes.cardTitle}`]: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  [`& .${classes.chipStyle}`]: {
    color: theme.palette.primary.light,
    padding: '3px 7px',
    marginLeft: '10px',
  },
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
  [`& .${classes.imageBox}`]: {
    position: 'relative',
    boxShadow: '0px 0px 3px 1px #9e9e9e',
    [`&::after`]: {
      content: '""',
      position: 'absolute',
      top: 0,
      width: '100%',
      height: '100%',
      backgroundImage:
        'linear-gradient(to right, transparent 2%, #0000001f 3%, #00000059 4%, transparent 5%)',
    },
  },
}));
const Publications = () => {
  const {messages} = useIntl();
  const publications = [
    {
      id: 1,
      title: 'Lizard a widespread group of squamate reptiles',
    },
    {
      id: 2,
      title: 'Lizard a widespread group of squamate reptiles',
    },
    {
      id: 3,
      title: 'Lizard a widespread group of squamate reptiles',
    },
    {
      id: 4,
      title: 'Lizard a widespread group of squamate reptiles',
    },
  ];
  const onResetClicked = useCallback(() => {}, []);
  const onChangeWriter = useCallback((writerId: number | null) => {}, []);
  return (
    <>
      <Grid container sx={{maxWidth: '100%'}}>
        <Grid item xs={12} textAlign={'center'}>
          <H2 py={3} fontWeight={'bold'}>
            {messages['industry.publications']}
          </H2>
        </Grid>
      </Grid>
      <StyledContainer maxWidth='lg' sx={{marginBottom: '25px'}}>
        <Grid container mt={4} justifyContent={'center'}>
          <Grid item md={12}>
            <Grid container justifyContent={'space-between'}>
              <Grid item>
                <Box className={classes.filterBox}>
                  <Box display={'flex'}>
                    <FilterListIcon />
                    <Typography sx={{marginLeft: '15px'}}>
                      {messages['filter.institute']}
                    </Typography>
                  </Box>

                  <CustomFilterableSelect
                    id='writer_id'
                    label={messages['industry.writer_name']}
                    defaultValue={''}
                    isLoading={false}
                    optionValueProp={'id'}
                    options={[]}
                    optionTitleProp={['title']}
                    onChange={onChangeWriter}
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
                    onKeyDown={(event) => {
                      /*   if (event.code == 'Enter') onSearch();*/
                    }}
                  />
                  <IconButton sx={{p: '5px'}} aria-label='search'>
                    <SearchIcon />
                  </IconButton>
                </Paper>
              </Grid>
            </Grid>
          </Grid>

          <Grid item md={12} mt={{xs: 4, md: 5}}>
            <Grid container>
              <Grid item xs={12}>
                <Grid container spacing={5}>
                  {publications.map((publication) => {
                    return (
                      <Grid
                        item
                        md={3}
                        justifyContent={'center'}
                        mt={3}
                        key={publication.id}>
                        <Box className={classes.imageBox} sx={{maxWidth: 345}}>
                          <CardMedia
                            component='img'
                            height='370'
                            image='/images/testPublication.png'
                            alt='publication'
                          />
                        </Box>
                        <H6>{publication?.title}</H6>
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </StyledContainer>
    </>
  );
};

export default Publications;

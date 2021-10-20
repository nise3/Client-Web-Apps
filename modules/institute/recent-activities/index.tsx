import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import usePagination from '@mui/material/usePagination';
import {DateRangeOutlined} from '@mui/icons-material';
import {styled} from '@mui/material/styles';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import {
  useFetchInstitutesAllActivity,
  useFetchInstitutesRecentActivity,
} from '../../../services/instituteManagement/hooks';
import {useIntl} from 'react-intl';
import Link from 'next/link';

function srcset(image: string, size: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}%&h=${size * rows}%&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

const List = styled('ul')({
  listStyle: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
});

const useStyles = makeStyles((theme) => {
  return {
    typographyNumber: {
      color: theme.palette.primary.dark,
      marginLeft: '5px',
      backgroundColor: theme.palette.primary.light,
      padding: '0 5px',
    },
    cardMainGrid: {
      marginRight: 'auto',
      marginLeft: 'auto',
    },
    filterMainGrid: {
      marginRight: 'auto',
      marginLeft: 'auto',
      justifyContent: 'space-between',
    },
    dateInfo: {
      background: theme.palette.common.white,
      color: theme.palette.primary.light,
      display: 'flex',
      padding: '4px',
      width: '130px',
      borderRadius: '5px',
      marginBottom: '10px',
    },
    titleTypography: {
      color: theme.palette.primary.dark,
    },
    pagination: {
      marginRight: 'auto',
      marginLeft: 'auto',
    },
    image: {
      overflow: 'hidden',
    },
    imageTexts: {
      position: 'absolute',
      bottom: '5%',
      left: '4%',
    },
  };
});

const RecentActivities = () => {
  const classes = useStyles();
  const {messages} = useIntl();

  const {items} = usePagination({
    count: 3,
  });

  const {data: recentActivitiesItems} = useFetchInstitutesRecentActivity();
  const {data: allActivitiesItems} = useFetchInstitutesAllActivity();

  return (
    <Container maxWidth={'md'}>
      <Grid container>
        <Grid item md={12} mt={8}>
          <Typography
            className={classes.titleTypography}
            gutterBottom
            variant='h4'
            component='div'
            display={'flex'}>
            {messages['recent_activities.institute']}
          </Typography>
          {recentActivitiesItems && recentActivitiesItems.length > 0 && (
            <ImageList
              sx={{width: '100%', height: 'auto'}}
              variant='quilted'
              cols={4}
              rowHeight={170}
              className={classes.image}>
              {recentActivitiesItems.map((item: any) => (
                <ImageListItem
                  key={item.id}
                  cols={item.cols || 1}
                  rows={item.rows || 1}
                  style={{position: 'relative'}}>
                  <img
                    {...srcset(item.img, 25, item.rows, item.cols)}
                    alt={item.title}
                    loading='lazy'
                  />
                  <Box className={classes.imageTexts}>
                    <Box className={classes.dateInfo}>
                      <DateRangeOutlined />
                      <Typography>{item.date}</Typography>
                    </Box>
                    <Link
                      href={`/institute/recent-activities/${item.id}`}
                      passHref>
                      <Typography
                        style={{
                          fontWeight: 'bold',
                          color: 'white',
                          cursor: 'pointer',
                        }}
                        variant='subtitle2'
                        component='div'>
                        {item.title}
                      </Typography>
                    </Link>
                  </Box>
                </ImageListItem>
              ))}
            </ImageList>
          )}
        </Grid>
        <Grid item mt={8}>
          <Typography
            className={classes.titleTypography}
            gutterBottom
            variant='h4'
            component='div'
            display={'flex'}>
            {messages['all_activities.institute']}
          </Typography>
          {allActivitiesItems && allActivitiesItems.length > 0 && (
            <Grid container spacing={5}>
              {allActivitiesItems?.map((data: any) => {
                return (
                  <Grid
                    item
                    md={3}
                    justifyContent={'center'}
                    mt={3}
                    key={data.id}>
                    <Card>
                      <CardActionArea>
                        <CardMedia
                          component='img'
                          height='140'
                          image={data.img}
                          alt='random image'
                        />
                        <CardContent>
                          <Box className={classes.dateInfo}>
                            <DateRangeOutlined />
                            <Typography>{data.date}</Typography>
                          </Box>
                          <Link
                            href={`/institute/recent-activities/${data.id}`}>
                            <Typography
                              style={{fontWeight: 'bold'}}
                              variant='subtitle2'
                              component='div'>
                              {data.title}
                            </Typography>
                          </Link>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          )}
        </Grid>
        <Grid mt={5} item className={classes.pagination}>
          <nav>
            <List>
              {items.map(({page, type, selected, ...item}, index) => {
                let children;
                if (type === 'start-ellipsis' || type === 'end-ellipsis') {
                  children = '…';
                } else if (type === 'page') {
                  children = (
                    <button
                      type='button'
                      style={{
                        fontWeight: selected ? 'bold' : undefined,
                        padding: '10px',
                      }}
                      {...item}>
                      {page}
                    </button>
                  );
                } else {
                  children = (
                    <button style={{padding: '10px'}} type='button' {...item}>
                      {type}
                    </button>
                  );
                }
                return <li key={index}>{children}</li>;
              })}
            </List>
          </nav>
        </Grid>
      </Grid>
    </Container>
  );
};

export default RecentActivities;

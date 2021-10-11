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

function srcset(image: string, size: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}%&h=${size * rows}%&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

const imageData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Doors',
    date: '১৬ জুন ২০২১',
    content: 'সাদাত সৃতি পল্লিতে দেয়া হয় কম্পিউটার প্রশিক্ষণ',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Doors',
    date: '১৬ জুন ২০২১',
    content: 'সাদাত সৃতি পল্লিতে দেয়া হয় কম্পিউটার প্রশিক্ষণ',
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Doors',
    date: '১৬ জুন ২০২১',
    content: 'সাদাত সৃতি পল্লিতে দেয়া হয় কম্পিউটার প্রশিক্ষণ',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Doors',
    date: '১৬ জুন ২০২১',
    content: 'সাদাত সৃতি পল্লিতে দেয়া হয় কম্পিউটার প্রশিক্ষণ',

  },
];

const cardData = [
  {
    date: '১৩ জুন ২০২১',
    content: 'সাদাত সৃতি পল্লিতে দেয়া হয় কম্পিউটার প্রশিক্ষণ',
  },
  {
    date: '১৪জুন ২০২১',
    content: 'সাদাত সৃতি পল্লিতে দেয়া হয় কম্পিউটার প্রশিক্ষণ',
  },
  {
    date: '১৫ জুন ২০২১',
    content: 'সাদাত সৃতি পল্লিতে দেয়া হয় কম্পিউটার প্রশিক্ষণ',
  },
  {
    date: '১৬ জুন ২০২১',
    content: 'সাদাত সৃতি পল্লিতে দেয়া হয় কম্পিউটার প্রশিক্ষণ',
  },
  {
    date: '১৩ জুন ২০২১',
    content: 'সাদাত সৃতি পল্লিতে দেয়া হয় কম্পিউটার প্রশিক্ষণ',
  },
  {
    date: '১৪জুন ২০২১',
    content: 'সাদাত সৃতি পল্লিতে দেয়া হয় কম্পিউটার প্রশিক্ষণ',
  },
  {
    date: '১৫ জুন ২০২১',
    content: 'সাদাত সৃতি পল্লিতে দেয়া হয় কম্পিউটার প্রশিক্ষণ',
  },
  {
    date: '১৬ জুন ২০২১',
    content: 'সাদাত সৃতি পল্লিতে দেয়া হয় কম্পিউটার প্রশিক্ষণ',
  },
];

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
  const {items} = usePagination({
    count: 3,
  });

  return (
    <Container maxWidth={'md'}>
      <Grid container>
        <Grid item md={12} mt={8}>
          <Typography className={classes.titleTypography} gutterBottom variant='h4' component='div'
                      display={'flex'}>
            সাম্প্রতিক কার্যক্রম
          </Typography>
          <ImageList
            sx={{width: '100%', height: 'auto'}}
            variant='quilted'
            cols={4}
            rowHeight={170}
            className={classes.image}
          >
            {imageData.map((item) => (
              <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1} style={{position: 'relative'}}>
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
                  <Typography style={{fontWeight: 'bold', color: 'white'}} variant='subtitle2' component='div'>
                    {item.content}
                  </Typography>
                </Box>
              </ImageListItem>
            ))}
          </ImageList>
        </Grid>
        <Grid item mt={8}>
          <Typography className={classes.titleTypography} gutterBottom variant='h4' component='div'
                      display={'flex'}>
            সকল কার্যক্রম
          </Typography>
          <Grid container spacing={5}>
            {cardData.map((data: any, i) => {
              return (
                <Grid item md={3} justifyContent={'center'} mt={3} key={i}>
                  <Card>
                    <CardActionArea>
                      <CardMedia
                        component='img'
                        height='140'
                        image='https://images.unsplash.com/photo-1552664730-d307ca884978?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80'
                        alt='random image'
                      />
                      <CardContent>
                        <Box className={classes.dateInfo}>
                          <DateRangeOutlined />
                          <Typography>{data.date}</Typography>
                        </Box>
                        <Typography style={{fontWeight: 'bold'}} variant='subtitle2' component='div'>
                          {data.content}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
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
                      {...item}
                    >
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

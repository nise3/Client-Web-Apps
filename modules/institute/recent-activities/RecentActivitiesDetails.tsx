import {makeStyles} from '@mui/styles';
import {
  Box,
  CardMedia,
  Container,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ShareIcon from '@mui/icons-material/Share';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import SystemUpdateAltOutlinedIcon from '@mui/icons-material/SystemUpdateAltOutlined';
import DateRangeIcon from '@mui/icons-material/DateRange';
import {H6} from '../../../@softbd/elements/common';

const useStyles = makeStyles((theme) => ({
  date: {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.primary.main,
  },
}));

const RecentActivitiesDetails = ({data}: any) => {
  const classes = useStyles();

  return (
    <Container maxWidth={'xl'}>
      <Grid container spacing={3} padding={10}>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={6}>
              <Box className={classes.date}>
                <DateRangeIcon />
                <Typography>{data.date}</Typography>
              </Box>
            </Grid>
            <Grid item xs={6} textAlign={'right'}>
              <IconButton>
                <ThumbUpAltIcon
                  style={{
                    backgroundColor: '#008fff',
                    color: '#ffff',
                    padding: '2px',
                  }}
                />
              </IconButton>
              <IconButton>
                <ShareIcon
                  style={{
                    backgroundColor: '#0054ffe8',
                    color: '#ffff',
                    padding: '2px',
                  }}
                />
              </IconButton>
              <IconButton>
                <PrintOutlinedIcon
                  style={{
                    backgroundColor: '#ffb700b8',
                    color: '#ffff',
                    padding: '2px',
                  }}
                />
              </IconButton>
              <IconButton>
                <SystemUpdateAltOutlinedIcon
                  style={{
                    backgroundColor: '#2fc94d',
                    color: '#ffff',
                    padding: '2px',
                  }}
                />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <H6>{data.title}</H6>
        </Grid>
        <Grid item xs={12}>
          <CardMedia
            component='img'
            height='300'
            image={data.img}
            alt='image'
          />
        </Grid>
        <Grid item xs={12}>
          {data.content}
        </Grid>
      </Grid>
    </Container>
  );
};

export default RecentActivitiesDetails;

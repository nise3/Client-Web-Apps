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
import {H4} from '../../../@softbd/elements/common';

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
    <Container maxWidth={'lg'}>
      <Grid container>
        <Grid item xs={12} mt={3}>
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
                    borderRadius: '3px',
                  }}
                />
              </IconButton>
              <IconButton>
                <ShareIcon
                  style={{
                    backgroundColor: '#0054ffe8',
                    color: '#ffff',
                    padding: '2px',
                    borderRadius: '3px',
                  }}
                />
              </IconButton>
              <IconButton>
                <PrintOutlinedIcon
                  style={{
                    backgroundColor: '#ffb700b8',
                    color: '#ffff',
                    padding: '2px',
                    borderRadius: '3px',
                  }}
                />
              </IconButton>
              <IconButton>
                <SystemUpdateAltOutlinedIcon
                  style={{
                    backgroundColor: '#2fc94d',
                    color: '#ffff',
                    padding: '2px',
                    borderRadius: '3px',
                  }}
                />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <H4 fontWeight={'bold'}>{data.title}</H4>
        </Grid>
        <Grid item xs={12} my={3}>
          <CardMedia
            component='img'
            height='300'
            image={data.img}
            alt='image'
          />
        </Grid>
        <Grid item xs={12}>
          <div dangerouslySetInnerHTML={{__html: data.content}} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default RecentActivitiesDetails;

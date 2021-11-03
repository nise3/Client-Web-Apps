import {makeStyles} from '@mui/styles';
import {
  Box,
  CardMedia,
  Container,
  Grid,
  Tooltip,
  Typography,
} from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ShareIcon from '@mui/icons-material/Share';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import SystemUpdateAltOutlinedIcon from '@mui/icons-material/SystemUpdateAltOutlined';
import DateRangeIcon from '@mui/icons-material/DateRange';
import {H4} from '../../../@softbd/elements/common';
import {useIntl} from 'react-intl';

const useStyles = makeStyles((theme) => ({
  date: {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.primary.main,
  },
  icon: {
    color: '#ffff',
    padding: '2px',
    borderRadius: '3px',
    '&:not(:last-child)': {marginRight: '10px'},
  },
}));

const RecentActivitiesDetails = ({data}: any) => {
  const classes = useStyles();
  const {messages} = useIntl();

  return (
    <Container maxWidth={'lg'}>
      <Grid container>
        <Grid item xs={12} mt={5}>
          <Grid container>
            <Grid item xs={6}>
              <Box className={classes.date}>
                <DateRangeIcon />
                <Typography>{data.date}</Typography>
              </Box>
            </Grid>
            <Grid item xs={6} textAlign={'right'}>
              <Tooltip title={messages['common.like']}>
                <ThumbUpAltIcon
                  className={classes.icon}
                  sx={{backgroundColor: '#008fff'}}
                />
              </Tooltip>
              <Tooltip title={messages['common.share_label']}>
                <ShareIcon
                  className={classes.icon}
                  sx={{backgroundColor: '#4E4E98'}}
                />
              </Tooltip>
              <Tooltip title={messages['common.print']}>
                <PrintOutlinedIcon
                  className={classes.icon}
                  sx={{backgroundColor: '#ffb700b8'}}
                />
              </Tooltip>
              <Tooltip title={messages['common.download_label']}>
                <SystemUpdateAltOutlinedIcon
                  className={classes.icon}
                  sx={{backgroundColor: '#2fc94d'}}
                />
              </Tooltip>
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
            alt={data?.title}
            title={data?.title}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography dangerouslySetInnerHTML={{__html: data.content}} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default RecentActivitiesDetails;

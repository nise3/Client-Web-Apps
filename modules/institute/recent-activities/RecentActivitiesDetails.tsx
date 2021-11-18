import {styled} from '@mui/material/styles';
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
import {getIntlDateFromString} from '../../../@softbd/utilities/helpers';
import VideoPlayer from '../videos/videoPlayer';

const PREFIX = 'RecentActivitiesDetails';

const classes = {
  date: `${PREFIX}-date`,
  icon: `${PREFIX}-icon`,
};

const StyledContainer = styled(Container)(({theme}) => ({
  [`& .${classes.date}`]: {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.primary.main,
  },

  [`& .${classes.icon}`]: {
    color: '#ffff',
    padding: '2px',
    borderRadius: '3px',
    '&:not(:last-child)': {marginRight: '10px'},
  },
}));

const RecentActivitiesDetails = ({data}: any) => {
  console.log('data->', data);
  const {messages, formatDate} = useIntl();

  return (
    <StyledContainer maxWidth={'lg'}>
      <Grid container>
        <Grid item xs={12} mt={5}>
          <Grid container>
            <Grid item xs={6}>
              <Box className={classes.date}>
                <DateRangeIcon />
                <Typography>
                  {getIntlDateFromString(formatDate, data.published_at)}
                </Typography>
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
          {data.content_type && data.content_type == 1 && (
            <CardMedia
              component='img'
              height='300'
              image={data.content_path}
              alt={data?.title}
              title={data?.title}
            />
          )}

          {(data.content_type && data.content_type == 2) ||
            (data.content_type && data.content_type == 3 && (
              <VideoPlayer url={data.video_url} />
            ))}
        </Grid>

        <Grid item xs={12}>
          <Typography dangerouslySetInnerHTML={{__html: data.description}} />
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default RecentActivitiesDetails;

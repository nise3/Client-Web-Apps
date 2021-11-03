import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import {DateRangeOutlined} from '@mui/icons-material';
import Link from 'next/link';
import makeStyles from '@mui/styles/makeStyles';
import {useRouter} from 'next/router';
import {getIntlDateFromString} from '../../../@softbd/utilities/helpers';
import {useIntl} from 'react-intl';

const useStyles = makeStyles((theme) => {
  return {
    dateInfo: {
      background: theme.palette.common.white,
      color: theme.palette.primary.light,
      display: 'flex',
      padding: '4px',
      width: '180px',
      borderRadius: '5px',
      marginBottom: '10px',
    },
    image: {
      overflow: 'hidden',
    },
  };
});

function RecentActivityCardView({activity}: any) {
  const classes = useStyles();
  const router = useRouter();
  const path = router.pathname;
  const {formatDate} = useIntl();

  return (
    <Card>
      <Link href={`${path}/${activity.id}`} passHref>
        <CardActionArea>
          <CardMedia
            component='img'
            height='140'
            image={activity.img}
            alt='random image'
            title={activity?.title}
          />
          <CardContent>
            <Box className={classes.dateInfo}>
              <DateRangeOutlined />
              <Typography>
                {getIntlDateFromString(formatDate, activity.date)}
              </Typography>
            </Box>

            <Typography
              style={{fontWeight: 'bold'}}
              variant='subtitle2'
              component='div'>
              {activity.title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
}

export default RecentActivityCardView;

import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import {styled} from '@mui/material/styles';
import {DateRangeOutlined} from '@mui/icons-material';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {getIntlDateFromString} from '../../../@softbd/utilities/helpers';
import {useIntl} from 'react-intl';
import React from 'react';

const PREFIX = 'RecentActivityCardView';

const classes = {
  dateInfo: `${PREFIX}-dateInfo`,
  image: `${PREFIX}-image`,
};

const StyledCard = styled(Card)(({theme}) => {
  return {
    [`& .${classes.dateInfo}`]: {
      background: theme.palette.common.white,
      color: theme.palette.primary.light,
      display: 'flex',
      padding: '4px',
      width: '180px',
      borderRadius: '5px',
      marginBottom: '10px',
    },
    [`& .${classes.image}`]: {
      overflow: 'hidden',
    },
  };
});

function RecentActivityCardView({activity}: any) {
  const router = useRouter();
  const path = router.pathname;
  const {formatDate} = useIntl();

  return (
    <StyledCard>
      <Link href={`${path}/${activity.id}`} passHref>
        <CardActionArea>
          {activity.content_type && activity.content_type == 1 && (
            <CardMedia
              component='img'
              height='140'
              image={activity.thumb_image_path}
              alt='random image'
              title={activity?.title}
            />
          )}
          {(activity.content_type && activity.content_type == 2) ||
            (activity.content_type && activity.content_type == 3 && (
              <iframe
                width='100%'
                height='140'
                src={activity.embedded_url}
                style={{marginBottom: '-8px'}}
              />
            ))}
          <CardContent>
            <Box className={classes.dateInfo}>
              <DateRangeOutlined />
              <Typography>
                {getIntlDateFromString(formatDate, activity.published_at)}
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
    </StyledCard>
  );
}

export default RecentActivityCardView;

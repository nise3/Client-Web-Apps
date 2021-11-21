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
import {
  getEmbeddedVideoUrl,
  getIntlDateFromString,
} from '../../../@softbd/utilities/helpers';
import {useIntl} from 'react-intl';
import React, {useEffect, useState} from 'react';
import ContentTypes from '../../dashboard/recentActivities/ContentTypes';

const PREFIX = 'RecentActivityCardView';

const classes = {
  dateInfo: `${PREFIX}-dateInfo`,
  image: `${PREFIX}-image`,
  recentActivityTitle: `${PREFIX}-recentActivityTitle`,
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
    [`& .${classes.recentActivityTitle}`]: {
      fontWeight: 'bold',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    },
  };
});

function RecentActivityCardView({activity}: any) {
  const router = useRouter();
  const path = router.pathname;
  const {formatDate} = useIntl();
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  useEffect(() => {
    if (
      activity &&
      activity.content_type != ContentTypes.IMAGE &&
      activity?.video_url
    ) {
      const embeddedUrl = getEmbeddedVideoUrl(activity?.video_url);
      setVideoUrl(embeddedUrl);
    }
  }, [activity]);

  return (
    <StyledCard>
      <Link href={`${path}/${activity.id}`} passHref>
        <CardActionArea>
          {activity.content_type &&
            activity.content_type == ContentTypes.IMAGE && (
              <CardMedia
                component='img'
                height='140'
                image={
                  activity.image_path
                    ? activity.image_path
                    : activity.grid_image_path
                }
                alt={activity?.image_alt_title}
                title={activity?.title}
              />
            )}
          {activity.content_type &&
            activity.content_type != ContentTypes.IMAGE && (
              <iframe
                width='100%'
                height='140'
                src={videoUrl ? videoUrl : activity.video_url}
                style={{marginBottom: '-8px'}}
              />
            )}
          <CardContent>
            <Box className={classes.dateInfo}>
              <DateRangeOutlined />
              <Typography>
                {getIntlDateFromString(formatDate, activity?.published_at)}
              </Typography>
            </Box>

            <Typography
              variant='subtitle2'
              component='div'
              className={classes.recentActivityTitle}
              title={activity?.title}>
              {activity?.title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </StyledCard>
  );
}

export default RecentActivityCardView;

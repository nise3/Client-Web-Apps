import {
  Box,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from '@mui/material';
import {DateRangeOutlined} from '@mui/icons-material';
import React from 'react';
import {styled} from '@mui/material/styles';
import {useRouter} from 'next/router';
import {Link} from '../../../@softbd/elements/common';
import {
  getIntlDateFromString,
  getModulePath,
} from '../../../@softbd/utilities/helpers';
import {useIntl} from 'react-intl';

const PREFIX = 'RecentActivityMasonryGroupView';

const classes = {
  dateInfo: `${PREFIX}-dateInfo`,
  image: `${PREFIX}-image`,
  imageTexts: `${PREFIX}-imageTexts`,
};

const StyledImageList = styled(ImageList)(({theme}) => {
  return {
    [`& .${classes.dateInfo}`]: {
      background: theme.palette.common.white,
      color: theme.palette.primary.light,
      display: 'flex',
      padding: '4px',
      width: '180px',
      borderRadius: '5px',
      bottom: '9vh',
      left: '5px',
      position: 'absolute',
      [theme.breakpoints.down('lg')]: {
        bottom: '10vh',
      },
    },
    [`&.${classes.image}`]: {
      overflow: 'hidden',
    },
    [`& .${classes.imageTexts}`]: {
      position: 'relative',
    },
  };
});

function srcset(image: string, size: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}%&h=${size * rows}%&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

const masonryPositions = [
  {
    cols: 2,
    rows: 2,
  },
  {
    cols: 2,
    rows: 1,
  },
  {
    cols: 1,
    rows: 1,
  },
  {
    cols: 1,
    rows: 1,
  },
];

function RecentActivityMasonryGroupView({items}: any) {
  const router = useRouter();
  const path = router.pathname;

  const {formatDate} = useIntl();

  return (
    <StyledImageList
      sx={{width: '100%', height: 'auto'}}
      variant='quilted'
      cols={4}
      rowHeight={250}
      className={classes.image}>
      {items &&
        items?.map((item: any, i: any) => (
          <ImageListItem
            key={item.id}
            cols={masonryPositions[item.collage_position - 1]?.cols || 1}
            rows={masonryPositions[item.collage_position - 1]?.rows || 1}
            style={{position: 'relative'}}>
            <img
              {...srcset(
                item.collage_image_path,
                25,
                masonryPositions[item.collage_position - 1]?.rows,
                masonryPositions[item.collage_position - 1]?.cols,
              )}
              alt={item.image_alt_title}
              loading='lazy'
            />
            <Box className={classes.imageTexts}>
              {item.published_at && (
                <Box className={classes.dateInfo}>
                  <DateRangeOutlined />
                  <Typography>
                    {getIntlDateFromString(formatDate, item.published_at)}
                  </Typography>
                </Box>
              )}
              {item.title && (
                <Link
                  href={`${getModulePath(path)}/recent-activities/${item.id}`}>
                  <ImageListItemBar title={item.title} />
                </Link>
              )}
            </Box>
          </ImageListItem>
        ))}
    </StyledImageList>
  );
}

export default RecentActivityMasonryGroupView;

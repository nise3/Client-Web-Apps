import {
  Box,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from '@mui/material';
import {DateRangeOutlined} from '@mui/icons-material';
import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import {useRouter} from 'next/router';
import {Link} from '../../../@softbd/elements/common';
import {
  getIntlDateFromString,
  getModulePath,
} from '../../../@softbd/utilities/helpers';
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
      bottom: '9vh',
      left: '5px',
      position: 'absolute',
      [theme.breakpoints.down('lg')]: {
        bottom: '10vh',
      },
    },
    image: {
      overflow: 'hidden',
    },
    imageTexts: {
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
  const classes = useStyles();
  const {formatDate} = useIntl();

  return (
    <ImageList
      sx={{width: '100%', height: 'auto'}}
      variant='quilted'
      cols={4}
      rowHeight={170}
      className={classes.image}>
      {items.map((item: any, index: number) => (
        <ImageListItem
          key={item.id}
          cols={masonryPositions[index].cols}
          rows={masonryPositions[index].rows}
          style={{position: 'relative'}}>
          <img
            {...srcset(
              item.img,
              25,
              masonryPositions[index].rows,
              masonryPositions[index].cols,
            )}
            alt={item.title}
            loading='lazy'
          />
          <Box className={classes.imageTexts}>
            <Box className={classes.dateInfo}>
              <DateRangeOutlined />
              <Typography>
                {getIntlDateFromString(formatDate, item.date)}
              </Typography>
            </Box>
            <Link href={`${getModulePath(path)}/recent-activities/${item.id}`}>
              <ImageListItemBar title={item.title} />
            </Link>
          </Box>
        </ImageListItem>
      ))}
    </ImageList>
  );
}

export default RecentActivityMasonryGroupView;

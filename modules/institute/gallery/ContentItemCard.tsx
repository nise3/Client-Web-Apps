import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import React from 'react';
import {Link} from '../../../@softbd/elements/common';

function ContentItemCard({item}: any) {
  let path = '/institute/gallery-albums';

  let image = '';
  if (item?.content_grid_image_url) {
    image = item?.content_grid_image_url;
  } else {
    image = item?.content_path;
  }
  return (
    <>
      <Link href={`${path}/${item.id}`} passHref>
        <Card>
          <CardActionArea>
            <CardMedia
              component='img'
              height='140'
              image={image}
              alt={item?.alt_title}
              title={item?.content_title}
            />
            <CardContent>
              <Typography gutterBottom variant='body1' component='div'>
                {item?.content_title}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    </>
  );
}

export default ContentItemCard;

import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import React from 'react';
import {Link} from '../../../@softbd/elements/common';
import {useRouter} from 'next/router';
function GalleryItemCardView({item}: any) {
  const router = useRouter();
  let path = router.pathname;
  if (path == '/institute') {
    path = path + '/gallery-albums';
  }
  return (
    <>
      <Link href={`${path}/${item.id}`} passHref>
        <Card>
          <CardActionArea>
            <CardMedia
              component='img'
              height='140'
              image={item?.image_url}
              alt={item.title}
              title={item.title}
            />
            <CardContent>
              <Typography gutterBottom variant='body1' component='div'>
                {item?.content}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    </>
  );
}

export default GalleryItemCardView;

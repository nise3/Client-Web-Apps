import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import React from 'react';
import {Link} from '../../../@softbd/elements/common';
import {styled} from '@mui/material/styles';

const StyledTypography = styled(Typography)(({theme}) => ({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}));
function GalleryItemCardView({item}: any) {
  let path = '/institute/gallery-albums';

  let image = '';
  if (item?.grid_image_path) {
    image = item?.grid_image_path;
  } else {
    image = item?.main_image_path;
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
              alt={item?.image_alt_title}
              title={item?.title}
            />

            <CardContent>
              <StyledTypography gutterBottom variant='body1'>
                {item?.title}
              </StyledTypography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    </>
  );
}

export default GalleryItemCardView;

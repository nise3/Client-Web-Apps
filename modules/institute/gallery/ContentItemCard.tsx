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

function ContentItemCard({item}: any) {
  let path = '/institute';

  if (item?.content_type == 2) {
    path = path + '/videos';
  }
  return (
    <>
      <Link href={`${path}/${item.id}`} passHref>
        <Card>
          <CardActionArea>
            {item.content_type && item.content_type == 2 ? (
              <iframe
                width='100%'
                height='140'
                frameBorder='0'
                /*              src={item?.video_url}*/
                src={'https://www.youtube.com/embed/2JyW4yAyTl0?autoplay=1'}
                style={{marginBottom: '-8px'}}
              />
            ) : (
              <CardMedia
                component='img'
                height='140'
                image={
                  item?.content_grid_image_path
                    ? item?.content_grid_image_path
                    : item?.image_path
                }
                alt={item?.image_alt_title}
                title={item?.title}
              />
            )}
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

export default ContentItemCard;

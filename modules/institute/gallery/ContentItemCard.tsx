import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import React, {FC} from 'react';
import {styled} from '@mui/material/styles';
import GalleryAlbumContentTypes from '../../dashboard/galleryAlbumContents/GalleryAlbumContentTypes';

const StyledTypography = styled(Typography)(({theme}) => ({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}));

interface ContentItemCardProps {
  data: any;
  onClick: any;
}

const ContentItemCard: FC<ContentItemCardProps> = ({
  data,
  onClick: onClickCallback,
}) => {
  return (
    <Card>
      <CardActionArea
        onClick={() => {
          let eventData: any = {
            title: data.title,
            details: data.description,
          };
          if (data.content_type == GalleryAlbumContentTypes.IMAGE) {
            eventData.imagePath = data.image_path;
          } else {
            eventData.videoUrl = data.video_url;
          }
          onClickCallback(eventData);
        }}>
        <CardMedia
          component='img'
          height='140'
          image={
            data?.content_grid_image_path
              ? data?.content_grid_image_path
              : data?.image_path
          }
          alt={data?.image_alt_title ? data.image_alt_title : data?.title}
          title={data?.title}
        />
        <CardContent>
          <StyledTypography gutterBottom variant='body1'>
            {data?.title}
          </StyledTypography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ContentItemCard;

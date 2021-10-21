import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';

function GalleryItemCardView({item}: any) {
  return (
    <Card>
      <CardActionArea>
        <CardMedia
          component='img'
          height='140'
          image={item?.image_url}
          alt='random image'
        />
        <CardContent>
          <Typography gutterBottom variant='body1' component='div'>
            {item?.content}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default GalleryItemCardView;

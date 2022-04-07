import React, {FC} from 'react';
import {styled} from '@mui/material/styles';
import {Box, Card} from '@mui/material';
import CardMediaImageView from '../display/ImageView/CardMediaImageView';
import {Body2} from '../common';

const PREFIX = 'PublicationCardComponent';

const classes = {
  cardItem: `${PREFIX}-cardItem`,
  image: `${PREFIX}-image`,
  imageAlt: `${PREFIX}-imageAlt`,
  title: `${PREFIX}-title`,
};

const StyledBox = styled(Box)(({theme}) => ({
  [`& .${classes.cardItem}`]: {
    justifyContent: 'center',
    maxHeight: '245px',
  },

  [`& .${classes.image}`]: {
    width: '100%',
    height: '170px',
  },
  [`& .${classes.imageAlt}`]: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  [`& .${classes.title}`]: {
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontWeight: 'bold',
  },
}));

interface PublicationCardComponentProps {
  publication: any;
}

const PublicationCardComponent: FC<PublicationCardComponentProps> = ({
  publication,
}) => {
  return (
    <StyledBox>
      <Card className={classes.cardItem}>
        <Box className={classes.imageAlt}>
          <CardMediaImageView
            className={classes.image}
            image={publication?.image_path}
            alt={publication?.image_alt_title}
            title={publication?.title}
          />
        </Box>
        <Box
          sx={{
            height: '75px',
            padding: '15px',
          }}>
          <Body2 title={publication?.title} className={classes.title}>
            {publication?.title}
          </Body2>
        </Box>
      </Card>
    </StyledBox>
  );
};

export default PublicationCardComponent;

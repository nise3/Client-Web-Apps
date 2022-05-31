import React, {FC} from 'react';
import {styled} from '@mui/material/styles';
import {Box, Card, CardContent, Grid} from '@mui/material';
import {H2, Link} from '../../../@softbd/elements/common';
import {useCustomStyle} from '../../../@softbd/hooks/useCustomStyle';
import AvatarImageView from '../../../@softbd/elements/display/ImageView/AvatarImageView';

const PREFIX = 'TrainingLinkCard';

const classes = {
  avatar: `${PREFIX}-avatar`,
  avatarImage: `${PREFIX}-avatarImage`,
};

const StyledCard = styled(Card)(({theme}) => ({
  padding: '10px',

  [`& .${classes.avatar}`]: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  [`& .${classes.avatarImage}`]: {
    maxHeight: '80px',
    maxWidth: '80px',
    width: '100%',
    height: '100%',
    minWidth: '61px',
    minHeight: '61px',
  },
}));

interface TrainingLinkCardProps {
  redirectUrl: string;
  alt: string;
  image: string;
  pointerEvents?: any;
}

const TrainingLinkCard: FC<TrainingLinkCardProps> = ({
  redirectUrl,
  alt,
  image,
  pointerEvents,
}) => {
  const result = useCustomStyle();
  return (
    <StyledCard>
      <CardContent>
        <Grid container spacing={3} style={{textAlign: 'center'}}>
          <Grid item xs={3} md={3}>
            <Box className={classes.avatar}>
              <AvatarImageView
                src={null}
                alt={alt}
                className={classes.avatarImage}
                variant='square'
                defaultImage={image}
              />
            </Box>
          </Grid>
          <Grid item xs={9} md={9} style={{margin: 'auto'}}>
            <Link
              href={redirectUrl}
              style={{pointerEvents: pointerEvents}}
              target='_blank'>
              <H2 sx={{...result.body1, fontWeight: 'bold', cursor: 'pointer'}}>
                {alt}
              </H2>
            </Link>
          </Grid>
        </Grid>
      </CardContent>
    </StyledCard>
  );
};

export default TrainingLinkCard;

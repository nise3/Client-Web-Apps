import {styled} from '@mui/material/styles';
import {Container, Paper} from '@mui/material';
import {useIntl} from 'react-intl';
import React, {useState} from 'react';
import RowStatus from '../../@softbd/utilities/RowStatus';
import {useFetchPublicGalleryAlbums} from '../../services/cmsManagement/hooks';

const PREFIX = 'ImmigrantsCycleSection';

const classes = {
  image: `${PREFIX}-image`,
};

const StyledContainer = styled(Container)(({theme}) => ({
  margin: '100px auto',
  [`& .${classes.image}`]: {
    backgroundImage: "url('/images/migration-portal-center-image.png')",
    height: '38rem',
    display: 'block',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
  },
}));

const ImmigrantsCycleSection = () => {
  const {messages} = useIntl();
  const pageSize = 10;
  const [galleryFilter] = useState<any>({
    only_parent_gallery_album: 1,
    page_size: pageSize,
    row_status: RowStatus.ACTIVE,
  });

  const {data: galleryItems, isLoading: isLoadingGallery} =
    useFetchPublicGalleryAlbums(galleryFilter);

  return (
    <StyledContainer maxWidth='lg'>
      <Paper className={classes.image} elevation={0}>
        <h1>say hi</h1>
      </Paper>
    </StyledContainer>
  );
};
export default ImmigrantsCycleSection;

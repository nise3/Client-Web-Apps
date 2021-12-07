import {styled} from '@mui/material/styles';
import {Box, Button, Container, Grid} from '@mui/material';
import {ArrowRightAlt} from '@mui/icons-material';
import {Fade} from 'react-awesome-reveal';
import UnderlinedHeading from './UnderlinedHeading';
import CustomCarousel from '../../@softbd/elements/display/CustomCarousel/CustomCarousel';
import {useFetchInstitutesPublicGallery} from '../../services/instituteManagement/hooks';
import GalleryItemCardView from './gallery/GalleryItemCardView';
import {Link} from '../../@softbd/elements/common';
import {LINK_FRONTEND_INSTITUTE_GALLERY} from '../../@softbd/common/appLinks';
import {useIntl} from 'react-intl';
import NoDataFoundComponent from '../youth/common/NoDataFoundComponent';
import React, {useState} from 'react';
import {useVendor} from '../../@crema/utility/AppHooks';
import BoxCardsSkeleton from './Components/BoxCardsSkeleton';
import RowStatus from '../../@softbd/utilities/RowStatus';

const PREFIX = 'GallerySection';

const classes = {
  boxItem: `${PREFIX}-boxItem`,
  button: `${PREFIX}-button`,
};

const StyledContainer = styled(Container)(({theme}) => ({
  [`& .${classes.boxItem}`]: {
    background: theme.palette.background.paper,
    borderRadius: 4 * parseInt(theme.shape.borderRadius.toString()),
    padding: '20px 15px 30px 15px',
    margin: 0,
    [theme.breakpoints.down('xl')]: {
      padding: '20px 10px 30px 10px',
    },
  },

  [`& .${classes.button}`]: {
    borderRadius: 40,
  },
  '& .react-multi-carousel-list .react-multiple-carousel__arrow--left': {
    left: 0,
  },
  '& .react-multi-carousel-list .react-multiple-carousel__arrow--right': {
    right: 0,
  },
  '& .react-multi-carousel-list .react-multiple-carousel__arrow--left::before, & .react-multi-carousel-list .react-multiple-carousel__arrow--right::before':
    {
      color: '#fff',
    },
}));

const GallerySection = () => {
  const {messages} = useIntl();
  const pageSize = 10;
  const vendor = useVendor();
  const [galleryFilter] = useState<any>({
    only_parent_gallery_album: 1,
    page_size: pageSize,
    institute_id: vendor?.id,
    row_status: RowStatus.ACTIVE,
  });

  const {data: galleryItems, isLoading: isLoadingGallery} =
    useFetchInstitutesPublicGallery(galleryFilter);

  return (
    <StyledContainer maxWidth='lg'>
      <Grid container mt={{xs: 5}}>
        <Grid item xs={12}>
          <Fade direction='up'>
            <UnderlinedHeading>
              {messages['common.gallery_album']}
            </UnderlinedHeading>
            {isLoadingGallery ? (
              <BoxCardsSkeleton />
            ) : galleryItems && galleryItems.length ? (
              <Box>
                <Box>
                  <CustomCarousel>
                    {galleryItems.map((galleryItem: any, i: number) => (
                      <Box key={galleryItem.id} className={classes.boxItem}>
                        <GalleryItemCardView item={galleryItem} />
                      </Box>
                    ))}
                  </CustomCarousel>
                </Box>
                <Box display='flex' justifyContent='center'>
                  <Link href={LINK_FRONTEND_INSTITUTE_GALLERY}>
                    <Button
                      variant='outlined'
                      size='large'
                      endIcon={<ArrowRightAlt />}
                      className={classes.button}>
                      {messages['common.see_more']}
                    </Button>
                  </Link>
                </Box>
              </Box>
            ) : (
              <NoDataFoundComponent
                message={messages['common.no_data_found'] as string}
                messageTextType={'h6'}
              />
            )}
          </Fade>
        </Grid>
      </Grid>
    </StyledContainer>
  );
};
export default GallerySection;

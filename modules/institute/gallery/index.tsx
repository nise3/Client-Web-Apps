import {styled} from '@mui/material/styles';
import {
  Container,
  Grid,
  Pagination,
  Paper,
  Skeleton,
  Stack,
} from '@mui/material';
import React, {useCallback, useRef, useState} from 'react';
import {useIntl} from 'react-intl';
import {H1, H6} from '../../../@softbd/elements/common';
import {useFetchInstitutesPublicGallery} from '../../../services/instituteManagement/hooks';
import GalleryItemCardView from './GalleryItemCardView';
import {useVendor} from '../../../@crema/utility/AppHooks';
import RowStatus from '../../../@softbd/utilities/RowStatus';

const PREFIX = 'InstituteGallery';

const classes = {
  searchIcon: `${PREFIX}-searchIcon`,
  filterIcon: `${PREFIX}-filterIcon`,
  resetButton: `${PREFIX}-resetButton`,
  heading: `${PREFIX}-heading`,
};

const StyledContainer = styled(Container)(({theme}) => ({
  padding: '0 !important',
  [`& .${classes.searchIcon}`]: {
    position: 'absolute',
    right: 0,
  },
  [`& .${classes.heading}`]: {
    boxShadow: '0px 2px 2px #8888',
  },
  [`& .${classes.filterIcon}`]: {
    display: 'flex',
    alignItems: 'center',
  },

  [`& .${classes.resetButton}`]: {
    [theme.breakpoints.up('md')]: {
      paddingLeft: '3% !important',
    },
  },
}));

const InstituteGallery = () => {
  const {messages} = useIntl();
  const vendor = useVendor();

  const [galleryFilter, setGalleryFilter] = useState<any>({
    only_parent_gallery_album: 1,
    institute_id: vendor?.id,
    row_status: RowStatus.ACTIVE,
    page: 1,
    page_size: 8,
  });

  const {
    data: galleryItems,
    isLoading: isLoadingGalleryItems,
    metaData,
  } = useFetchInstitutesPublicGallery(galleryFilter);
  const page = useRef<any>(1);

  const onPaginationChange = useCallback((event: any, currentPage: number) => {
    page.current = currentPage;
    setGalleryFilter((params: any) => {
      return {...params, ...{page: currentPage}};
    });
  }, []);

  // TODO: css issue - fix grid responsiveness

  return (
    <>
      <Grid container sx={{maxWidth: '100%'}}>
        <Grid item xs={12} textAlign={'center'}>
          <Paper>
            <H1 py={3} style={{fontWeight: 'bold', fontSize: '2.25rem'}}>
              {messages['common.gallery_album']}
            </H1>
          </Paper>
        </Grid>
      </Grid>
      <StyledContainer maxWidth='lg'>
        <Grid container justifyContent={'center'}>
          {isLoadingGalleryItems ? (
            <Grid
              item
              xs={12}
              sx={{display: 'flex', justifyContent: 'space-evenly'}}>
              <Skeleton variant='rectangular' width={'22%'} height={140} />
              <Skeleton variant='rectangular' width={'22%'} height={140} />
              <Skeleton variant='rectangular' width={'22%'} height={140} />
              <Skeleton variant='rectangular' width={'22%'} height={140} />
            </Grid>
          ) : galleryItems && galleryItems?.length > 0 ? (
            <Grid item md={12} mt={{xs: 1, md: 2}}>
              <Grid container>
                <Grid item xs={12}>
                  <Grid container spacing={5}>
                    {galleryItems?.map((data: any) => (
                      <Grid
                        item
                        md={3}
                        justifyContent={'center'}
                        mt={3}
                        key={data.id}>
                        <GalleryItemCardView item={data} />
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
              {metaData.total_page > 1 && (
                <Grid
                  item
                  md={12}
                  mt={4}
                  display={'flex'}
                  justifyContent={'center'}>
                  <Stack spacing={2}>
                    <Pagination
                      page={page.current}
                      count={metaData.total_page}
                      color={'primary'}
                      shape='rounded'
                      onChange={onPaginationChange}
                    />
                  </Stack>
                </Grid>
              )}
            </Grid>
          ) : (
            <Grid container justifyContent={'center'}>
              <Grid item>
                <H6 style={{textAlign: 'center'}} py={5}>
                  {messages['common.no_data_found']}
                </H6>
              </Grid>
            </Grid>
          )}
        </Grid>
      </StyledContainer>
    </>
  );
};

export default InstituteGallery;

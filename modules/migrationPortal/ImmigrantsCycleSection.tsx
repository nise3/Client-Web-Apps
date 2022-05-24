import {styled} from '@mui/material/styles';
import {Container, Grid} from '@mui/material';
import React, {useState} from 'react';
import RowStatus from '../../@softbd/utilities/RowStatus';
import {useFetchPublicGalleryAlbums} from '../../services/cmsManagement/hooks';
import ImmigrantsUnderlinedHeading from '../../@softbd/elements/common/ImmigrantsUnderlinedHeading';
import {Fade} from 'react-awesome-reveal';
import {S2} from '../../@softbd/elements/common';
import {useIntl} from 'react-intl';

const PREFIX = 'ImmigrantsCycleSection';

const classes = {
  image: `${PREFIX}-image`,
  centralText: `${PREFIX}-centralText`,
  topOne: `${PREFIX}-topOne`,
  secondRow: `${PREFIX}-secondRow`,
  thirdRow: `${PREFIX}-thirdRow`,
  fourthRow: `${PREFIX}-fourthRow`,
  bottomOne: `${PREFIX}-bottomOne`,
};

const StyledContainer = styled(Container)(({theme}) => ({
  margin: '100px auto',
  [`& .${classes.image}`]: {
    backgroundImage: "url('/images/migration-portal-center-image.png')",
    height: '38rem',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    position: 'relative',
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      height: '17rem',
    },
  },
  [`& .${classes.centralText}`]: {
    position: 'absolute',
    top: '41%',
    left: '43%',
    [theme.breakpoints.down('sm')]: {
      top: '41%',
      left: '35%',
    },
  },
  [`& .${classes.topOne}`]: {
    position: 'absolute',
    left: '45%',
    top: '-5%',
  },
  [`& .${classes.secondRow}`]: {
    textAlign: 'center',
    position: 'absolute',
    top: '13%',
  },
  [`& .${classes.thirdRow}`]: {
    textAlign: 'center',
    position: 'absolute',
    top: '46%',
  },
  [`& .${classes.fourthRow}`]: {
    textAlign: 'center',
    position: 'absolute',
    top: '80%',
  },
  [`& .${classes.bottomOne}`]: {
    position: 'absolute',
    left: '45%',
    bottom: '-5%',
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
      <div className={classes.image}>
        <Fade
          direction='up'
          className={classes.centralText}
          style={{transform: 'translate(-50%, -50%)'}}>
          <ImmigrantsUnderlinedHeading />
        </Fade>
        <Grid className={classes.topOne}>
          <S2>{messages['migration_portal.go_abroad_knowingly']}</S2>
        </Grid>
        <Grid container className={classes.secondRow}>
          <Grid item xs={6}>
            second left
          </Grid>
          <Grid item xs={6}>
            second right
          </Grid>
        </Grid>
        <Grid container className={classes.thirdRow}>
          <Grid item xs={6}>
            third left
          </Grid>
          <Grid item xs={6}>
            third right
          </Grid>
        </Grid>
        <Grid container className={classes.fourthRow}>
          <Grid item xs={6}>
            fourth left
          </Grid>
          <Grid item xs={6}>
            fourth right
          </Grid>
        </Grid>
        <Grid className={classes.bottomOne}>
          <S2>{messages['migration_portal.go_abroad_knowingly']}</S2>
        </Grid>
      </div>
    </StyledContainer>
  );
};
export default ImmigrantsCycleSection;

import {Box, Button, Card, Container, Grid} from '@mui/material';
import {styled} from '@mui/material/styles';
import CustomCarousel from '../../@softbd/elements/display/CustomCarousel/CustomCarousel';
import React, {useState} from 'react';
import {Body2, Link} from '../../@softbd/elements/common';
import {useIntl} from 'react-intl';
import {useFetchPublicPublications} from '../../services/cmsManagement/hooks';
import SectionTitle from './SectionTitle';
import BoxCardsSkeleton from '../institute/Components/BoxCardsSkeleton';
import RowStatus from '../../@softbd/utilities/RowStatus';
import NoDataFoundComponent from '../youth/common/NoDataFoundComponent';
import CardMediaImageView from '../../@softbd/elements/display/ImageView/CardMediaImageView';
import {LINK_FRONTEND_NISE_PUBLICATIONS} from '../../@softbd/common/appLinks';
import {ArrowRightAlt} from '@mui/icons-material';
import PageSizes from '../../@softbd/utilities/PageSizes';

const PREFIX = 'Publications';

const classes = {
  vBar: `${PREFIX}-vBar`,
  cardItem: `${PREFIX}-cardItem`,
  image: `${PREFIX}-image`,
  imageAlt: `${PREFIX}-imageAlt`,
  title: `${PREFIX}-title`,
  seeMore: `${PREFIX}-seeMore`,
};

const StyledGrid = styled(Grid)(({theme}) => ({
  marginTop: '60px',

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

  '& .react-multi-carousel-list': {
    padding: '20px 0px',
  },
  [`& .${classes.title}`]: {
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontWeight: 'bold',
  },
  [`& .${classes.seeMore}`]: {
    marginTop: '15px',
    marginBottom: '15px',
  },
}));

const Publications = () => {
  const {messages} = useIntl();

  const [publicationsFilters] = useState({
    row_status: RowStatus.ACTIVE,
    page_size: PageSizes.TEN,
  });
  const {data: publications, isLoading: isLoadingPublications} =
    useFetchPublicPublications(publicationsFilters);

  const cardItem = (publication: any, key: number) => {
    return (
      <Link href={`/publication-details/${publication.id}`} passHref key={key}>
        <Box mr={1} ml={1} key={key}>
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
        </Box>
      </Link>
    );
  };
  return (
    <StyledGrid container xl={12}>
      <Container maxWidth='lg'>
        <SectionTitle
          title={messages['menu.publications'] as string}
          center={true}
        />
        <Box mb={2} sx={{marginTop: '-16px'}}>
          {isLoadingPublications ? (
            <BoxCardsSkeleton />
          ) : publications && publications.length > 0 ? (
            <CustomCarousel>
              {publications.map((publication: any, key: number) =>
                cardItem(publication, key),
              )}
            </CustomCarousel>
          ) : (
            <NoDataFoundComponent
              messageType={messages['publication.label']}
              messageTextType={'h6'}
            />
          )}
        </Box>
        {publications && publications?.length > 0 && (
          <Grid item container justifyContent='center' spacing={2}>
            <Link
              href={`${LINK_FRONTEND_NISE_PUBLICATIONS}`}
              passHref
              className={classes.seeMore}>
              <Button
                variant='outlined'
                color='primary'
                endIcon={<ArrowRightAlt />}
                style={{
                  borderRadius: '10px',
                }}>
                {messages['common.see_more']}
              </Button>
            </Link>
          </Grid>
        )}
      </Container>
    </StyledGrid>
  );
};

export default Publications;

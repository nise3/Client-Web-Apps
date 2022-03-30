import {Box, Card, Container, Grid} from '@mui/material';
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

const PREFIX = 'Publications';

const classes = {
  vBar: `${PREFIX}-vBar`,
  cardItem: `${PREFIX}-cardItem`,
  image: `${PREFIX}-image`,
  imageAlt: `${PREFIX}-imageAlt`,
  title: `${PREFIX}-title`,
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
}));

const Publications = () => {
  const {messages} = useIntl();

  const [publicationsFilters] = useState({
    row_status: RowStatus.ACTIVE,
  });
  const {data: publications, isLoading: isLoadingPublications} =
    useFetchPublicPublications(publicationsFilters);

  const cardItem = (publication: any, key: number) => {
    return (
      <Link href={`/publication-details/${publication.id}`} passHref key={key}>
        <Box mr={1} ml={1} key={key}>
          <Card className={classes.cardItem}>
            <Box className={classes.imageAlt}>
              <img
                className={classes.image}
                src={
                  publication?.image_path
                    ? publication?.image_path
                    : '/images/blank_image.png'
                }
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
      </Container>
    </StyledGrid>
  );
};

export default Publications;

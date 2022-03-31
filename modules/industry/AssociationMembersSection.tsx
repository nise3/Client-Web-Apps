import {Box, Card, Container, Grid} from '@mui/material';
import {styled} from '@mui/material/styles';
import CustomCarousel from '../../@softbd/elements/display/CustomCarousel/CustomCarousel';
import React, {useState} from 'react';
import {Link} from '../../@softbd/elements/common';
import {useIntl} from 'react-intl';
import UnderlinedHeading from '../../@softbd/elements/common/UnderlinedHeading';
import {useFetchPublicIndustryMembers} from '../../services/IndustryManagement/hooks';
import {LINK_FRONTEND_INDUSTRY_MEMBER_LIST} from '../../@softbd/common/appLinks';
import NoDataFoundComponent from '../youth/common/NoDataFoundComponent';
import BoxCardsSkeleton from '../institute/Components/BoxCardsSkeleton';
import CardMediaImageView from '../../@softbd/elements/display/ImageView/CardMediaImageView';

const PREFIX = 'Partners';

const classes = {
  title: `${PREFIX}-title`,
  vBar: `${PREFIX}-vBar`,
  cardItem: `${PREFIX}-courseItem`,
  image: `${PREFIX}-image`,
  imageAlt: `${PREFIX}-imageAlt`,
};

const StyledGrid = styled(Grid)(({theme}) => ({
  marginTop: '60px',

  [`& .${classes.title}`]: {
    color: theme.palette.primary.main,
    display: 'flex',
    alignItems: 'center',
  },

  [`& .${classes.cardItem}`]: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    height: '135px',
  },

  [`& .${classes.image}`]: {
    width: '100%',
    height: '100%',
  },
  [`& .${classes.imageAlt}`]: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  '& .react-multi-carousel-list': {
    padding: '20px 0px',
  },
}));

const AssociationMembersSection = () => {
  const {messages} = useIntl();

  const [industryAssocMemberFilter] = useState<any>({});

  const {data: members, isLoading: isLoadingMembers} =
    useFetchPublicIndustryMembers(industryAssocMemberFilter);

  const cardItem = (member: any, key: number) => {
    return (
      <Link
        href={LINK_FRONTEND_INDUSTRY_MEMBER_LIST + '/' + member.id}
        passHref
        key={key}>
        <Box mr={1} ml={1}>
          <Card className={classes.cardItem}>
            <Box className={classes.imageAlt}>
              <CardMediaImageView
                className={classes.image}
                image={member?.logo ?? '/images/blank_image.png'}
                alt={member?.title}
                title={member?.title}
              />
            </Box>
          </Card>
        </Box>
      </Link>
    );
  };

  return (
    <StyledGrid container xl={12}>
      <Container maxWidth='lg'>
        <UnderlinedHeading>
          {messages['industry_association.members']}
        </UnderlinedHeading>
        <Box mb={2} sx={{marginTop: '-16px'}}>
          {isLoadingMembers ? (
            <BoxCardsSkeleton />
          ) : members && members.length > 0 ? (
            <CustomCarousel>
              {members.map((partner: any, key: number) =>
                cardItem(partner, key),
              )}
            </CustomCarousel>
          ) : (
            <NoDataFoundComponent
              messageType={messages['common.member']}
              messageTextType={'h6'}
            />
          )}
        </Box>
      </Container>
    </StyledGrid>
  );
};

export default AssociationMembersSection;

import React from 'react';
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from '@mui/material';
import {useIntl} from 'react-intl';
import {styled} from '@mui/material/styles';
import {H5, Link, Text} from '../../../@softbd/elements/common';
import TagChip from '../../../@softbd/elements/display/TagChip';
import {Room} from '@mui/icons-material';
import {useRouter} from 'next/router';
import AvatarImageView from '../../../@softbd/elements/display/ImageView/AvatarImageView';

const PREFIX = 'MemberComponent';

const classes = {
  cardHeader: `${PREFIX}-cardHeader`,
  avatar: `${PREFIX}-avatar`,
  detailsButton: `${PREFIX}-detailsButton`,
};

const StyledCard = styled(Card)(({theme}) => ({
  position: 'relative',
  [`& .${classes.cardHeader}`]: {
    paddingBottom: '0',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },
  [`& .${classes.avatar}`]: {
    width: '70px',
    height: '70px',
    boxShadow: '0px 0px 5px 2px #e9e9e9',
    [theme.breakpoints.down('sm')]: {
      width: '50px',
      height: '50px',
      marginBottom: '10px',
    },
  },
  [`& .${classes.detailsButton}`]: {
    position: 'absolute',
    top: '15px',
    right: '15px',
  },
}));

interface MemberComponentProps {
  member: any;
}

//Todo: interface is not appropriate have to add IAssociationMember
const MemberComponent = ({member}: MemberComponentProps) => {
  const {messages, formatDate} = useIntl();
  const router = useRouter();
  const path = router.pathname;

  return (
    <StyledCard>
      <CardHeader
        className={classes.cardHeader}
        avatar={
          member?.logo ? (
            <AvatarImageView className={classes.avatar} src={member?.logo} />
          ) : (
            <Avatar className={classes.avatar}>
              {member?.title?.charAt(0)}
            </Avatar>
          )
        }
        title={<H5 fontWeight={'bold'}>{member?.title}</H5>}
        subheader={
          member?.date_of_establishment && (
            <Typography
              sx={{
                color: 'primary.main',
              }}>
              {messages['common.establish_date']}
              {formatDate(member?.date_of_establishment, {
                month: 'long',
                year: 'numeric',
              })}
            </Typography>
          )
        }
      />
      <Link href={`${path}/${member?.id}`}>
        <Button
          variant={'outlined'}
          color={'primary'}
          className={classes.detailsButton}>
          {messages['industry.details']}
        </Button>
      </Link>
      <CardContent>
        <Text>{member?.description}</Text>
        <TagChip icon={<Room />} label={member?.address} />
      </CardContent>
    </StyledCard>
  );
};

export default MemberComponent;

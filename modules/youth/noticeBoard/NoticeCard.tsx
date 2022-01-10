import React, {FC} from 'react';
import {styled} from '@mui/material/styles';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import {useIntl} from 'react-intl';
import {getIntlDateFromString} from '../../../@softbd/utilities/helpers';
import {H2, Link} from '../../../@softbd/elements/common';
import {useCustomStyle} from '../../../@softbd/hooks/useCustomStyle';

const PREFIX = 'NoticeCard';

const classes = {
  avatar: `${PREFIX}-avatar`,
  avatarImage: `${PREFIX}-avatarImage`,
  creativaItText: `${PREFIX}-creativaItText`,
  btn: `${PREFIX}-btn`,
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
  },

  [`& .${classes.creativaItText}`]: {
    marginTop: '5px',
    marginBottom: '15px',
    color: '#687882',
  },

  [`& .${classes.btn}`]: {
    marginRight: '20px',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '10px',
    },
  },
}));

interface NoticeCardProps {
  notice: any;
}

const logo = '/images/creativeIt.png';

const NoticeCard: FC<NoticeCardProps> = ({notice}) => {
  const {messages, formatDate} = useIntl();
  const result = useCustomStyle();
  const URL = `/notice-details/${notice.id}`;
  return (
    <StyledCard>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={3} md={3}>
            <Box className={classes.avatar}>
              {/*Todo: logo have to implement after real api ready*/}
              <Avatar
                src={notice?.grid_image_path ? notice?.grid_image_path : logo}
                alt={notice?.image_alt_title}
                className={classes.avatarImage}
              />
            </Box>
          </Grid>
          <Grid item xs={9} md={9}>
            <Link href={URL}>
              <H2 sx={{...result.body1, fontWeight: 'bold', cursor: 'pointer'}}>
                {notice.title}
              </H2>
            </Link>

            <Typography className={classes.creativaItText}>
              {notice.providerName}
            </Typography>

            <Box>
              {notice?.published_at && (
                <Button
                  variant='outlined'
                  className={classes.btn}
                  sx={{background: '#e4f1ea', border: '1px solid #e4f1ea'}}>
                  {getIntlDateFromString(formatDate, notice.published_at)}
                </Button>
              )}
              <Button color={'primary'} variant={'contained'}>
                {messages['common.download']}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </StyledCard>
  );
};

export default NoticeCard;

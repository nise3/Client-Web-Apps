import React from 'react';
import {useIntl} from 'react-intl';
import {useRouter} from 'next/router';
import {useFetchPublication} from '../../../services/IndustryManagement/hooks';
import {styled} from '@mui/material/styles';
import {Box, Button, CardMedia, Container, Grid, Tooltip} from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ShareIcon from '@mui/icons-material/Share';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import SystemUpdateAltOutlinedIcon from '@mui/icons-material/SystemUpdateAltOutlined';
import {Body1, H1, Link} from '../../../@softbd/elements/common';

const PREFIX = 'PublicationDetails';

const classes = {
  date: `${PREFIX}-date`,
  icon: `${PREFIX}-icon`,
  container: `${PREFIX}-container`,
};

const StyledContainer = styled(Container)(({theme}) => ({
  [`& .${classes.date}`]: {
    display: 'flex',
    alignItems: 'center',
  },

  [`& .${classes.icon}`]: {
    color: '#ffff',
    padding: '2px',
    borderRadius: '3px',
    '&:not(:last-child)': {marginRight: '10px'},
  },

  [`& .${classes.container}`]: {
    marginTop: '50px',
  },
}));
const PublicationDetails = () => {
  const {messages} = useIntl();
  const router = useRouter();
  const {publicationId}: any = router.query;
  const {data: publicationData} = useFetchPublication(publicationId);
  return (
    <StyledContainer maxWidth={'lg'}>
      <Grid container spacing={3}>
        <Grid item xs={12} mt={5}>
          <Grid container>
            <Grid item xs={5}>
              <Box className={classes.date}>
                <Link href={'/publications'}>
                  <Button variant={'outlined'} color={'primary'}>
                    {messages['industry.publication_list']}
                  </Button>
                </Link>
              </Box>
            </Grid>
            <Grid item xs={7} textAlign={'right'}>
              <Tooltip title={messages['common.like']}>
                <ThumbUpAltIcon
                  className={classes.icon}
                  sx={{backgroundColor: '#008fff'}}
                />
              </Tooltip>
              <Tooltip title={messages['common.share_label']}>
                <ShareIcon
                  className={classes.icon}
                  sx={{backgroundColor: '#4E4E98'}}
                />
              </Tooltip>
              <Tooltip title={messages['common.print']}>
                <PrintOutlinedIcon
                  className={classes.icon}
                  sx={{backgroundColor: '#ffb700b8'}}
                />
              </Tooltip>
              <Tooltip title={messages['common.download_label']}>
                <SystemUpdateAltOutlinedIcon
                  className={classes.icon}
                  sx={{backgroundColor: '#2fc94d'}}
                />
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          item
          xs={12}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}>
          <CardMedia
            component='img'
            height='200'
            sx={{width: '150px'}}
            image={'/images/testPublication.png'}
            alt={'notice-details'}
          />
          <H1 mt={3}>Publications details tilte</H1>
        </Grid>

        <Grid item xs={12}>
          <Body1>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here', making it look like readable English. Many desktop publishing
            packages and web page editors now use Lorem Ipsum as their default
            model text, and a search for 'lorem ipsum' will uncover many web
            sites still in their infancy. Various versions have evolved over the
            years, sometimes by accident, sometimes on purpose (injected humour
            and the like).
          </Body1>
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default PublicationDetails;

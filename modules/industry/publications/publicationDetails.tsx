import React from 'react';
import {useIntl} from 'react-intl';
import {styled} from '@mui/material/styles';
import {Box, Button, CardMedia, Container, Grid, Tooltip} from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ShareIcon from '@mui/icons-material/Share';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import SystemUpdateAltOutlinedIcon from '@mui/icons-material/SystemUpdateAltOutlined';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {Body1, H1, Link} from '../../../@softbd/elements/common';
import {useCustomStyle} from '../../../@softbd/hooks/useCustomStyle';

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
  const result = useCustomStyle();
  /*  const router = useRouter();
      const {publicationId}: any = router.query;
      const {data: publicationData} = useFetchPublication(publicationId);*/
  return (
    <StyledContainer maxWidth={'lg'}>
      <Grid container spacing={3}>
        <Grid item xs={12} mt={5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={5}>
              <Box className={classes.date}>
                <Link href={'/publications'}>
                  <Button variant={'outlined'} color={'primary'}>
                    <ArrowBackIosIcon style={{fontSize: 'small'}} />
                    {messages['industry.publication_list']}
                  </Button>
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} md={7} textAlign={'right'}>
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
          <H1
            sx={{
              ...result.h2,
            }}
            mt={3}>
            Publications details tilte
          </H1>
        </Grid>

        <Grid item xs={12}>
          <Body1>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet
            aspernatur aut commodi consectetur culpa cupiditate delectus,
            eveniet excepturi exercitationem laboriosam minima natus nobis nulla
            officia pariatur porro provident quaerat quisquam quos recusandae
            repellat sequi similique sint soluta unde velit voluptate? Alias
            animi asperiores aspernatur atque blanditiis, dignissimos ea eius
            error fugit modi quaerat sequi voluptatibus? Accusamus aut, beatae
            cum, delectus dignissimos dolores eligendi eos et ex expedita
            explicabo id illo in ipsa iure labore libero magnam natus nemo non
            quaerat rem sed similique voluptate voluptates? Asperiores
            consequuntur, deserunt dicta exercitationem labore laboriosam,
            nesciunt non possimus quo, quos soluta ullam veniam.
          </Body1>
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default PublicationDetails;

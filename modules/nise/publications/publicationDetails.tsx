import React from 'react';
import {useIntl} from 'react-intl';
import {styled} from '@mui/material/styles';
import {Box, Button, Container, Grid, Tooltip} from '@mui/material';
import SystemUpdateAltOutlinedIcon from '@mui/icons-material/SystemUpdateAltOutlined';
import {Body1, H1, Link} from '../../../@softbd/elements/common';
import {useCustomStyle} from '../../../@softbd/hooks/useCustomStyle';
import {useRouter} from 'next/router';
import {useFetchPublicPublication} from '../../../services/cmsManagement/hooks';
import {ArrowBack} from '@mui/icons-material';
import {Skeleton} from '@mui/lab';
import NoDataFoundComponent from '../../youth/common/NoDataFoundComponent';
import CardMediaImageView from '../../../@softbd/elements/display/ImageView/CardMediaImageView';
import {FILE_SERVER_FILE_VIEW_ENDPOINT} from '../../../@softbd/common/apiRoutes';

const PREFIX = 'PublicationDetails';

const classes = {
  date: `${PREFIX}-date`,
  icon: `${PREFIX}-icon`,
  container: `${PREFIX}-container`,
  buttons: `${PREFIX}-buttons`,
};

const StyledContainer = styled(Container)(({theme}) => ({
  marginBottom: '60px',

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
  [`& .${classes.buttons}`]: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',
  },
}));

const PublicationDetails = () => {
  const {messages} = useIntl();
  const result = useCustomStyle();

  const router = useRouter();
  const {publicationId}: any = router.query;

  const {data: publicationData, isLoading: isLoadingPublication} =
    useFetchPublicPublication(publicationId);

  return (
    <StyledContainer maxWidth={'lg'}>
      <Grid container spacing={3}>
        <Grid item xs={12} mt={5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={5}>
              <Box className={classes.date}>
                <Button
                  key={1}
                  startIcon={<ArrowBack />}
                  sx={{marginRight: '10px'}}
                  variant={'outlined'}
                  onClick={() => router.back()}>
                  {messages['common.back']}
                </Button>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={7}
              textAlign={'right'}
              className={classes.buttons}>
              <Body1 sx={{fontWeight: 'bold', padding: '10px'}}>
                {messages['common.download']}
              </Body1>

              {publicationData?.file_path ? (
                <Link
                  target={'_blank'}
                  href={
                    FILE_SERVER_FILE_VIEW_ENDPOINT + publicationData.file_path
                  }>
                  <Tooltip title={messages['common.download_label']}>
                    <SystemUpdateAltOutlinedIcon
                      className={classes.icon}
                      sx={{backgroundColor: '#2fc94d'}}
                    />
                  </Tooltip>
                </Link>
              ) : (
                <SystemUpdateAltOutlinedIcon
                  className={classes.icon}
                  sx={{backgroundColor: '#2fc94d'}}
                />
              )}
            </Grid>
          </Grid>
        </Grid>

        {isLoadingPublication ? (
          <>
            <Grid
              item
              xs={12}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              }}>
              <Skeleton height={400} width={180} />
            </Grid>
          </>
        ) : publicationData && Object.keys(publicationData).length ? (
          <>
            <Grid
              item
              xs={12}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              }}>
              <CardMediaImageView
                height='200'
                sx={{width: '150px'}}
                image={publicationData?.image_path}
                alt={publicationData?.title}
              />
              <H1
                sx={{
                  ...result.h2,
                  fontWeight: 'bold',
                }}
                mt={3}>
                {publicationData?.title}
              </H1>
            </Grid>

            <Grid item xs={12}>
              <Body1 sx={{fontWeight: 'bold'}}>
                {publicationData?.description}
              </Body1>
            </Grid>
          </>
        ) : (
          <NoDataFoundComponent messageType={messages['menu.publication']} />
        )}
      </Grid>
    </StyledContainer>
  );
};

export default PublicationDetails;

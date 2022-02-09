import {Container, Grid, Skeleton, Tooltip} from '@mui/material';
import {styled} from '@mui/material/styles';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ShareIcon from '@mui/icons-material/Share';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import SystemUpdateAltOutlinedIcon from '@mui/icons-material/SystemUpdateAltOutlined';
import {H3, H5} from '../../@softbd/elements/common';
import {useIntl} from 'react-intl';
import NoDataFoundComponent from '../youth/common/NoDataFoundComponent';
import {useFetchStaticPageBlock} from '../../services/cmsManagement/hooks';
import React, {useState} from 'react';
import {useRouter} from 'next/router';

const PREFIX = 'StaticContent';

const classes = {
  icon: `${PREFIX}-icon`,
};

const StyledContainer = styled(Container)(() => {
  return {
    marginBottom: '40px',
    [`& .${classes.icon}`]: {
      color: '#ffff',
      padding: '2px',
      borderRadius: '3px',
      '&:not(:last-child)': {marginRight: '10px'},
    },
  };
});

const StaticContent = () => {
  const {messages} = useIntl();

  const [params] = useState({});

  const router = useRouter();
  const {pageId} = router.query;

  const {data, isLoading} = useFetchStaticPageBlock(pageId, params);

  return (
    <StyledContainer maxWidth={'lg'}>
      {isLoading ? (
        <>
          <Skeleton variant={'rectangular'} width={'100%'} height={200} />
          <Skeleton variant={'rectangular'} width={'100%'} height={200} />
        </>
      ) : (
        <>
          {data ? (
            <Grid container spacing={1} mt={'20px'}>
              <Grid item xs={12}>
                <Grid container justifyContent={'space-between'}>
                  <Grid item>
                    <H3>{data?.title}</H3>
                  </Grid>
                  <Grid item>
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
              {data?.sub_title && (
                <Grid item xs={12}>
                  <H5>{data?.sub_title}</H5>
                </Grid>
              )}
              <Grid item xs={12}>
                <div dangerouslySetInnerHTML={{__html: data.content}} />
              </Grid>
            </Grid>
          ) : (
            <NoDataFoundComponent />
          )}
        </>
      )}
    </StyledContainer>
  );
};
export default StaticContent;

import {Container, Grid, Skeleton} from '@mui/material';
import {styled} from '@mui/material/styles';
import {H3, H5} from '../../../@softbd/elements/common';
import NoDataFoundComponent from '../../youth/common/NoDataFoundComponent';
import {useFetchStaticPageBlock} from '../../../services/cmsManagement/hooks';
import React, {useState} from 'react';
import {useRouter} from 'next/router';

const PREFIX = 'StaticContent';

const classes = {
  icon: `${PREFIX}-icon`,
};

const StyledContainer = styled(Container)(({theme}) => {
  return {
    marginBottom: '40px',
    [`& .${classes.icon}`]: {
      color: '#ffff',
      padding: '2px',
      borderRadius: '3px',
      '&:not(:last-child)': {marginRight: '10px'},
    },

    [`& .editor-template-table`]: {
      [`& tr`]: {
        width: '100%',
      },
      [`& td`]: {
        width: '50%',
        paddingBottom: '15px',
        verticalAlign: 'top',
        wordBreak: 'break-word',
        [theme.breakpoints.down('sm')]: {
          width: '100%',
          paddingRight: '0',
          display: 'inline-block',
        },
      },
      [`& td h3`]: {
        fontSize: '40px',
        margin: '10px 0',
      },
      [`& td p`]: {
        lineHeight: '30px',
      },
      [`& td:first-of-type`]: {
        paddingRight: '20px',
      },
      [`& td:last-of-type`]: {
        paddingLeft: '20px',
      },
      [`& td>img`]: {
        height: '300px',
        width: '100%',
      },
      [`& td>iframe`]: {
        height: '300px',
        width: '100%',
      },
    },
  };
});

const StaticContent = () => {
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

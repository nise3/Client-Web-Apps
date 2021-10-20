import {CardMedia, Container, Grid, IconButton} from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ShareIcon from '@mui/icons-material/Share';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import SystemUpdateAltOutlinedIcon from '@mui/icons-material/SystemUpdateAltOutlined';
import {H3} from '../../@softbd/elements/common';
import {useIntl} from 'react-intl';

const StaticContent = ({data}: any) => {
  const {messages} = useIntl();
  return (
    <Container maxWidth={'xl'}>
      {data && data.title ? (
        <Grid container spacing={3}>
          <Grid item xs={12} textAlign={'right'} mt={3}>
            <IconButton>
              <ThumbUpAltIcon
                style={{
                  backgroundColor: '#008fff',
                  color: '#ffff',
                  padding: '2px',
                }}
              />
            </IconButton>
            <IconButton>
              <ShareIcon
                style={{
                  backgroundColor: '#0054ffe8',
                  color: '#ffff',
                  padding: '2px',
                }}
              />
            </IconButton>
            <IconButton>
              <PrintOutlinedIcon
                style={{
                  backgroundColor: '#ffb700b8',
                  color: '#ffff',
                  padding: '2px',
                }}
              />
            </IconButton>
            <IconButton>
              <SystemUpdateAltOutlinedIcon
                style={{
                  backgroundColor: '#2fc94d',
                  color: '#ffff',
                  padding: '2px',
                }}
              />
            </IconButton>
          </Grid>

          <Grid item xs={12}>
            <H3>{data.title}</H3>
          </Grid>
          {data && data.cover_img && (
            <Grid item xs={12}>
              <CardMedia
                component='img'
                height='300'
                image={data.cover_img}
                alt='image'
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <div dangerouslySetInnerHTML={{__html: data.content}} />
          </Grid>
        </Grid>
      ) : (
        <Grid container mt={3}>
          <Grid item xs={12}>
            <H3>{messages['common.no_data_found']}</H3>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};
export default StaticContent;

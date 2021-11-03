import React from 'react';
import {
  Box,
  CardMedia,
  Container,
  Grid,
  Tooltip,
  Typography,
} from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ShareIcon from '@mui/icons-material/Share';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import SystemUpdateAltOutlinedIcon from '@mui/icons-material/SystemUpdateAltOutlined';
import DateRangeIcon from '@mui/icons-material/DateRange';
import useStyles from './index.style';
import {useIntl} from 'react-intl';

const NoticeDetails = () => {
  const classes = useStyles();
  const {messages} = useIntl();

  return (
    <Container maxWidth={'lg'}>
      <Grid container spacing={3}>
        <Grid item xs={12} mt={5}>
          <Grid container>
            <Grid item xs={6}>
              <Box className={classes.date}>
                <DateRangeIcon />
                <Typography>Friday,9th july,2021</Typography>
              </Box>
            </Grid>
            <Grid item xs={6} textAlign={'right'}>
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

        <Grid item xs={12}>
          <Typography variant={'h6'} fontWeight={'bold'}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur,
            sit.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <CardMedia
            component='img'
            height='300'
            image='/images/notice_details.jpg'
            alt='image'
            title={'Lorem ipsum dolor sit amet'}
          />
        </Grid>
        <Grid item xs={12}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus
          aperiam architecto aut corporis delectus deleniti dolor, dolorum eius
          eos esse ex ipsa laborum magnam magni quisquam quos tempore tenetur
          ullam veniam vero. Asperiores blanditiis delectus, facilis, fuga in
          laboriosam maxime obcaecati perferendis quod totam vel, velit vero
          voluptatum. Accusamus accusantium adipisci animi, aperiam at aut
          blanditiis commodi delectus deleniti dicta dolorum error esse
          exercitationem facere id illum magni maxime minus, mollitia nam neque
          nostrum numquam perspiciatis quae qui quibusdam recusandae reiciendis
          repellendus rerum sapiente sed temporibus velit veniam. Alias aliquid
          distinctio esse, facere facilis in iste libero necessitatibus nemo
          nihil non nulla omnis possimus quo quos, ullam veritatis. Id labore
          laboriosam sapiente voluptates? Deleniti eius harum modi officiis
          pariatur quasi quidem saepe. Ab animi architecto asperiores atque
          debitis dignissimos dolores eius enim facere fugiat impedit itaque
          iure modi neque nisi nobis officia possimus praesentium provident
          quisquam, repellat veniam vero voluptatem! Accusantium aliquam
          assumenda beatae consequuntur cumque dicta dolor ea eaque, eligendi
          eos esse hic illum inventore ipsa ipsum itaque maxime neque nostrum
          odit perferendis quaerat quia quidem ratione, sequi tempora unde
          veniam? Alias blanditiis cupiditate ea eos esse eum expedita
          explicabo, facere illum inventore iusto laborum numquam, omnis
          suscipit voluptatibus?
        </Grid>
      </Grid>
    </Container>
  );
};

export default NoticeDetails;

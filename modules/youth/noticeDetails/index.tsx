import React from 'react';
import {
  Box,
  CardMedia,
  Container,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ShareIcon from '@mui/icons-material/Share';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import SystemUpdateAltOutlinedIcon from '@mui/icons-material/SystemUpdateAltOutlined';
import DateRangeIcon from '@mui/icons-material/DateRange';
import useStyles from './index.style';
const NoticeDetails = () => {
  const classes = useStyles();
  return (
    <Container maxWidth={'lg'}>
      <Grid container spacing={3} padding={10}>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={6}>
              <Box className={classes.date}>
                <DateRangeIcon />
                <Typography>Friday,9th july,2021</Typography>
              </Box>
            </Grid>
            <Grid item xs={6} textAlign={'right'}>
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

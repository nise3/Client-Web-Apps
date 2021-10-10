import React, {FC} from 'react';
import useStyles from './NoticeBoard.style';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import {useIntl} from 'react-intl';

interface NoticeCardProps {
  notice: any;
}

const NoticeCard: FC<NoticeCardProps> = ({notice}) => {
  const classes = useStyles();
  const {messages} = useIntl();
  const URL = `/youth/notice-details/${notice.id}`;
  return (
    <Card style={{padding: '10px'}}>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={3} md={3}>
            <Box className={classes.avatar}>
              <Avatar src={notice.logo} className={classes.avatarImage} />
            </Box>
          </Grid>
          <Grid item xs={9} md={9}>
            <Link href={URL} passHref>
              <Typography style={{fontWeight: 'bold', cursor: 'pointer'}}>
                {notice.title}
              </Typography>
            </Link>

            <Typography className={classes.creativaItText}>
              {notice.providerName}
            </Typography>

            <Box>
              <Button variant='outlined' className={classes.btn}>
                {notice.noticeDate}
              </Button>
              <Button color={'primary'}>{messages['common.download']}</Button>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default NoticeCard;

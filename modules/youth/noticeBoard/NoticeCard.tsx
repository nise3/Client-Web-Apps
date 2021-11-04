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
import {getIntlDateFromString} from '../../../@softbd/utilities/helpers';

interface NoticeCardProps {
  notice: any;
}

const logo = '/images/creativeIt.png';

const NoticeCard: FC<NoticeCardProps> = ({notice}) => {
  const classes = useStyles();
  const {messages, formatDate} = useIntl();
  const URL = `/youth/notice-details/${notice.id}`;
  return (
    <Card style={{padding: '10px'}}>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={3} md={3}>
            <Box className={classes.avatar}>
              {/*Todo: logo have to implement after real api ready*/}
              <Avatar src={logo} className={classes.avatarImage} />
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
              {/*<Chip
                label={getIntlDateFromString(formatDate, notice.noticeDate)}
                variant={'outlined'}
                color={'primary'}
                sx={{
                  marginRight: '10px',
                  borderRadius: 0,
                  background: '#e4f1ea',
                  border: 'none',
                }}
              />*/}
              <Button
                variant='outlined'
                className={classes.btn}
                sx={{background: '#e4f1ea', border: 'none'}}>
                {getIntlDateFromString(formatDate, notice.noticeDate)}
              </Button>
              <Button color={'primary'} variant={'outlined'}>
                {messages['common.download']}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default NoticeCard;

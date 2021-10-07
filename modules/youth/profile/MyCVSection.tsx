import {Box, Button, Card, CardContent, Grid, Typography} from '@mui/material';
import {Add} from '@mui/icons-material';
import Image from 'next/image';
import youthCV from '../../../public/images/youth/youth-cv.jpg';
import React from 'react';
import {useIntl} from 'react-intl';

const MyCVSection = () => {
  const {messages} = useIntl();

  return (
    <Card>
      <CardContent>
        <Grid container>
          <Grid item xs={9}>
            <Typography variant={'h6'}>
              {messages['youth_profile.my_cv']}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <input
              type='file'
              accept='image/pdf/doc/*'
              style={{display: 'none'}}
              id='contained-button-file'
            />
            <label htmlFor='contained-button-file'>
              <Button variant='contained' color='primary' component='span'>
                <Add />
              </Button>
            </label>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={8}>
                <Image src={youthCV} />
              </Grid>
            </Grid>
          </Grid>

          <Box mt={2} width={'100%'}>
            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <Button
                    variant={'contained'}
                    color={'primary'}
                    fullWidth={true}>
                    {messages['common.view']}
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant={'outlined'}
                    color={'primary'}
                    fullWidth={true}>
                    {messages['common.download']}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default MyCVSection;

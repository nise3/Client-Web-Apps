import HorizontalLine from './component/HorizontalLine';
import React from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {Avatar, Box, Grid, Typography} from '@mui/material';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import CustomParabolaButton from './component/CustomParabolaButton';
import {BorderColor} from '@mui/icons-material';
import {useIntl} from 'react-intl';

type ReferenceProp = {
  key: number;
  name: string;
  image: any;
  position: string;
  email?: string;
  phone?: string;
  location?: string;
  onclick?: () => void;
};

const Reference = ({
  key,
  name,
  image,
  position,
  email,
  phone,
  location,
  onclick,
}: ReferenceProp) => {
  const {messages} = useIntl();

  return (
    <React.Fragment key={key}>
      <HorizontalLine />

      <Grid container justifyContent={'space-between'}>
        <Grid item sm={8}>
          <Grid container>
            <Grid item sm={2}>
              <Avatar
                alt='Remy Sharp'
                src={image}
                sx={{height: 80, width: 80}}
              />
            </Grid>
            <Grid item>
              <Box mb={2}>
                <Typography variant={'subtitle2'}>{name}</Typography>
                <Typography variant={'caption'}>{position}</Typography>
                <Grid container spacing={4}>
                  <Grid item>
                    <Typography variant={'caption'}>
                      <LocalPhoneIcon fontSize={'small'} />
                      {email}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant={'caption'}>
                      <LocalPhoneIcon fontSize={'small'} />
                      {phone}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant={'caption'}>
                      <LocationOnIcon fontSize={'small'} />
                      {location}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container spacing={2} justifyContent={'flex-end'}>
            <Grid item>
              <Box>
                <CustomParabolaButton
                  buttonVariant={'outlined'}
                  title={messages['common.delete_btn'] as string}
                  icon={<BorderColor />}
                  onclick={onclick}
                />
              </Box>
            </Grid>
            <Grid item>
              <Box>
                <CustomParabolaButton
                  buttonVariant={'outlined'}
                  title={messages['common.edit_btn'] as string}
                  icon={<BorderColor />}
                  onclick={onclick}
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Reference;

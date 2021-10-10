import HorizontalLine from './component/HorizontalLine';
import React from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {Avatar, Box, Grid, Typography} from '@mui/material';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import CustomParabolaButton from './component/CustomParabolaButton';
import {BorderColor} from '@mui/icons-material';
import {useIntl} from 'react-intl';
import CircularDeleteButton from './component/CircularDeleteButton';
type ReferenceProp = {
  key: number;
  reference: any;
  openReferenceAddEditForm?: () => void;
  onDelete?: () => void;
};

const Reference = ({
  key,
  reference,
  openReferenceAddEditForm,
  onDelete,
}: ReferenceProp) => {
  const {messages} = useIntl();

  return (
    <React.Fragment key={key}>
      <HorizontalLine />

      <Grid container justifyContent={'space-between'}>
        <Grid item xs={12} md={8}>
          <Grid container>
            <Grid item xs={4} md={2}>
              <Avatar
                alt='Reference logo'
                src={'/images/youth/avatar.png'}
                sx={{height: 80, width: 80}}
              />
            </Grid>
            <Grid item xs={8} md={8}>
              <Box mb={2}>
                <Typography variant={'subtitle2'}>
                  {reference.referrer_first_name}
                </Typography>
                <Typography variant={'caption'}>
                  {reference.referrer_designation}
                </Typography>
                <Grid container spacing={4}>
                  <Grid item>
                    <Typography variant={'caption'} sx={{display: 'flex'}}>
                      <LocalPhoneIcon fontSize={'small'} />
                      {reference.referrer_email}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant={'caption'} sx={{display: 'flex'}}>
                      <LocalPhoneIcon fontSize={'small'} />
                      {reference.referrer_mobile}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant={'caption'} sx={{display: 'flex'}}>
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
            <Box mt={2}>
              <CustomParabolaButton
                buttonVariant={'outlined'}
                title={messages['common.edit_btn'] as string}
                icon={<BorderColor />}
                onclick={openReferenceAddEditForm}
              />
              {onDelete && (
                <CircularDeleteButton
                  deleteAction={onDelete}
                  deleteTitle={'delete reference'}
                />
              )}
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Reference;

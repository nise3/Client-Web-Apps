import HorizontalLine from '../component/HorizontalLine';
import React from 'react';
import {Avatar, Box, Grid, Typography} from '@mui/material';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import CustomParabolaButton from '../component/CustomParabolaButton';
import {BorderColor, Email, LocationOn} from '@mui/icons-material';
import {useIntl} from 'react-intl';
import CircularDeleteButton from '../component/CircularDeleteButton';
import {YouthReference} from '../../../../services/youthManagement/typing';

type ReferencesProp = {
  references: Array<YouthReference> | undefined;
  openReferenceAddEditForm: (referenceId: number) => void;
  onDeleteReference: (referenceId: number) => void;
};

const References = ({
  references,
  openReferenceAddEditForm,
  onDeleteReference,
}: ReferencesProp) => {
  const {messages} = useIntl();

  return (
    <React.Fragment>
      {(references || []).map((reference: any) => (
        <React.Fragment key={reference?.id}>
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
                      {reference?.referrer_first_name}{' '}
                      {reference?.referrer_last_name}
                    </Typography>
                    <Typography variant={'caption'}>
                      {reference?.referrer_designation}
                    </Typography>
                    <Typography variant={'caption'}>
                      {reference?.referrer_organization_name}
                    </Typography>
                    <Grid container spacing={4}>
                      <Grid item>
                        <Typography variant={'caption'} sx={{display: 'flex'}}>
                          <Email fontSize={'small'} />
                          {reference?.referrer_email}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant={'caption'} sx={{display: 'flex'}}>
                          <LocalPhoneIcon fontSize={'small'} />
                          {reference?.referrer_mobile}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant={'caption'} sx={{display: 'flex'}}>
                          <LocationOn fontSize={'small'} />
                          {reference?.referrer_address}
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
                    onClick={() => {
                      openReferenceAddEditForm(reference.id);
                    }}
                  />
                  <CircularDeleteButton
                    deleteAction={() => {
                      onDeleteReference(reference.id);
                    }}
                    deleteTitle={'Delete'}
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </React.Fragment>
      ))}
    </React.Fragment>
  );
};
export default References;

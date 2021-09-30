import {Box, Grid, Typography} from '@material-ui/core';
import CustomParabolaButton from './component/CustomParabolaButton';
import React from 'react';

type CardHeaderProps = {
  headerTitle?: string;
  buttonLabel?: string;
  buttonIcon?: any;
};

const CardHeader = ({
  headerTitle,
  buttonLabel,
  buttonIcon,
}: CardHeaderProps) => {
  return (
    <Grid item container sm={12} justifyContent={'space-between'}>
      <Grid item sm={6}>
        <Typography variant={'h6'}>
          <Box component={'span'} fontWeight='fontWeightBold'>
            {headerTitle}
          </Box>
        </Typography>
      </Grid>
      {buttonLabel && (
        <Grid item container sm={6} justifyContent={'flex-end'}>
          <CustomParabolaButton
            buttonVariant={'outlined'}
            title={buttonLabel}
            icon={buttonIcon}
          />
        </Grid>
      )}
    </Grid>
  );
};

export default CardHeader;

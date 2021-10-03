import CustomParabolaButton from './component/CustomParabolaButton';
import React from 'react';
import {Box, Grid, Typography} from '@mui/material';

type CardHeaderProps = {
  headerTitle?: string;
  buttons?: Array<any>;
};

const CardHeader = ({headerTitle, buttons}: CardHeaderProps) => {
  return (
    <Grid item container sm={12} justifyContent={'space-between'}>
      <Grid item sm={6}>
        <Typography variant={'h6'}>
          <Box component={'span'} fontWeight='fontWeightBold'>
            {headerTitle}
          </Box>
        </Typography>
      </Grid>

      <Grid item sm={6}>
        <Grid container justifyContent={'flex-end'}>
          {buttons?.map((button: any) => {
            return (
              <Box ml={2}>
                <CustomParabolaButton
                  buttonVariant={'outlined'}
                  title={button.label}
                  icon={button.icon}
                />
              </Box>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CardHeader;

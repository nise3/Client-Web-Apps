import CustomParabolaButton from './component/CustomParabolaButton';
import React from 'react';
import {Box, Grid, Typography} from '@mui/material';

type CardHeaderProps = {
  headerTitle?: string;
  buttons?: Array<any>;
  onclick?: () => void;
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
          {buttons?.map((button: any, index: number) => {
            return (
              <Box ml={2} key={index}>
                <CustomParabolaButton
                  buttonVariant={'outlined'}
                  title={button.label}
                  icon={button.icon}
                  onClick={button.onclick}
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

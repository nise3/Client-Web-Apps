import React from 'react';
import {responsiveFontSizes} from '@mui/material';
import {ThemeProvider, useTheme} from '@mui/material/styles';
import YouthLayout from '../../frontEnd/YouthLayout';
import theme from '../../themes/youth';

const withLayout = (ComposedComponent: any) => (props: any) => {
  return (
    <ThemeProvider theme={responsiveFontSizes(theme(useTheme()))}>
      <YouthLayout>
        <ComposedComponent {...props} />
      </YouthLayout>
    </ThemeProvider>
  );
};
export default withLayout;

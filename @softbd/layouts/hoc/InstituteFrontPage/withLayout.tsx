import React from 'react';
import NiseLayout from '../../frontEnd/NiseLayout';
import {responsiveFontSizes} from '@mui/material';
import {ThemeProvider} from '@mui/material/styles';
import theme from '../../themes/nise';

const withLayout = (ComposedComponent: any) => (props: any) => {
  return (
    <ThemeProvider theme={responsiveFontSizes(theme())}>
      <NiseLayout>
        <ComposedComponent {...props} />
      </NiseLayout>
    </ThemeProvider>
  );
};
export default withLayout;

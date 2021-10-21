import React from 'react';
import InstituteDefaultLayout from '../../frontEnd/InstituteDefaultLayout';
import {responsiveFontSizes} from '@mui/material';
import {ThemeProvider} from '@mui/material/styles';
import theme from '../../themes/instituteDefault';

const withLayout = (ComposedComponent: any) => (props: any) => {
  return (
    <ThemeProvider theme={responsiveFontSizes(theme())}>
      <InstituteDefaultLayout>
        <ComposedComponent {...props} />
      </InstituteDefaultLayout>
    </ThemeProvider>
  );
};
export default withLayout;

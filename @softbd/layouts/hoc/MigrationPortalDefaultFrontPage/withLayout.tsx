import React from 'react';
import MigrationPortalDefaultLayout from '../../frontEnd/MigrationPortalDefaultLayout';
import {responsiveFontSizes, useTheme} from '@mui/material';
import {ThemeProvider} from '@mui/material/styles';
import theme from '../../themes/instituteDefault';

const withLayout = (ComposedComponent: any) => (props: any) => {
  const defaultTheme = useTheme();
  return (
    <ThemeProvider theme={responsiveFontSizes(theme(defaultTheme))}>
      <MigrationPortalDefaultLayout>
        <ComposedComponent {...props} />
      </MigrationPortalDefaultLayout>
    </ThemeProvider>
  );
};
export default withLayout;

import React from 'react';
import Layouts from '../../core/AppLayout/Layouts';
import {NavStyle} from '../../../shared/constants/AppEnums';

const withLayout = (ComposedComponent: any) => (props: any) => {
  const AppLayout = Layouts[NavStyle.HOR_DARK_LAYOUT];
  return (
    <AppLayout>
      <ComposedComponent {...props} />
    </AppLayout>
  );
};
export default withLayout;

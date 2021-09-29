import React from 'react';
import FrontEndDefaultLayout from '../../core/AppLayout/FrontEndLayout/FrontEndDefaultLayout';
import useStyles from '../../../shared/jss/common/common.style';

const withLayout = (ComposedComponent: any) => (props: any) => {
  useStyles();

  return (
    <FrontEndDefaultLayout>
      <ComposedComponent {...props} />
    </FrontEndDefaultLayout>
  );
};
export default withLayout;

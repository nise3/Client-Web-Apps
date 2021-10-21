import React from 'react';
import useStyles from '../../../../shared/jss/common/common.style';
import StandardLayout from '../../backend/Standard';

const withLayout = (ComposedComponent: any) => (props: any) => {
  useStyles();
  return (
    <StandardLayout>
      <ComposedComponent {...props} />
    </StandardLayout>
  );
};

export default withLayout;

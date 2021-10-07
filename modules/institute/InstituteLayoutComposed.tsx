import {compose} from 'redux';
import withData from '../../@crema/hoc/FrontPage/withData';
// import withLayout from './withLayout';
import React from 'react';
import InstituteLayout from './InstituteLayout';
import useStyles from '../../shared/jss/common/common.style';

const withLayout = (ComposedComponent: any) => (props: any) => {
  useStyles();

  return (
    <InstituteLayout>
      <ComposedComponent {...props} />
    </InstituteLayout>
  );
};

export default compose(withData, withLayout);

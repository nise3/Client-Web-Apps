import React from 'react';
import {Skeleton} from '@material-ui/lab';

const HeaderSkeleton = () => {
  return (
    <>
      <Skeleton variant='text' height={100} style={{margin: "5px"}}/>
    </>
  );
};

export default HeaderSkeleton;
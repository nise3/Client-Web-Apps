import {Skeleton} from '@material-ui/lab';
import React from 'react';

const ButtonSkeleton = () => {
  return (
    <>
      <Skeleton variant="text" height={60} width={100}/>
    </>
  );
};

export default ButtonSkeleton;
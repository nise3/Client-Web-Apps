import { Skeleton } from '@mui/material';
import React from 'react';

const TextInputSkeleton = () => {
  return (
    <>
      <Skeleton variant='text' height={50} />
    </>
  );
};

export default React.memo(TextInputSkeleton);
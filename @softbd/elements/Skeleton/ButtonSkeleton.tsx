import {Skeleton} from '@material-ui/lab';
import React from 'react';

type Props = {
  isCircle?: boolean;
};

const ButtonSkeleton = ({isCircle}: Props) => {
  return (
    <>
      {isCircle ? (
        <Skeleton variant='circle' width={60} height={60} />
      ) : (
        <Skeleton variant='text' height={60} width={100} />
      )}
    </>
  );
};

export default ButtonSkeleton;

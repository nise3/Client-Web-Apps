import {Skeleton} from '@material-ui/lab';
import React from 'react';
import {TableBody, TableCell, TableRow} from '@material-ui/core';

type Props = {
  columnNumbers?: any;
};

const TableSkeleton = ({columnNumbers}: Props) => {
  return (
    <TableBody>
      <TableRow key={1}>
        <TableCell colSpan={columnNumbers}>
          {[1, 2, 3, 4, 5].map((item) => (
            <Skeleton key={item} variant='text' width={'100%'} height={50} />
          ))}
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

export default TableSkeleton;

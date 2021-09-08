import {Skeleton} from '@material-ui/lab';
import React from 'react';
import {TableBody, TableCell, TableRow} from '@material-ui/core';
import {range} from '../../../../common/helpers';

type Props = {
  columnNumbers: number;
  rowSize: number;
};

const TableSkeleton = ({columnNumbers, rowSize = 1}: Props) => {
  const rows = range(rowSize, 1);

  return (
    <TableBody>
      <TableRow key={1}>
        <TableCell colSpan={columnNumbers}>
          {rows.map((item) => (
            <Skeleton key={item} variant='text' width={'100%'} height={50} />
          ))}
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

export default TableSkeleton;

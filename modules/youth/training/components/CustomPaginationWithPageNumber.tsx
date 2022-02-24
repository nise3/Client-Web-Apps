import {Grid, Pagination, TablePagination} from '@mui/material';
import React from 'react';
import {styled} from '@mui/material/styles';
import {useIntl} from 'react-intl';

type Props = {
  count: number;
  currentPage: number;
  queryPageNumber: number;
  onPaginationChange: (event: any, currentPage: number) => void;
  onRowsPerPageChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  rowsPerPage?: any;
};

const PREFIX = 'CustomPaginationWithPageNumber';

export const classes = {
  subHeader: `${PREFIX}-subHeader`,
};

export const StyledGrid = styled(Grid)(({theme}) => ({
  '& .MuiTablePagination-displayedRows': {
    display: 'none',
  },
  '& .MuiTablePagination-actions': {
    display: 'none',
  },
  '& .MuiPagination-root': {
    marginTop: '20px',
  },
}));

const CustomPaginationWithPageNumber = ({
  count,
  currentPage,
  queryPageNumber,
  onPaginationChange,
  rowsPerPage,
  onRowsPerPageChange: onRowsPerPageChangeCallback,
}: Props) => {
  const {messages} = useIntl();
  const labelRowsPerPage: any = messages['common.per_page'];

  return (
    <StyledGrid container>
      <TablePagination
        component='span'
        count={count}
        page={0}
        onPageChange={() => {}}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={onRowsPerPageChangeCallback}
        labelRowsPerPage={labelRowsPerPage}
      />

      <Pagination
        page={queryPageNumber ? Number(queryPageNumber) : currentPage}
        count={count}
        color={'primary'}
        shape='rounded'
        onChange={onPaginationChange}
      />
    </StyledGrid>
  );
};

export default CustomPaginationWithPageNumber;

import {
  Box,
  Pagination,
  PaginationItem,
  PaginationRenderItemParams,
  TablePagination,
} from '@mui/material';
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

export const StyledBox = styled(Box)(({theme}) => ({
  display: 'flex',
  '& .MuiTablePagination-displayedRows': {
    display: 'none',
  },
  '& .MuiTablePagination-actions': {
    display: 'none',
  },
  '& .MuiTablePagination-toolbar': {
    padding: '0px',
    '& .MuiInputBase-root': {
      marginRight: '5px',
    },
  },
  '& .MuiPagination-root': {
    marginTop: '10px',
  },
  [`& .MuiTablePagination-select`]: {
    border: '1px solid gray',
    padding: '3px 0px',
    borderRadius: '6px !important',
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
  const {messages, formatNumber} = useIntl();
  const labelRowsPerPage: any = messages['common.per_page'];
  const rowsPerPageOptions = [
    {value: 10, label: formatNumber(10)},
    {value: 25, label: formatNumber(25)},
    {value: 50, label: formatNumber(50)},
    {value: 100, label: formatNumber(100)},
  ];

  return (
    <StyledBox>
      <TablePagination
        component='span'
        count={count}
        page={0}
        onPageChange={() => {}}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={onRowsPerPageChangeCallback}
        labelRowsPerPage={labelRowsPerPage}
        rowsPerPageOptions={rowsPerPageOptions}
      />

      <Pagination
        page={queryPageNumber ? Number(queryPageNumber) : currentPage}
        count={count}
        color={'primary'}
        shape='rounded'
        onChange={onPaginationChange}
        renderItem={(item: PaginationRenderItemParams) => {
          return <PaginationItem {...item} />;
        }}
      />
    </StyledBox>
  );
};

export default CustomPaginationWithPageNumber;

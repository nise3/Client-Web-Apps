import {
  Grid,
  Pagination,
  PaginationItem,
  PaginationRenderItemParams,
  TablePagination,
} from '@mui/material';
import React from 'react';
import {styled} from '@mui/material/styles';
import {useIntl} from 'react-intl';
import localeLanguage from '../../../../@softbd/utilities/LocaleLanguage';

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
  const {messages, locale} = useIntl();
  const labelRowsPerPage: any = messages['common.per_page'];
  const rowsPerPageOptions = [
    {value: 5, label: locale == localeLanguage.EN ? '5' : '৫'},
    {value: 10, label: locale == localeLanguage.EN ? '10' : '১০'},
    {value: 25, label: locale == localeLanguage.EN ? '25' : '২৫'},
    {value: 50, label: locale == localeLanguage.EN ? '50' : '৫০'},
  ];

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
    </StyledGrid>
  );
};

export default CustomPaginationWithPageNumber;

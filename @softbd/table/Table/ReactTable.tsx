import {
  Grid,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Theme,
} from '@material-ui/core';
import React, {ReactElement} from 'react';
import {
  HeaderProps,
  useColumnOrder,
  useExpanded,
  useFilters,
  useFlexLayout,
  useGroupBy,
  usePagination,
  useResizeColumns,
  useRowSelect,
  useSortBy,
  useTable,
} from 'react-table';

import {camelToWords} from '../utils';
import {FilterChipBar} from './FilterChipBar';
import {fuzzyTextFilter, numericTextFilter, rowStatusFilter} from './filters';
import {TableToolbar} from './TableToolbar';
import {TooltipCell} from './TooltipCell';
import {ThemeMode} from '../../../shared/constants/AppEnums';
import TableSkeleton from '../../elements/display/skeleton/TableSkeleton/TableSkeleton';
import {DefaultColumnFilter} from '../Filters/filter';

const useStyles = makeStyles((theme: Theme): any => ({
  tableRoot: {
    borderCollapse: 'separate !important',
    borderSpacing: '0px 10px !important',
  },
  tableCell: {
    border: 'none !important',
    padding: '10px 15px',
    verticalAlign: 'unset',
  },
  tableRow: {
    boxShadow:
      theme.palette.type === ThemeMode.DARK
        ? '0px 0px 10px 1px #222'
        : '0px 0px 10px 1px #e9e9e9',
  },
}));

export const range = (total: number, startFrom: number = 0): Array<number> => {
  let items: number[] = [];
  for (let i = startFrom; i <= total; i++) {
    items.push(i);
  }
  return items;
};

export const generatePageNumber = (
  pageIndex: number,
  totalPage: number,
  totalSlide: number = 5,
): Array<number> => {
  let startFrom =
    pageIndex === 1
      ? pageIndex
      : pageIndex === 2
      ? pageIndex - 1
      : pageIndex - 2;
  return totalPage === 0
    ? []
    : range(Math.min(totalSlide + startFrom, totalPage), startFrom);
};

const DefaultHeader: React.FC<HeaderProps<any>> = ({column}) => (
  <>{column.id.startsWith('_') ? null : camelToWords(column.id)}</>
);

const defaultColumn = {
  Filter: DefaultColumnFilter,
  Cell: TooltipCell,
  Header: DefaultHeader,
  // When using the useFlexLayout:
  minWidth: 30, // minWidth is only used as a limit for resizing
  width: 150, // width is used for both the flex-basis and flex-grow
  maxWidth: 200, // maxWidth is only used as a limit for resizing
};

const hooks = [
  useColumnOrder,
  useFilters,
  useGroupBy,
  useSortBy,
  useExpanded,
  useFlexLayout,
  usePagination,
  useResizeColumns,
  useRowSelect,
];

const filterTypes = {
  fuzzyText: fuzzyTextFilter,
  numeric: numericTextFilter,
  rowStatusFilter: rowStatusFilter,
};

export default function ReactTable<T extends object>({
  columns,
  leftToolbarHtml = '',
  fetchData,
  pageCount: controlledPageCount,
  skipPageResetRef = false,
  skipDefaultFilter = false,
  loading = false,
  toggleResetTable = false,
  pageSize: controlledPageSize = 10,
  hideToolbar = false,
  ...props
}: any): ReactElement {
  const isServerSideTable = typeof fetchData !== 'undefined';

  const classes: any = useStyles();

  const clientSideOptions = {
    ...props,
    columns,
    filterTypes,
    defaultColumn,
  };
  const serverSideOptions = {
    ...props,
    columns,
    autoResetHiddenColumns: false,
    manualPagination: true,
    manualFilters: skipDefaultFilter,
    autoResetPage: !skipPageResetRef.current,
    autoResetExpanded: !skipPageResetRef.current,
    autoResetGroupBy: !skipPageResetRef.current,
    autoResetSelectedRows: !skipPageResetRef.current,
    autoResetSortBy: !skipPageResetRef.current,
    autoResetFilters: !skipPageResetRef.current,
    autoResetRowState: !skipPageResetRef.current,
    manualGlobalFilter: true,
    manualExpandedKey: true,
    manualGroupBy: true,
    manualSortBy: true,
    manualRowSelectedKey: true,
    pageCount: controlledPageCount,
    initialState: {pageSize: controlledPageSize},
    filterTypes,
    defaultColumn,
    // stateReducer: (newState, action, prevState) => {
    //   console.log(prevState);
    //   return newState;
    // },
    useControlledState: (state: any) => {
      return React.useMemo(
        () => ({
          ...state,
        }),
        [state],
      );
    },
  };

  const instance = useTable<T>(
    isServerSideTable ? serverSideOptions : clientSideOptions,
    ...hooks,
  );

  const {
    getTableProps,
    headerGroups,
    getTableBodyProps,
    page,
    // setAllFilters, // to reset filter manually.
    prepareRow,
    state: {pageIndex, pageSize, sortBy, filters},
    pageCount,
  } = instance;

  React.useEffect(() => {
    if (isServerSideTable) {
      fetchData({pageIndex, pageSize, sortBy, filters});
    }
  }, [fetchData, pageIndex, pageSize, sortBy, filters, toggleResetTable]);
  return (
    <>
      <Grid container>
        <Grid item md={12}>
          <TableContainer style={{position: 'relative'}}>
            {!hideToolbar && (
              <TableToolbar
                instance={instance}
                // loading={loading}
                leftToolbarHtml={leftToolbarHtml}
              />
            )}
            {!hideToolbar && <FilterChipBar<T> instance={instance} />}
            <Table
              {...(getTableProps() as any)}
              size='small'
              aria-label='a dense table'
              className={classes.tableRoot}>
              <TableHead>
                {headerGroups.map((headerGroup, index) => (
                  <TableRow key={index} className={classes.tableRow}>
                    {headerGroup.headers.map((column, index) => (
                      <TableCell
                        key={index}
                        className={classes.tableCell}
                        style={{
                          fontWeight: 'bold',
                          border: '1px solid rgba(224, 224, 224, 1)',
                        }}>
                        {column.render('Header')}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableHead>
              {loading ? (
                <TableSkeleton columnNumbers={headerGroups[0].headers.length} />
              ) : (
                <TableBody {...(getTableBodyProps() as any)}>
                  {page.map((row) => {
                    prepareRow(row);
                    return (
                      <TableRow key={row.id} className={classes.tableRow}>
                        {row.cells.map((cell, index) => {
                          return (
                            <TableCell
                              style={{
                                border: '1px solid rgba(224, 224, 224, 1)',
                                textAlign: 'left',
                              }}
                              key={index}
                              className={classes.tableCell}>
                              {cell.render('Cell')}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
                </TableBody>
              )}
            </Table>
          </TableContainer>
        </Grid>

        <Grid item md={12}>
          {pageCount > 1 && (
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component='div'
              count={pageCount}
              rowsPerPage={10}
              page={1}
              onPageChange={() => null}
              onRowsPerPageChange={() => null}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
}

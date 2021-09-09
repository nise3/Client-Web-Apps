import {
  Grid,
  makeStyles,
  Table,
  TableBody,
  TableCell,
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
import AppTableContainer from '../../../@crema/core/AppTableContainer';
import {useIntl} from 'react-intl';
import {AiOutlineInbox} from 'react-icons/ai';

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
  tablePagination: {
    display: 'flex',
    justifyContent: 'center',
  },
  noDataIcon: {
    color: theme.palette.type === ThemeMode.DARK ? '#6c6c6c' : '#ddd',
  },
  noDataText: {
    display: 'block',
    color: theme.palette.type === ThemeMode.DARK ? '#7d7d7d' : '#a0a0a0',
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

interface TReactTableColumns {
  Header: any;
  accessor: string;
  disableFilters: boolean;
  disableSortBy: boolean;
  filter: 'any';
  Cell: 'any';
}

interface TReactTable {
  columns: Array<TReactTableColumns>;
  leftToolbarHtml?: string | React.ReactNode;
  fetchData?: any;
  pageCount?: number;
  skipPageResetRef?: boolean;
  skipDefaultFilter?: boolean;
  loading?: boolean;
  toggleResetTable: boolean;
  pageSize?: number;
  hideToolbar?: boolean;
  pageSizeData?: number[];
  totalCount?: number;
  data?: any[];

  [x: string]: any;
}

/**
 * @param columns
 * @param leftToolbarHtml
 * @param fetchData
 * @param controlledPageCount
 * @param skipPageResetRef
 * @param skipDefaultFilter
 * @param loading
 * @param toggleResetTable
 * @param controlledPageSize
 * @param hideToolbar
 * @param pageSizeData
 * @param data
 * @param totalCount
 * @param props
 * @constructor
 */
export default function ReactTable<T extends object>({
  columns,
  leftToolbarHtml = '',
  fetchData,
  pageCount: controlledPageCount,
  skipPageResetRef = typeof fetchData !== 'undefined',
  skipDefaultFilter = typeof fetchData === 'undefined',
  loading = false,
  toggleResetTable = false,
  pageSize: controlledPageSize,
  hideToolbar = false,
  pageSizeData = [10, 15, 20, 25, 30],
  data,
  totalCount = data ? data.length : 0,
  ...props
}: TReactTable | any): ReactElement {
  const {messages} = useIntl();
  const isServerSideTable = typeof fetchData !== 'undefined';

  const classes: any = useStyles();

  const clientSideOptions = {
    ...props,
    columns,
    data,
    initialState: {pageSize: pageSizeData[0]},
    filterTypes,
    defaultColumn,
  };
  const serverSideOptions = {
    ...props,
    columns,
    data,
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
    initialState: {pageSize: pageSizeData[0]},
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
    gotoPage,
    setPageSize,
  } = instance;

  React.useEffect(() => {
    if (isServerSideTable) {
      fetchData({pageIndex, pageSize, sortBy, filters});
    }
  }, [fetchData, pageIndex, pageSize, sortBy, filters, toggleResetTable]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    gotoPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setPageSize(parseInt(event.target.value, 10));
    gotoPage(0);
  };

  return (
    <>
      <Grid container>
        <Grid item md={12}>
          {!hideToolbar && (
            <TableToolbar
              instance={instance}
              // loading={loading}
              leftToolbarHtml={leftToolbarHtml}
            />
          )}
          {!hideToolbar && <FilterChipBar<T> instance={instance} />}
        </Grid>

        <Grid item md={12}>
          <AppTableContainer>
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
                <TableSkeleton
                  rowSize={pageSize}
                  columnNumbers={headerGroups[0].headers.length}
                />
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
                  {page.length == 0 && (
                    <TableRow key={0} className={classes.tableRow}>
                      <TableCell
                        style={{
                          border: '1px solid rgba(224, 224, 224, 1)',
                          textAlign: 'center',
                        }}
                        colSpan={columns?.length}
                        key={0}
                        className={classes.tableCell}>
                        <AiOutlineInbox
                          className={classes.noDataIcon}
                          size={'5em'}
                        />
                        <span className={classes.noDataText}>
                          {messages['common.no_data_found']}
                        </span>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              )}
            </Table>
          </AppTableContainer>
        </Grid>

        {page.length > 0 && (
          <Grid item md={12}>
            <TablePagination
              component='div'
              className={classes.tablePagination}
              rowsPerPageOptions={pageSizeData}
              count={totalCount}
              rowsPerPage={pageSize}
              page={pageIndex}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Grid>
        )}
      </Grid>
    </>
  );
}

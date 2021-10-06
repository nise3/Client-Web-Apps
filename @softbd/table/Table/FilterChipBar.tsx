import { Chip, Theme } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, {useCallback} from 'react';
import {ColumnInstance, FilterValue, IdType, TableInstance} from 'react-table';
import {getRowStatusLabel} from '../../utilities/RowStatus';
import {ThemeMode} from '../../../shared/constants/AppEnums';

const useStyles = makeStyles((theme: Theme): any => ({
  filtersActiveLabel: {
    color: theme.palette.mode === ThemeMode.DARK ? '#FFF' : '#998',
    fontSize: '14px',
    paddingRight: 10,
  },
  chipZone: {
    padding: '18px 0 5px 10px',
    width: '100%',
  },
  chipLabel: {
    fontWeight: 500,
    marginRight: 5,
  },
  filterChip: {
    marginRight: 4,
    color: theme.palette.mode === ThemeMode.DARK ? '#FFF' : '#222',
  },
}));

type FilterChipBar<T extends object> = {
  instance: TableInstance<T>;
};

const getFilterValue = (
  column: ColumnInstance<any>,
  filterValue: FilterValue,
) => {
  switch (column.filter) {
    case 'between':
      const min = filterValue[0];
      const max = filterValue[1];
      return min ? (max ? `${min}-${max}` : `>=${min}`) : `<=${max}`;
    case 'rowStatusFilter':
      return getRowStatusLabel(filterValue);
  }

  return filterValue;
};

export function FilterChipBar<T extends object>({instance}: FilterChipBar<T>) {
  const classes: any = useStyles();
  const {
    allColumns,
    setFilter,
    state: {filters},
  } = instance;
  const handleDelete = useCallback(
    (id: string | number) => {
      setFilter(id as IdType<T>, undefined);
    },
    [setFilter],
  );

  return Object.keys(filters).length > 0 ? (
    <div className={classes.chipZone}>
      <span className={classes.filtersActiveLabel}>Active filters:</span>
      {filters &&
        allColumns.map((column) => {
          const filter = filters.find((f) => f.id === column.id);
          const value = filter && filter.value;
          return (
            value && (
              <Chip
                className={classes.filterChip}
                key={column.id}
                label={
                  <>
                    <span className={classes.chipLabel}>
                      {column.render('Header')}:{' '}
                    </span>
                    {getFilterValue(column, value)}
                  </>
                }
                onDelete={() => handleDelete(column.id)}
                variant='outlined'
              />
            )
          );
        })}
    </div>
  ) : null;
}

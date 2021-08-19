// This is a custom aggregator that
// takes in an array of values and
// returns the rounded median
import { FilterProps, FilterValue, IdType, Row } from 'react-table';
import { PersonData } from '../utils';
import React from 'react';
import { Button, InputLabel, MenuItem, TextField } from '@material-ui/core';

export function roundedMedian(values: any[]) {
  let min = values[0] || '';
  let max = values[0] || '';

  values.forEach((value) => {
    min = Math.min(min, value);
    max = Math.max(max, value);
  });

  return Math.round((min + max) / 2);
}

export function filterGreaterThan(
  rows: Array<Row<any>>,
  id: Array<IdType<any>>,
  filterValue: FilterValue
) {
  return rows.filter((row) => {
    const rowValue = row.values[id[0]];
    return rowValue >= filterValue;
  });
}

// This is an autoRemove method on the filter function that
// when given the new filter value and returns true, the filter
// will be automatically removed. Normally this is just an undefined
// check, but here, we want to remove the filter if it's not a number
filterGreaterThan.autoRemove = (val: any) => typeof val !== 'number';

export function SelectAutoColumnFilter({
  column: { filterValue, render, setFilter, preFilteredRows, id }
}: FilterProps<PersonData>) {
  const options = React.useMemo(() => {
    const options: any = new Set();
    preFilteredRows.forEach((row: any) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  // Render a multi-select box
  return (
    <TextField
      select
      label={render('Header')}
      value={filterValue || ''}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
    >
      <MenuItem value={''}>All</MenuItem>
      {options.map((option: any, i) => (
        <MenuItem key={i} value={option}>
          {option}
        </MenuItem>
      ))}
    </TextField>
  );
}

export function SelectBooleanMatchEnableDisableColumnFilter({
  column: { filterValue, render, setFilter, preFilteredRows, id }
}: FilterProps<PersonData>) {
  const options = ['Disable', 'Enable'];

  return (
    <TextField
      select
      label={render('Header')}
      value={filterValue || ''}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
    >
      <MenuItem value={''}>All</MenuItem>
      {options.map((option, i) => (
        <MenuItem key={i} value={option}>
          {option}
        </MenuItem>
      ))}
    </TextField>
  );
}

export function SelectStringMatchEnableDisableColumnFilter({
  column: { filterValue, render, setFilter, preFilteredRows, id }
}: FilterProps<PersonData>) {
  const options = ['Disable', 'Enable'];

  return (
    <TextField
      select
      label={render('Header')}
      value={filterValue || ''}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
    >
      <MenuItem value={''}>All</MenuItem>
      {options.map((option, i) => (
        <MenuItem key={i} value={option}>
          {option}
        </MenuItem>
      ))}
    </TextField>
  );
}

export const getMinMax = (rows: Row<PersonData>[], id: IdType<PersonData>) => {
  let min = rows.length ? rows[0].values[id] : 0;
  let max = rows.length ? rows[0].values[id] : 0;
  rows.forEach((row) => {
    min = Math.min(row.values[id], min);
    max = Math.max(row.values[id], max);
  });
  return [min, max];
};

export function SliderColumnFilter({
  column: { render, filterValue, setFilter, preFilteredRows, id }
}: FilterProps<PersonData>) {
  const [min, max] = React.useMemo(() => getMinMax(preFilteredRows, id), [id, preFilteredRows]);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
      <TextField
        name={id}
        label={render('Header')}
        type='range'
        inputProps={{
          min,
          max
        }}
        value={filterValue || min}
        onChange={(e) => {
          setFilter(parseInt(e.target.value, 10));
        }}
      />
      <Button
        variant='outlined'
        style={{ width: 60, height: 36 }}
        onClick={() => setFilter(undefined)}
      >
        Off
      </Button>
    </div>
  );
}

export const useActiveElement = () => {
  const [active, setActive] = React.useState(document.activeElement);

  const handleFocusIn = () => {
    setActive(document.activeElement);
  };

  React.useEffect(() => {
    document.addEventListener('focusin', handleFocusIn);
    return () => {
      document.removeEventListener('focusin', handleFocusIn);
    };
  }, []);

  return active;
};

// This is a custom UI for our 'between' or number range
// filter. It uses two number boxes and filters rows to
// ones that have values between the two
export function NumberRangeColumnFilter({
  column: { filterValue = [], render, preFilteredRows, setFilter, id }
}: FilterProps<PersonData>) {
  const [min, max] = React.useMemo(() => getMinMax(preFilteredRows, id), [id, preFilteredRows]);
  const focusedElement = useActiveElement();
  const hasFocus =
    focusedElement && (focusedElement.id === `${id}_1` || focusedElement.id === `${id}_2`);
  return (
    <>
      <InputLabel htmlFor={id} shrink focused={!!hasFocus}>
        {render('Header')}
      </InputLabel>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          paddingTop: 5
        }}
      >
        <TextField
          id={`${id}_1`}
          value={filterValue[0] || ''}
          type='number'
          onChange={(e) => {
            const val = e.target.value;
            setFilter((old: any[] = []) => [val ? parseInt(val, 10) : undefined, old[1]]);
          }}
          placeholder={`Min (${min})`}
          style={{
            width: '70px',
            marginRight: '0.5rem'
          }}
        />
        to
        <TextField
          id={`${id}_2`}
          value={filterValue[1] || ''}
          type='number'
          onChange={(e) => {
            const val = e.target.value;
            setFilter((old: any[] = []) => [old[0], val ? parseInt(val, 10) : undefined]);
          }}
          placeholder={`Max (${max})`}
          style={{
            width: '70px',
            marginLeft: '0.5rem'
          }}
        />
      </div>
    </>
  );
}

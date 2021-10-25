import {FormControl, InputLabel, MenuItem, Select} from '@mui/material';
import React from 'react';
import useStyles from '.././index.style';

interface CustomSelectForFilterProps {
  id: string;
  labelId: string;
  selectedOptionId: number;
  defaultLabel: string;
  onChangeCallback: (e: any) => void;
  options?: Array<any>;
}

const CustomSelectForFilter = ({
  id,
  labelId,
  selectedOptionId,
  defaultLabel,
  onChangeCallback,
  options,
}: CustomSelectForFilterProps) => {
  const classes: any = useStyles();

  return (
    <FormControl fullWidth>
      <InputLabel sx={{marginTop: -1}} id={labelId}>
        {defaultLabel}
      </InputLabel>
      <Select
        id={id}
        labelId={labelId}
        value={selectedOptionId}
        variant='outlined'
        className={classes.selectStyle}
        onChange={onChangeCallback}>
        <MenuItem value=''>
          <em>None</em>
        </MenuItem>
        {options &&
          options.map((option: any) => {
            return (
              <MenuItem key={option.id} value={option.id}>
                {option.title}
              </MenuItem>
            );
          })}
      </Select>
    </FormControl>
  );
};

export default CustomSelectForFilter;

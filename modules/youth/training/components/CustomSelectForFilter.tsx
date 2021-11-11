import {FormControl, InputLabel, MenuItem, Select} from '@mui/material';
import React from 'react';
import useStyles from '.././index.style';
import {useIntl} from 'react-intl';

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
  const {messages} = useIntl();

  return (
    <>
      <FormControl variant='outlined' fullWidth={true} size={'small'}>
        <InputLabel sx={{background: '#fff', borderRadius: '3px'}} id={labelId}>
          {defaultLabel}
        </InputLabel>
        <Select
          id={id}
          labelId={labelId}
          label={defaultLabel}
          value={selectedOptionId}
          className={classes.selectStyle}
          onChange={onChangeCallback}>
          <MenuItem value=''>
            <em>{messages['common.select']}</em>
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
    </>
  );
};

export default CustomSelectForFilter;

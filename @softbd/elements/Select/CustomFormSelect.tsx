import TextInputSkeleton from '../Skeleton/TextInputSkeleton';
import React from 'react';
import {Controller} from 'react-hook-form';
import {FormControl, InputLabel, MenuItem, Select} from '@material-ui/core';
import {MessageFormatElement} from '@formatjs/icu-messageformat-parser';

type Props = {
  id: string;
  isLoading: boolean;
  label?: string | MessageFormatElement[];
  size?: any;
  control: any;
  options?: Array<any>;
  defaultValue?: number;
  optionValueProp?: any;
  optionTitleProp?: Array<string>;
  onChange?: (e: any) => any;
};

const CustomFormSelect = ({
  id,
  isLoading,
  control,
  label,
  size,
  options,
  defaultValue,
  optionValueProp,
  optionTitleProp,
  onChange: onChangeCallback,
}: Props) => {
  const getTitle = (
    option: any,
    optionTitleProp: Array<string> | undefined,
  ) => {
    let title = '';
    if (option && optionTitleProp) {
      let arr = [];
      for (let i = 0; i < optionTitleProp.length; i++) {
        arr.push(option[optionTitleProp[i]]);
      }
      title = arr.join('-');
    }

    return title;
  };

  return isLoading ? (
    <TextInputSkeleton />
  ) : (
    <FormControl
      variant='outlined'
      fullWidth={true}
      size={size ? size : 'small'}>
      <InputLabel id='select-outlined-label'>{label}</InputLabel>
      <Controller
        render={({field: {onChange, value = defaultValue}}) => (
          <Select
            labelId='select-outlined-label'
            aria-label={id}
            label={label}
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
              if (onChangeCallback && typeof onChangeCallback === 'function') {
                onChangeCallback(e);
              }
            }}>
            <MenuItem value=''>
              <em>None</em>
            </MenuItem>
            {(options || []).map((option: any, index: number) => {
              let value = option[optionValueProp] && option[optionValueProp];
              let title = getTitle(option, optionTitleProp);
              return (
                <MenuItem key={index} value={value}>
                  {title}
                </MenuItem>
              );
            })}
          </Select>
        )}
        name={id}
        control={control}
      />
    </FormControl>
  );
};

export default CustomFormSelect;

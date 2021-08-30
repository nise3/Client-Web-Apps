import TextInputSkeleton from '../../display/skeleton/TextInputSkeleton/TextInputSkeleton';
import React from 'react';
import {Controller} from 'react-hook-form';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import {MessageFormatElement} from '@formatjs/icu-messageformat-parser';

type Props = {
  id: string;
  isLoading: boolean;
  label?: string | MessageFormatElement[];
  size?: any;
  control: any;
  options?: Array<any>;
  errorInstance?: any;
  defaultValue?: number;
  optionValueProp?: any;
  optionTitleProp?: Array<string>;
  maxHeight?: number;
  onChange?: (e: any) => any;
};

const CustomFormSelect = ({
  id,
  isLoading,
  control,
  label,
  size,
  errorInstance,
  options,
  defaultValue,
  optionValueProp,
  optionTitleProp,
  maxHeight,
  onChange: onChangeCallback,
}: Props) => {
  maxHeight = maxHeight ? maxHeight : 400;

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
      error={errorInstance?.[id]}
      size={size ? size : 'small'}>
      <InputLabel id='select-outlined-label'>{label}</InputLabel>
      <Controller
        render={({field: {onChange, value = defaultValue}}) => (
          <>
            <Select
              MenuProps={{
                style: {
                  maxHeight: maxHeight,
                },
              }}
              labelId='select-outlined-label'
              aria-label={id}
              label={label}
              value={value}
              onChange={(e) => {
                onChange(e.target.value);
                if (
                  onChangeCallback &&
                  typeof onChangeCallback === 'function'
                ) {
                  onChangeCallback(e.target.value);
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
            {errorInstance?.[id] && (
              <FormHelperText>{errorInstance[id].message}</FormHelperText>
            )}
          </>
        )}
        name={id}
        control={control}
      />
    </FormControl>
  );
};

export default CustomFormSelect;

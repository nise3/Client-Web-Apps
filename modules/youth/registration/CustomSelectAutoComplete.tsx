import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import {MessageFormatElement} from '@formatjs/icu-messageformat-parser';
import {FormControl} from '@mui/material';
import {Controller} from 'react-hook-form';
const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;
type Props = {
  id: string;
  isLoading?: boolean;
  label?: string | MessageFormatElement[];
  size?: any;
  control: any;
  options?: Array<any>;
  optionTitleProp: string;
  onChange?: (e: any) => any;
  isDisabled?: boolean;
  defaultValue?: any;
  required?: boolean;
  errorInstance?: any;
  placeholder?: string;
};
export default function CustomSelectAutoComplete({
  id,
  control,
  isDisabled,
  options,
  optionTitleProp,
  label,
  defaultValue,
  required,
  errorInstance,
  onChange: onChangeCallback,
  placeholder,
}: Props) {
  return (
    <FormControl
      variant='outlined'
      fullWidth={true}
      disabled={isDisabled}
      size='small'>
      {/*<InputLabel id='select-outlined-label' required={required}>*/}
      {/*  {label}*/}
      {/*</InputLabel>*/}
      <Controller
        control={control}
        name={id}
        render={({field: {onChange, value = defaultValue}}) => (
          <Autocomplete
            multiple
            id='checkboxes-tags-demo'
            options={options || []}
            disableCloseOnSelect
            value={value}
            onChange={(event, option) => {
              onChange(option);
              if (onChangeCallback && typeof onChangeCallback === 'function') {
                onChangeCallback(option);
              }
            }}
            getOptionLabel={(option) => option[optionTitleProp]}
            renderOption={(props, option, {selected}) => (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{marginRight: 8}}
                  checked={selected}
                />
                {option[optionTitleProp]}
              </li>
            )}
            fullWidth
            renderInput={(params) => <TextField label={label} {...params} />}
          />
        )}
      />
    </FormControl>
  );
}

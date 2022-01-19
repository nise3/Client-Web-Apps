import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import {MessageFormatElement} from '@formatjs/icu-messageformat-parser';
import {FormControl} from '@mui/material';
import {Controller} from 'react-hook-form';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {getErrorObject} from '../../../@softbd/utilities/helpers';

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;
type Props = {
  id: string;
  isLoading?: boolean;
  label?: string | MessageFormatElement[];
  size?: any;
  control: any;
  options?: Array<any>;
  optionTitleProp: Array<string>;
  optionValueProp: any;
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
  optionValueProp,
  label,
  defaultValue,
  required = false,
  errorInstance,
  onChange: onChangeCallback,
  placeholder,
}: Props) {
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

  const errorObj = getErrorObject(id, errorInstance);

  return (
    <FormControl
      variant='outlined'
      fullWidth={true}
      disabled={isDisabled}
      size='small'>
      {/*<InputLabel id='select-outlined-label' required={required}>
        {label}
      </InputLabel>*/}
      <Controller
        control={control}
        name={id}
        render={({field: {onChange, value = defaultValue}}) => {
          return (
            <Autocomplete
              multiple
              id='checkboxes-tags-demo'
              size={'small'}
              options={options || []}
              disableCloseOnSelect
              value={value}
              onChange={(event, option) => {
                onChange(option);
                if (
                  onChangeCallback &&
                  typeof onChangeCallback === 'function'
                ) {
                  onChangeCallback(option);
                }
              }}
              isOptionEqualToValue={(option: any, value: any) => {
                return option.id === value.id;
              }}
              getOptionLabel={(item) => {
                if (typeof item !== 'object' && options)
                  item = options.find(
                    (it: any) => String(it[optionValueProp]) === String(item),
                  );

                return getTitle(item, optionTitleProp);
              }}
              // getOptionLabel={(option) => option[optionTitleProp]}
              renderOption={(props, option, {selected}) => (
                <li {...props}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{marginRight: 8}}
                    checked={selected}
                  />
                  {optionTitleProp?.length > 1
                    ? option[optionTitleProp[0]] +
                      '-' +
                      option[optionTitleProp[1]]
                    : option[optionTitleProp[0]]}
                </li>
              )}
              fullWidth
              renderInput={(params) => (
                <TextField
                  // label={label}
                  label={label + (required ? ' *' : '')}
                  {...params}
                  error={errorObj && Boolean(errorObj)}
                  helperText={
                    errorObj && errorObj.message ? (
                      errorObj.message.hasOwnProperty('key') ? (
                        <IntlMessages
                          id={errorObj.message.key}
                          values={errorObj.message?.values || {}}
                        />
                      ) : (
                        errorObj.message
                      )
                    ) : (
                      ''
                    )
                  }
                />
              )}
            />
          );
        }}
      />
    </FormControl>
  );
}

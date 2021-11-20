import React from 'react';
import {MessageFormatElement} from '@formatjs/icu-messageformat-parser';
import {Autocomplete, Box, TextField} from '@mui/material';
import {useIntl} from 'react-intl';
import TextInputSkeleton from '../../../../@softbd/elements/display/skeleton/TextInputSkeleton/TextInputSkeleton';

type Props = {
  id: string;
  isLoading: boolean;
  label?: string | MessageFormatElement[];
  size?: any;
  options?: Array<any>;
  defaultValue?: number | string | Array<string>;
  optionValueProp?: any;
  optionTitleProp?: Array<string>;
  onChange?: (e: any) => any;
  [x: string]: any;
};

const CustomFilterableSelect = ({
  id,
  isLoading,
  label,
  size,
  onChange: onChangeCallback,
  defaultValue,
  options,
  optionValueProp,
  optionTitleProp,
  ...rest
}: Props) => {
  const {messages} = useIntl();

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
    <Autocomplete
      value={defaultValue ? defaultValue : null}
      noOptionsText={messages['common.no_data_found']}
      autoSelect={false}
      selectOnFocus={false}
      options={options || []}
      onChange={(event, selected) => {
        const value = selected ? selected[optionValueProp] : null;

        if (onChangeCallback && typeof onChangeCallback === 'function') {
          onChangeCallback(value);
        }
      }}
      getOptionLabel={(item) => {
        if (typeof item !== 'object' && options)
          item = options.find(
            (it: any) => String(it[optionValueProp]) === String(item),
          );

        return getTitle(item, optionTitleProp);
      }}
      isOptionEqualToValue={(option: any, value: any) => {
        return String(option[optionValueProp]) === String(value);
      }}
      renderInput={(params) => (
        <TextField
          style={{borderRadius: '5px'}}
          {...params}
          name={id}
          label={
            <Box
              sx={{
                background: '#fff',
                padding: '0px 5px',
                borderRadius: '3px',
              }}>
              {label}
            </Box>
          }
          variant={'outlined'}
          size={size ? size : 'small'}
          sx={{background: '#fff'}}
        />
      )}
      sx={rest.sx ? rest.sx : {}}
    />
  );
};

export default CustomFilterableSelect;

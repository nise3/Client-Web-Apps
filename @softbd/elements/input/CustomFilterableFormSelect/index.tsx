import React from 'react';
import {MessageFormatElement} from '@formatjs/icu-messageformat-parser';
import TextInputSkeleton from '../../display/skeleton/TextInputSkeleton/TextInputSkeleton';
import {Autocomplete, FormControl, TextField} from '@mui/material';
import {Controller} from 'react-hook-form';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import {useIntl} from 'react-intl';

type Props = {
  id: string;
  isLoading: boolean;
  label?: string | MessageFormatElement[];
  size?: any;
  required?: boolean;
  control: any;
  options?: Array<any>;
  errorInstance?: any;
  defaultValue?: number | Array<string>;
  optionValueProp?: any;
  optionTitleProp?: Array<string>;
  onChange?: (e: any) => any;
  isDisabled?: boolean;
};

const CustomFilterableFormSelect = ({
  id,
  isLoading,
  label,
  size,
  required = false,
  isDisabled = false,
  control,
  errorInstance,
  onChange: onChangeCallback,
  defaultValue,
  options,
  optionValueProp,
  optionTitleProp,
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

  let errorObj = errorInstance?.[id];
  const reg = new RegExp('(.*)\\[(.*?)]', '');
  const matches = id.match(reg);
  if (matches) {
    errorObj = errorInstance?.[matches[1]]?.[matches[2]];
  }

  return isLoading ? (
    <TextInputSkeleton />
  ) : (
    <FormControl fullWidth={true}>
      <Controller
        render={({field: {onChange, value = defaultValue}}) => (
          <Autocomplete
            value={value ? value : ''}
            noOptionsText={messages['common.no_data_found']}
            autoSelect={false}
            selectOnFocus={false}
            options={options || []}
            disabled={isDisabled}
            onChange={(event, selected) => {
              const value = selected ? selected[optionValueProp] : '';

              onChange(value);
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
                {...params}
                label={label + (required ? ' *' : '')}
                variant={'outlined'}
                size={size ? size : 'small'}
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
        )}
        name={id}
        control={control}
      />
    </FormControl>
  );
};

export default CustomFilterableFormSelect;

import React from 'react';
import {MessageFormatElement} from '@formatjs/icu-messageformat-parser';
import {Autocomplete, FormControl, TextField} from '@mui/material';
import {Controller} from 'react-hook-form';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import {useIntl} from 'react-intl';
import TextInputSkeleton from '../../../../@softbd/elements/display/skeleton/TextInputSkeleton/TextInputSkeleton';

type Props = {
  id: string;
  isLoading: boolean;
  label?: string | MessageFormatElement[];
  size?: any;
  required?: boolean;
  control: any;
  options?: Array<any>;
  errors?: any;
  defaultValue?: number | Array<string>;
  optionValueProp?: any;
  optionTitleProp?: Array<string>;
  onChange?: (e: any) => any;
  isDisabled?: boolean;
  fieldIndex: number;
};

const CustomFilterableFormSelect = ({
  id,
  isLoading,
  label,
  size,
  required = false,
  isDisabled = false,
  control,
  errors,
  onChange: onChangeCallback,
  defaultValue,
  options,
  optionValueProp,
  optionTitleProp,
  fieldIndex,
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
        if (option[optionTitleProp[i]]) arr.push(option[optionTitleProp[i]]);
      }
      title = arr.join(' - ');
    }

    return title;
  };

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
                label={label}
                variant={'outlined'}
                size={size ? size : 'small'}
                error={
                  errors[id]?.[fieldIndex] && Boolean(errors[id]?.[fieldIndex])
                }
                helperText={
                  errors[id]?.[fieldIndex] &&
                  errors[id]?.[fieldIndex]?.associationId?.message ? (
                    errors[id]?.[
                      fieldIndex
                    ].associationId.message.hasOwnProperty('key') ? (
                      <IntlMessages
                        id={errors[id]?.[fieldIndex].associationId.message.key}
                        values={
                          errors[id]?.[fieldIndex].associationId.message
                            ?.values || {}
                        }
                      />
                    ) : (
                      errors[id]?.[fieldIndex].associationId.message
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

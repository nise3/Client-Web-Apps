import React from 'react';
import {MessageFormatElement} from '@formatjs/icu-messageformat-parser';
import {Autocomplete, Chip, FormControl, TextField} from '@mui/material';
import {Controller} from 'react-hook-form';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import {useIntl} from 'react-intl';
import TextInputSkeleton from '../../../../@softbd/elements/display/skeleton/TextInputSkeleton/TextInputSkeleton';

type Props = {
  id: string;
  isLoading?: boolean;
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

const CustomAddFilterableFormSelect = ({
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

  const getLabel = (label: any, required: boolean) => {
    return (
      <>
        {label}
        {required && <span style={{color: '#dd4744'}}> *</span>}
      </>
    );
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
            multiple
            noOptionsText={messages['common.no_data_found']}
            options={demo.map((option) => option.title)}
            freeSolo
            onChange={(event, selected) => {
              //const value = selected ? selected[optionValueProp] : '';
              onChange(selected);
              if (onChangeCallback && typeof onChangeCallback === 'function') {
                onChangeCallback(selected);
              }
            }}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <React.Fragment key={index}>
                  <Chip
                    variant='filled'
                    label={option}
                    {...getTagProps({index})}
                  />
                </React.Fragment>
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label={getLabel(label, required)}
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
const demo = [
  {title: 'The Shawshank Redemption', year: 1994},
  {title: 'The Godfather', year: 1972},
  {title: 'The Godfather: Part II', year: 1974},
  {title: 'The Dark Knight', year: 2008},
];
export default CustomAddFilterableFormSelect;

import TextInputSkeleton from '../../display/skeleton/TextInputSkeleton/TextInputSkeleton';
import React from 'react';
import {Controller} from 'react-hook-form';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import {MessageFormatElement} from '@formatjs/icu-messageformat-parser';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import {useIntl} from 'react-intl';

type Props = {
  id: string;
  isLoading: boolean;
  label?: string | MessageFormatElement[];
  size?: any;
  control: any;
  options?: Array<any>;
  errorInstance?: any;
  defaultValue?: number | Array<string>;
  optionValueProp?: any;
  optionTitleProp?: Array<string>;
  maxHeight?: number;
  onChange?: (e: any) => any;
  multiple?: boolean;
  inputProps?: any;
  isDisabled?: boolean;
  required?: boolean;
  isGroupData?: boolean;
  optionGroupTitleProp?: Array<string>;
  groupDataKey?: string;
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
  maxHeight = 400,
  multiple,
  onChange: onChangeCallback,
  inputProps,
  isDisabled = false,
  required = false,
  isGroupData = false,
  optionGroupTitleProp,
  groupDataKey,
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

      title = arr.join('-').split('').join('');
      title = title[0] == '-' ? title.slice(1) : title;
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
    <FormControl
      variant='outlined'
      fullWidth={true}
      disabled={isDisabled}
      error={!!errorObj}
      size={size ? size : 'small'}>
      <InputLabel id='select-outlined-label' required={required}>
        {label}
      </InputLabel>
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
              value={value ? value : ''}
              multiple={multiple}
              onChange={(e) => {
                onChange(e.target.value);
                if (
                  onChangeCallback &&
                  typeof onChangeCallback === 'function'
                ) {
                  onChangeCallback(e.target.value);
                }
              }}
              inputProps={inputProps}>
              {!multiple && (
                <MenuItem value=''>
                  <em>{messages['common.select']}</em>
                </MenuItem>
              )}

              {(options || []).map((option: any, index: number) => {
                if (!isGroupData) {
                  let value =
                    option[optionValueProp] && option[optionValueProp];
                  let title = getTitle(option, optionTitleProp);
                  return (
                    <MenuItem key={index} value={value}>
                      {title}
                    </MenuItem>
                  );
                } else {
                  /*let groupTitle = getTitle(option, optionTitleProp);

                  <ListSubheader sx={{fontWeight: 'bold', fontSize: '17px'}}>
                    {groupTitle}
                  </ListSubheader>*/

                  return (
                    (groupDataKey &&
                      optionGroupTitleProp &&
                      option[groupDataKey]) ||
                    []
                  ).map((item: any, idx: number) => {
                    let value = item[optionValueProp] && item[optionValueProp];
                    let title = getTitle(item, optionGroupTitleProp);
                    return (
                      <MenuItem
                        key={idx}
                        value={value}
                        sx={{textIndent: '20px'}}>
                        {title}
                      </MenuItem>
                    );
                  });
                }
              })}
            </Select>
            {errorObj && (
              <FormHelperText>
                {errorObj.message ? (
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
                )}
              </FormHelperText>
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

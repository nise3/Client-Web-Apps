import {Box, Chip, FormHelperText, TextField} from '@mui/material';
import React from 'react';
import TextInputSkeleton from '../../display/skeleton/TextInputSkeleton/TextInputSkeleton';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import {getErrorObject} from '../../../utilities/helpers';
import {styled} from '@mui/material/styles';
import {MessageFormatElement} from 'react-intl';

interface FieldValueInterface {
  id: string | number;
  label: string | MessageFormatElement[];
}

type Props = {
  fields: Array<FieldValueInterface>;
  chipLabel: string | MessageFormatElement[];
  className?: string;
  variant?: 'outlined' | 'standard' | 'filled';
  size?: 'small' | 'medium';
  isLoading?: boolean;
  register?: any;
  errorInstance?: any;
  disabled?: boolean;
  type?: string;
  defaultValue?: string;
  inputProps?: any;
  helperText?: any;
  [x: string]: any;
};

const PREFIX = 'CustomChipTextInput';

const classes = {
  lastTextField: `${PREFIX}-lastTextField`,
};

const StyledTextField = styled(TextField)(() => ({
  '& .MuiInputBase-root': {
    borderRadius: '0',
  },

  [`& .${classes.lastTextField}`]: {
    borderRadius: '0 4px 4px 0',
  },
}));

const CustomChipTextInput = ({
  fields,
  chipLabel,
  className,
  variant,
  size,
  isLoading,
  register,
  errorInstance,
  type,
  defaultValue,
  inputProps,
  disabled,
  helperText,
  ...rest
}: Props) => {
  return isLoading ? (
    <TextInputSkeleton />
  ) : (
    <Box component={'div'} sx={{display: 'inline'}}>
      <Chip
        label={chipLabel}
        sx={{
          borderRadius: '4px 0 0 4px',
          height: '40px',
          maxWidth: '120px',
          textOverflow: 'ellipsis',
        }}
        title={chipLabel as string}
      />

      {fields.map((field: any, index: number) => {
        let errorObj = getErrorObject(field.id, errorInstance);

        return (
          <React.Fragment key={field.id}>
            <StyledTextField
              variant={variant ? variant : 'outlined'}
              size={size ? size : 'small'}
              id={field.id}
              className={index > 0 ? classes.lastTextField : className}
              label={field.label}
              type={type}
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
              defaultValue={defaultValue}
              disabled={disabled ? disabled : false}
              inputProps={{...inputProps, ...{required: false}}}
              {...register(field.id)}
              {...rest}
              sx={{maxWidth: '140px'}}
            />
            {field.helperText && (
              <FormHelperText sx={{color: 'primary.main'}}>
                {field.helperText}
              </FormHelperText>
            )}
          </React.Fragment>
        );
      })}
    </Box>
  );
};

export default CustomChipTextInput;

import {Checkbox, FormControlLabel} from '@mui/material';
import TextInputSkeleton from '../../display/skeleton/TextInputSkeleton/TextInputSkeleton';
// import React, {JSXElementConstructor, ReactElement} from 'react';
import Typography from '@mui/material/Typography';
import {MessageFormatElement} from 'react-intl';

type Props = {
  id: string;
  label: string | number | MessageFormatElement[];
  // label: string | number | MessageFormatElement[] | ReactElement<any, string | JSXElementConstructor<any>>;
  isLoading?: boolean;
  register?: any;
  errorInstance?: any;
  checked: boolean | number;
  onChange: (event?: any) => void;
};

const CustomCheckbox = ({
  id,
  register,
  label,
  isLoading,
  errorInstance,
  checked,
  onChange,
}: Props) => {
  return isLoading ? (
    <TextInputSkeleton />
  ) : (
    <Typography color={errorInstance?.[id] ? 'error' : 'inherit'}>
      {/*<Checkbox
        color='primary'
        {...register(id)}
        checked={checked}
        onChange={onChange}
        style={{padding: '2px', marginRight: 5}}
      />
      {label}*/}
      <FormControlLabel
        sx={{
          marginLeft: '0',
        }}
        control={
          <Checkbox
            color='primary'
            {...register(id)}
            checked={checked}
            onChange={onChange}
            style={{padding: '2px', marginRight: 5}}
          />
        }
        label={label as string}
      />
    </Typography>
  );
};

export default CustomCheckbox;

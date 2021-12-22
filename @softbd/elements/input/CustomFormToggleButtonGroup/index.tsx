import React from 'react';
import {
  FormControl,
  FormLabel,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import {Controller} from 'react-hook-form';
import {styled} from '@mui/material/styles';
import {Check} from '@mui/icons-material';
import {MessageFormatElement} from '@formatjs/icu-messageformat-parser';
import TextInputSkeleton from '../../display/skeleton/TextInputSkeleton/TextInputSkeleton';

const PREFIX = 'ToggleButtonGroup';

const classes = {
  buttonIcon: `${PREFIX}-buttonIcon`,
};

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({theme}) => ({
  marginTop: '10px',
  '& .MuiToggleButtonGroup-grouped': {
    borderRadius: '4px !important',
    border: '1px solid #e9e9e9 !important',
  },
  '& .MuiToggleButtonGroup-grouped:not(:first-of-type)': {
    marginLeft: '15px !important',
  },
  '& .MuiToggleButtonGroup-grouped.Mui-selected': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,

    [`& .${classes.buttonIcon}`]: {
      display: 'block',
    },
  },
  '& .MuiToggleButtonGroup-grouped.Mui-selected:hover': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  '& .MuiToggleButtonGroup-grouped:hover': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`& .${classes.buttonIcon}`]: {
    display: 'none',
  },
}));

interface Props {
  id: string;
  label?: string | MessageFormatElement[];
  buttons: Array<any>;
  isLoading?: boolean;
  required?: boolean;
  multiSelect?: boolean;
  control: any;
  defaultValue?: any;
  onChange?: (e: any) => any;
}

const CustomFormToggleButtonGroup = ({
  id,
  label,
  buttons,
  isLoading,
  required = false,
  multiSelect = false,
  control,
  defaultValue = '',
  onChange: onChangeCallback,
}: Props) => {
  return isLoading ? (
    <TextInputSkeleton />
  ) : (
    <FormControl component='fieldset'>
      <FormLabel component='legend' required={required}>
        {label}
      </FormLabel>
      <Controller
        render={({field: {onChange, value = defaultValue}}) => (
          <StyledToggleButtonGroup
            value={value}
            exclusive={!multiSelect}
            onChange={(
              event: React.MouseEvent<HTMLElement>,
              newValues: any[],
            ) => {
              onChange(newValues);
              if (onChangeCallback && typeof onChangeCallback === 'function') {
                onChangeCallback(newValues);
              }
            }}>
            {buttons.map((button) => (
              <ToggleButton value={button.value} key={button.value}>
                <Check
                  className={classes.buttonIcon}
                  sx={{marginRight: '5px'}}
                />
                {button.label}
              </ToggleButton>
            ))}
          </StyledToggleButtonGroup>
        )}
        name={id}
        control={control}
        defaultValue={defaultValue}
      />
    </FormControl>
  );
};

export default CustomFormToggleButtonGroup;

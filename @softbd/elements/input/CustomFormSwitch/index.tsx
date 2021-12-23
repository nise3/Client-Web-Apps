import React, {ReactNode} from 'react';
import TextInputSkeleton from '../../display/skeleton/TextInputSkeleton/TextInputSkeleton';
import {FormControl, FormControlLabel, FormLabel, Switch} from '@mui/material';
import {MessageFormatElement} from '@formatjs/icu-messageformat-parser';
import {styled} from '@mui/material/styles';

const PREFIX = 'CustomFormSwitch';

const classes = {
  controlLabel: `${PREFIX}-controlLabel`,
  root: `${PREFIX}-root`,
  switchBase: `${PREFIX}-switchBase`,
  thumb: `${PREFIX}-thumb`,
  track: `${PREFIX}-track`,
  checked: `${PREFIX}-checked`,
};

const StyledFormControl = styled(FormControl)(({theme}) => ({
  display: 'inline-block',
  [`& .${classes.controlLabel}`]: {
    display: 'inline-block',
    margin: '0',
  },
  [`& .${classes.root}`]: {
    width: '70px',
    height: '24px',
    padding: '0px',
  },
  [`& .${classes.switchBase}`]: {
    color: '#818181',
    padding: '1px',
    '&$checked': {
      '& + $track': {
        backgroundColor: '#23bf58',
      },
    },
  },
  [`& .${classes.thumb}`]: {
    color: 'white',
    width: '20px',
    height: '20px',
    margin: '1px',
  },
  [`& .${classes.track}`]: {
    borderRadius: '20px',
    backgroundColor: '#818181',
    opacity: '1 !important',
    '&:after, &:before': {
      color: 'white',
      fontSize: '11px',
      position: 'absolute',
      top: '5px',
    },
    '&:after': {
      content: 'attr(data-off)',
      right: '5px',
      fontSize: '12px',
      fontWeight: '600',
      opacity: '1',
    },
    '&:before': {
      content: 'attr(data-on)',
      left: '5px',
      fontSize: '12px',
      fontWeight: '600',
      opacity: '0',
    },
  },
  [`& .${classes.checked}`]: {
    color: '#23bf58 !important',
    transform: 'translateX(46px) !important',
  },
  [`& .Mui-checked~.MuiSwitch-track:after`]: {
    opacity: '0',
  },
  [`& .Mui-checked~.MuiSwitch-track:before`]: {
    opacity: '1',
  },
}));

interface CustomFormSwitchProps {
  id: string;
  label?: string | MessageFormatElement[] | ReactNode;
  isLoading?: boolean;
  required?: boolean;
  register: any;
  defaultChecked?: boolean;
  onChange?: (e: any) => any;
  yesLabel?: string;
  noLabel?: string;
}

const CustomFormSwitch = ({
  id,
  label,
  isLoading,
  required,
  register,
  defaultChecked = false,
  yesLabel,
  noLabel,
  onChange: onChangeCallback,
}: CustomFormSwitchProps) => {
  const el = document.getElementById(id);
  if (el) {
    const parent: any = el.parentElement;
    if (parent) {
      const track = parent.nextSibling;
      if (track) {
        track.setAttribute('data-on', yesLabel ? yesLabel : '');
        track.setAttribute('data-off', noLabel ? noLabel : '');
      }
    }
  }

  return isLoading ? (
    <TextInputSkeleton />
  ) : (
    <StyledFormControl>
      {label && label != '' && (
        <FormLabel component='legend' required={required}>
          {label}
        </FormLabel>
      )}
      <FormControlLabel
        className={classes.controlLabel}
        control={
          <Switch
            id={id}
            classes={{
              root: classes.root,
              switchBase: classes.switchBase,
              thumb: classes.thumb,
              track: classes.track,
              checked: classes.checked,
            }}
            defaultChecked={defaultChecked}
            {...register(id)}
            onChange={(event) => {
              if (onChangeCallback && typeof onChangeCallback === 'function') {
                onChangeCallback(event.target.checked);
              }
            }}
          />
        }
        label={''}
      />
    </StyledFormControl>
  );
};

export default CustomFormSwitch;

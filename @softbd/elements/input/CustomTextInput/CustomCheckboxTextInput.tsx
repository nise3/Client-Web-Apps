import {Checkbox, FormLabel, Grid} from '@mui/material';
import CustomTextInput from './CustomTextInput';
import React from 'react';
import {MessageFormatElement} from 'react-intl';
import {styled} from '@mui/material/styles';

interface Props {
  id: string;
  data: Array<any>;
  label: string | MessageFormatElement[];
  onChange?: (e: any) => any;
  checkedDataArray: Array<any>;
  register: any;
  errors: any;
  isLoading: any;
  isTextFieldExist?: boolean;
}

const PREFIX = 'CustomCheckboxTextInput';

const classes = {
  inlineBlock: `${PREFIX}-inlineBlock`,
  block: `${PREFIX}-block`,
};
const StyledGrid = styled(Grid)(({theme}) => ({
  [`& .${classes.inlineBlock}`]: {
    display: 'inline-block',
  },
  [`& .${classes.block}`]: {
    display: 'block',
  },
}));

const CustomCheckboxTextInput = ({
  id,
  data,
  label,
  onChange: onChangeCallback,
  checkedDataArray,
  register,
  isLoading,
  errors,
  isTextFieldExist = true,
}: Props) => {
  {
    return (
      <>
        <Grid container>
          <Grid item xs={6}>
            <FormLabel>{label}</FormLabel>
          </Grid>
        </Grid>

        {data.map((data: any) => {
          return (
            <StyledGrid>
              <label className={isTextFieldExist ? classes.inlineBlock : ''}>
                <Checkbox
                  value={data.id}
                  onChange={() => {
                    if (
                      onChangeCallback &&
                      typeof onChangeCallback == 'function'
                    ) {
                      onChangeCallback(data.id);
                    }
                  }}
                />
                {data.title}
              </label>
              {isTextFieldExist && (
                <CustomTextInput
                  disabled={!checkedDataArray.includes(data.id)}
                  id={id + '[' + data.id + ']'}
                  label={'Identification Number' + data.id}
                  register={register}
                  errorInstance={errors}
                  isLoading={isLoading}
                  sx={{maxWidth: '200px', marginLeft: '50px'}}
                />
              )}
            </StyledGrid>
          );
        })}
      </>
    );
  }
};

export default CustomCheckboxTextInput;

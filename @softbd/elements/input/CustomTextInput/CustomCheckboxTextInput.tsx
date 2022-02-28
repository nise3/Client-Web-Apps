import {Checkbox, FormLabel, Grid} from '@mui/material';
import CustomTextInput from './CustomTextInput';
import React from 'react';
import {MessageFormatElement, useIntl} from 'react-intl';
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
  textFieldPlaceholder?: string | MessageFormatElement[];
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
  textFieldPlaceholder,
}: Props) => {
  const {messages} = useIntl();
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
            <StyledGrid key={data.id}>
              <Grid container>
                <Grid item xs={6}>
                  <label
                    className={isTextFieldExist ? classes.inlineBlock : ''}>
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
                </Grid>
                <Grid item xs={6}>
                  {data.id != 'other_authority' && isTextFieldExist && (
                    <CustomTextInput
                      disabled={!checkedDataArray.includes(data.id)}
                      id={id + '[' + data.id + ']'}
                      register={register}
                      errorInstance={errors}
                      isLoading={isLoading}
                      sx={{maxWidth: '20vw', marginLeft: '2vw'}}
                      placeholder={textFieldPlaceholder}
                    />
                  )}
                  {data.id == 'other_authority' && (
                    <Grid container>
                      <Grid item xs={6}>
                        <CustomTextInput
                          disabled={!checkedDataArray.includes(data.id)}
                          id={id + '[' + data.id + '][name]'}
                          register={register}
                          errorInstance={errors}
                          isLoading={isLoading}
                          sx={{maxWidth: '10vw', marginLeft: '2vw'}}
                          placeholder={messages['common.name']}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <CustomTextInput
                          disabled={!checkedDataArray.includes(data.id)}
                          id={id + '[' + data.id + '][number]'}
                          register={register}
                          errorInstance={errors}
                          isLoading={isLoading}
                          sx={{maxWidth: '10vw', marginLeft: '1vw'}}
                          placeholder={messages['common.number']}
                        />
                      </Grid>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </StyledGrid>
          );
        })}
      </>
    );
  }
};

export default CustomCheckboxTextInput;

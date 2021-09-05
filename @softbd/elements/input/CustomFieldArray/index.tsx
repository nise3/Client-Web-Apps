import React from 'react';
import TextInputSkeleton from '../../display/skeleton/TextInputSkeleton/TextInputSkeleton';
import {Button, ButtonGroup, Grid, TextField} from '@material-ui/core';
import {useFieldArray} from 'react-hook-form';
import {useIntl} from 'react-intl';
import IntlMessages from '../../../../@crema/utility/IntlMessages';

type Props = {
  id: string;
  variant?: 'outlined' | 'standard' | 'filled';
  size?: 'small' | 'medium';
  labelLanguageId?: string;
  isLoading?: boolean;
  register?: any;
  errors?: any;
  control?: any;
};

const CustomFieldArray = ({
  id,
  variant,
  size,
  labelLanguageId,
  isLoading,
  register,
  errors,
  control,
}: Props) => {
  const {messages} = useIntl();
  const {fields, append, remove} = useFieldArray({
    control,
    name: id,
  });
  return isLoading ? (
    <TextInputSkeleton />
  ) : (
    <>
      {fields.map((item: any, index: any) => {
        let itemId = `${id}.${index}.value`;
        return (
          <Grid item xs={12} style={{paddingBottom: 20}}>
            <TextField
              fullWidth
              variant={variant ? variant : 'outlined'}
              size={size ? size : 'small'}
              id={itemId}
              label={
                (labelLanguageId ? messages[labelLanguageId] : '') +
                ' #' +
                (index + 1)
              }
              error={errors[id]?.[index] && Boolean(errors[id]?.[index])}
              helperText={
                errors[id]?.[index] && errors[id]?.[index]?.value?.message
              }
              {...register(itemId)}
            />
          </Grid>
        );
      })}
      <div>
        <ButtonGroup color='primary' aria-label='outlined primary button group'>
          <Button
            onClick={() => {
              append({});
            }}>
            <IntlMessages
              id='common.add_new'
              values={{subject: <IntlMessages id={labelLanguageId} />}}
            />
          </Button>
          <Button
            onClick={() => {
              if (fields.length > 1) remove(fields.length - 1);
            }}
            disabled={fields.length < 2}>
            <IntlMessages id='common.remove_one' />
          </Button>
        </ButtonGroup>
      </div>
    </>
  );
};

export default CustomFieldArray;

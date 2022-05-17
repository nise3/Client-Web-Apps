import {Button, ButtonGroup, Grid} from '@mui/material';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import {AddCircleOutline, RemoveCircleOutline} from '@mui/icons-material';
import React, {Fragment, useEffect} from 'react';
import {useFieldArray} from 'react-hook-form';

type IProps = {
  id: string;
  isLoading?: boolean;
  register: any;
  errors: any;
  control: any;
  setValue: any;
  getValues: any;
};

const CustomFieldArrayResultConfigGrading = ({
  id,
  isLoading,
  register,
  errors,
  control,
  setValue,
  getValues,
}: IProps) => {
  const {fields, append, remove} = useFieldArray({
    control,
    name: id,
  });

  useEffect(() => {
    if (
      fields.length > 1 &&
      Number(getValues().gradings[fields.length - 2].max) <= 99
    ) {
      setValue(
        `${id}[${fields.length - 1}][min]`,
        Number(getValues().gradings[fields.length - 2].max) + 1,
      );
    }
  }, [fields, getValues]);

  return (
    <>
      {fields.map((item: any, index: any) => {
        let labelId = `${id}.${index}.label`;
        let maxId = `${id}.${index}.max`;
        let minId = `${id}.${index}.min`;

        return (
          <Fragment key={item.id}>
            <Grid container spacing={2} style={{paddingBottom: 20}}>
              <Grid item xs={3}>
                <CustomTextInput
                  id={labelId}
                  label={''}
                  register={register}
                  isLoading={isLoading}
                  errorInstance={errors}
                />
              </Grid>
              <Grid item xs={3}>
                <CustomTextInput
                  required
                  type={'number'}
                  id={minId}
                  label={''}
                  register={register}
                  isLoading={isLoading}
                  errorInstance={errors}
                  disabled={true}
                  InputProps={{inputProps: {min: 0, max: 99}}}
                />
              </Grid>
              <Grid item xs={3}>
                <CustomTextInput
                  required
                  type={'number'}
                  id={maxId}
                  label={''}
                  register={register}
                  isLoading={isLoading}
                  errorInstance={errors}
                  InputProps={{inputProps: {min: 0, max: 100}}}
                />
              </Grid>
            </Grid>
          </Fragment>
        );
      })}

      <Grid container justifyContent='flex-end'>
        <ButtonGroup color='primary' aria-label='outlined primary button group'>
          <Button
            onClick={() => {
              append({});
              if (fields.length <= 0) setValue(`${id}[0][min]`, '0');
            }}
            disabled={
              (getValues()?.gradings &&
                getValues()?.gradings[fields.length - 2]?.max &&
                Number(getValues()?.gradings[fields.length - 2]?.max) > 99) ||
              false
            }>
            <AddCircleOutline />
          </Button>
          <Button
            onClick={() => {
              if (fields.length > 0) remove(fields.length - 1);
            }}
            disabled={fields.length < 1}>
            <RemoveCircleOutline />
          </Button>
        </ButtonGroup>
      </Grid>
    </>
  );
};

export default CustomFieldArrayResultConfigGrading;

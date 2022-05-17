import React from 'react';
import {Button, ButtonGroup, Grid} from '@mui/material';
import {useFieldArray} from 'react-hook-form';
import {useIntl} from 'react-intl';
import {AddCircleOutline, RemoveCircleOutline} from '@mui/icons-material';
import TextInputSkeleton from '../../../@softbd/elements/display/skeleton/TextInputSkeleton/TextInputSkeleton';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';

type Props = {
  id: string;
  isLoading?: boolean;
  register: any;
  errors: any;
  control: any;
};

const MasterTrainerFieldArray = ({
  id,
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
      {fields?.map((item: any, index: any) => {
        let nameId = `${id}.${index}.name`;
        let designationId = `${id}.${index}.designation`;
        let organizationNameId = `${id}.${index}.organization_name`;
        let organizationNameEnId = `${id}.${index}.organization_name_en`;
        let mobileId = `${id}.${index}.mobile`;
        let emailId = `${id}.${index}.email`;

        return (
          <React.Fragment key={item.id}>
            <Grid container item spacing={4}>
              <Grid item xs={12} md={6}>
                <CustomTextInput
                  required
                  id={nameId}
                  label={messages['common.name']}
                  register={register}
                  errorInstance={errors}
                  isLoading={false}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomTextInput
                  required
                  id={designationId}
                  label={messages['common.designation']}
                  register={register}
                  errorInstance={errors}
                  isLoading={false}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomTextInput
                  required
                  id={organizationNameId}
                  label={messages['common.organization_name']}
                  register={register}
                  errorInstance={errors}
                  isLoading={false}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomTextInput
                  id={organizationNameEnId}
                  label={messages['common.organization_name_en']}
                  register={register}
                  errorInstance={errors}
                  isLoading={false}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <CustomTextInput
                  required
                  id={mobileId}
                  label={messages['common.mobile']}
                  register={register}
                  errorInstance={errors}
                  isLoading={false}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomTextInput
                  required
                  id={emailId}
                  label={messages['common.email']}
                  register={register}
                  errorInstance={errors}
                  isLoading={false}
                />
              </Grid>
            </Grid>
          </React.Fragment>
        );
      })}
      <Grid item xs={12} display={'flex'} justifyContent='flex-end'>
        <ButtonGroup color='primary' aria-label='outlined primary button group'>
          <Button
            onClick={() => {
              append({});
            }}>
            <AddCircleOutline />
          </Button>
          <Button
            onClick={() => {
              if (fields?.length > 1) remove(fields?.length - 1);
            }}
            disabled={fields?.length < 1}>
            <RemoveCircleOutline />
          </Button>
        </ButtonGroup>
      </Grid>
    </>
  );
};

export default MasterTrainerFieldArray;

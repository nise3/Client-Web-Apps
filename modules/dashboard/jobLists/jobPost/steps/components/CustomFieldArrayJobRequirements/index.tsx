import React from 'react';
import {Button, ButtonGroup, Grid} from '@mui/material';
import {useFieldArray} from 'react-hook-form';
import {useIntl} from 'react-intl';
import {AddCircleOutline, RemoveCircleOutline} from '@mui/icons-material';
import TextInputSkeleton from '../../../../../../../@softbd/elements/display/skeleton/TextInputSkeleton/TextInputSkeleton';
import CustomFilterableFormSelect from '../../../../../../../@softbd/elements/input/CustomFilterableFormSelect';
import CustomTextInput from '../../../../../../../@softbd/elements/input/CustomTextInput/CustomTextInput';

type Props = {
  id: string;
  isLoading?: boolean;
  educationLevelOptions: Array<any>;
  examDegreeOptions: Array<any>;
  register: any;
  errors: any;
  control: any;
};

const CustomEducationalQualificationFieldArray = ({
  id,
  educationLevelOptions = [],
  examDegreeOptions = [],
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
        let educationLevelId = `${id}.${index}.education_level`;
        let examDegreeId = `${id}.${index}.education_exam_degree`;
        let majorId = `${id}.${index}.major_group_name`;
        return (
          <React.Fragment key={item.id}>
            <Grid container item spacing={4}>
              <Grid item xs={12} md={4} style={{paddingBottom: 20}}>
                <CustomFilterableFormSelect
                  label={messages['education.education_level']}
                  id={educationLevelId}
                  control={control}
                  options={educationLevelOptions}
                  isLoading={false}
                  errorInstance={errors}
                />
              </Grid>
              <Grid item xs={12} md={4} style={{paddingBottom: 20}}>
                <CustomFilterableFormSelect
                  label={messages['education.education_exam_degree']}
                  id={examDegreeId}
                  control={control}
                  options={examDegreeOptions}
                  isLoading={false}
                  errorInstance={errors}
                />
              </Grid>

              <Grid item xs={12} md={4} style={{paddingBottom: 20}}>
                <CustomTextInput
                  id={majorId}
                  label={messages['education.major_group_name_bn']}
                  register={register}
                  errorInstance={errors}
                  isLoading={false}
                />
              </Grid>
            </Grid>
          </React.Fragment>
        );
      })}
      <Grid container justifyContent='flex-end'>
        <ButtonGroup color='primary' aria-label='outlined primary button group'>
          <Button
            onClick={() => {
              append({});
            }}>
            <AddCircleOutline />
          </Button>
          <Button
            onClick={() => {
              if (fields.length > 1) remove(fields.length - 1);
            }}
            disabled={fields.length < 2}>
            <RemoveCircleOutline />
          </Button>
        </ButtonGroup>
      </Grid>
    </>
  );
};

export default CustomEducationalQualificationFieldArray;

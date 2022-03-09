import React from 'react';
import {Button, ButtonGroup, Grid} from '@mui/material';
import {useFieldArray} from 'react-hook-form';
import {useIntl} from 'react-intl';
import {AddCircleOutline, RemoveCircleOutline} from '@mui/icons-material';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import TextInputSkeleton from '../../../@softbd/elements/display/skeleton/TextInputSkeleton/TextInputSkeleton';
import CustomFormSelect from '../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';

type Props = {
  id: string;
  isLoading?: boolean;
  register: any;
  errors: any;
  control: any;
};

const AcademicQualificationFieldArray = ({
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
      {fields.map((item: any, index: any) => {
        let examName = `${id}.${index}.exam_name`;
        let examGroup = `${id}.${index}.exam_group`;
        let examInstitute = `${id}.${index}.exam_institute`;
        let examPassingYear = `${id}.${index}.exam_passing_year`;
        let achievedGrade = `${id}.${index}.achieved_grade`;
        let division = `${id}.${index}.division`;

        return (
          <React.Fragment key={item.id}>
            <Grid container item spacing={4}>
              <Grid item xs={12} md={2} style={{paddingBottom: 20}}>
                <CustomTextInput
                  id={examName}
                  label={messages['academic_qualification.exam']}
                  register={register}
                  errorInstance={errors}
                  isLoading={false}
                />
              </Grid>

              <Grid item xs={12} md={2} style={{paddingBottom: 20}}>
                <CustomTextInput
                  id={examGroup}
                  label={messages['academic_qualification.group']}
                  register={register}
                  errorInstance={errors}
                  isLoading={isLoading}
                />
              </Grid>

              <Grid item xs={12} md={2} style={{paddingBottom: 20}}>
                <CustomTextInput
                  id={examInstitute}
                  label={messages['common.institute_name_en']}
                  register={register}
                  errorInstance={errors}
                  isLoading={isLoading}
                />
              </Grid>

              <Grid item xs={12} md={2} style={{paddingBottom: 20}}>
                <CustomTextInput
                  id={examPassingYear}
                  type={'number'}
                  label={messages['education.passing_year']}
                  register={register}
                  errorInstance={errors}
                  isLoading={isLoading}
                />
              </Grid>

              <Grid item xs={12} md={2} style={{paddingBottom: 20}}>
                <CustomTextInput
                  id={achievedGrade}
                  type={'number'}
                  label={messages['education.gpa']}
                  register={register}
                  errorInstance={errors}
                  isLoading={isLoading}
                />
              </Grid>

              <Grid item xs={12} md={2}>
                <CustomFormSelect
                  id={division}
                  label={messages['academic_qualification.division']}
                  isLoading={false}
                  control={control}
                  options={[
                    {id: 1, title: 'Dhaka'},
                    {id: 2, title: 'Rajshahi'},
                  ]}
                  optionValueProp={'id'}
                  optionTitleProp={['title']}
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

export default AcademicQualificationFieldArray;

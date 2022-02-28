import React, {useState} from 'react';
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
  defaultEduLevelIdTrack?: any;
  register: any;
  errors: any;
  control: any;
};

const CustomEducationalQualificationFieldArray = ({
  id,
  educationLevelOptions = [],
  examDegreeOptions = [],
  defaultEduLevelIdTrack = {},
  isLoading,
  register,
  errors,
  control,
}: Props) => {
  const {messages} = useIntl();

  const [eduLevelIdTrack, setEduLevelIdTrack] = useState<any>(
    defaultEduLevelIdTrack,
  );

  const {fields, append, remove} = useFieldArray({
    control,
    name: id,
  });

  const getExamDegrees = (index: number) => {
    const levelId = eduLevelIdTrack['level' + index];
    if (levelId) {
      return examDegreeOptions.filter(
        (exam: any) => exam.education_level_id == levelId,
      );
    } else {
      return [];
    }
  };

  return isLoading ? (
    <TextInputSkeleton />
  ) : (
    <>
      {fields.map((item: any, index: any) => {
        let educationLevelId = `${id}.${index}.education_level_id`;
        let examDegreeId = `${id}.${index}.exam_degree_id`;
        let majorId = `${id}.${index}.major_subject`;
        return (
          <React.Fragment key={item.id}>
            <Grid container item spacing={4}>
              <Grid item xs={12} md={4} style={{paddingBottom: 20}}>
                <CustomFilterableFormSelect
                  required={true}
                  label={messages['education.education_level']}
                  id={educationLevelId}
                  control={control}
                  optionValueProp={'id'}
                  optionTitleProp={['title']}
                  options={educationLevelOptions}
                  isLoading={false}
                  errorInstance={errors}
                  onChange={(levelId: number) => {
                    setEduLevelIdTrack((prev: any) => {
                      let newObj: any = {};
                      newObj['level' + index] = levelId;
                      return {...prev, ...newObj};
                    });
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4} style={{paddingBottom: 20}}>
                <CustomFilterableFormSelect
                  required={true}
                  label={messages['education.education_exam_degree']}
                  id={examDegreeId}
                  control={control}
                  optionValueProp={'id'}
                  optionTitleProp={['title']}
                  options={getExamDegrees(index)}
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

export default CustomEducationalQualificationFieldArray;

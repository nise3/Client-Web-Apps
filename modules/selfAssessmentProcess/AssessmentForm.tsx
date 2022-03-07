import React, {FC} from 'react';
import {Grid, TextField} from '@mui/material';
import {Body1} from '../../@softbd/elements/common';
import FormRadioButtons from '../../@softbd/elements/input/CustomRadioButtonGroup/FormRadioButtons';
import {useIntl} from 'react-intl';

/*const questions: any = [
  {
    id: 1,
    title: 'Whats your name?',
    type: 1,
    option_1: 'a',
    option_2: 'b',
    option_3: 'c',
    option_4: 'd',
    answer: 1,
  },
  {
    id: 2,
    title: 'Whats your Age?',
    type: 1,
    option_1: '20-30',
    option_2: '30-40',
    option_3: '40-50',
    option_4: '50-60',
    answer: 2,
  },
];*/

interface AssessmentFormProps {
  getValues: any;
  register: any;
  control: any;
  errors: any;
  assessments: any;
  isLoadingAssessments?: boolean;
}

const AssessmentForm: FC<AssessmentFormProps> = ({
  getValues,
  control,
  register,
  errors,
  assessments,
  isLoadingAssessments,
}) => {
  const {messages} = useIntl();
  return (
    <Grid container spacing={2}>
      {assessments &&
        assessments.map((assessment: any, index: number) => {
          if ((assessment.type = 1)) {
            return (
              <Grid item xs={12}>
                <Body1>
                  {index + 1} {'. '} {assessment?.question_title}
                </Body1>
                <FormRadioButtons
                  id={'answers[' + index + '][answer]'}
                  control={control}
                  radios={[
                    {label: assessment?.option_1, key: 1},
                    {label: assessment?.option_2, key: 2},
                    {label: assessment?.option_3, key: 3},
                    {label: assessment?.option_4, key: 4},
                  ]}
                  errorInstance={errors}
                />
                <TextField
                  id={'answers[' + index + '][question_id]'}
                  type={'hidden'}
                  {...register('answers[' + index + '][question_id]')}
                  defaultValue={assessment?.question_id}
                  sx={{display: 'none'}}
                />
              </Grid>
            );
          } else {
            return (
              <Grid item xs={12}>
                <Body1>
                  {index + 1} {'. '} {assessment?.question_title}
                </Body1>
                <FormRadioButtons
                  id={'answers[' + index + '][answer]'}
                  control={control}
                  radios={[
                    {label: messages['common.yes'], key: 1},
                    {label: messages['common.no'], key: 2},
                  ]}
                />
              </Grid>
            );
          }
        })}
    </Grid>
  );
};

export default AssessmentForm;

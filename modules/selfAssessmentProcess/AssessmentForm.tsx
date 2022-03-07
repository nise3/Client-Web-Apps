import React, {FC} from 'react';
import {Grid, TextField} from '@mui/material';
import {Body1} from '../../@softbd/elements/common';
import FormRadioButtons from '../../@softbd/elements/input/CustomRadioButtonGroup/FormRadioButtons';
import {useIntl} from 'react-intl';

const questions: any = [
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
];

interface AssessmentFormProps {
  getValues: any;
  register: any;
  control: any;
}

const AssessmentForm: FC<AssessmentFormProps> = ({
  getValues,
  control,

  register,
}) => {
  const {messages} = useIntl();
  return (
    <Grid container spacing={2}>
      {questions &&
        questions.map((question: any, index: number) => {
          if ((question.type = 1)) {
            return (
              <Grid item xs={12}>
                <Body1>
                  {index + 1} {'. '} {question.title}
                </Body1>
                <FormRadioButtons
                  id={'answers[' + index + '][answer]'}
                  control={control}
                  radios={[
                    {label: question.option_1, key: 1},
                    {label: question.option_2, key: 2},
                    {label: question.option_3, key: 3},
                    {label: question.option_4, key: 4},
                  ]}
                />
                <TextField
                  id={'answers[' + index + '][question_id]'}
                  type={'hidden'}
                  {...register('answers[' + index + '][question_id]')}
                  defaultValue={question?.id}
                  sx={{display: 'none'}}
                />
              </Grid>
            );
          } else {
            return (
              <Grid item xs={12}>
                <Body1>
                  {index + 1} {'. '} {question.title}
                </Body1>
                <FormRadioButtons
                  id={'answers[' + index + ']'}
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

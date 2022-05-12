import React, {FC} from 'react';
import {Container, Grid, TextField} from '@mui/material';
import {Body1} from '../../../@softbd/elements/common';
import FormRadioButtons from '../../../@softbd/elements/input/CustomRadioButtonGroup/FormRadioButtons';
import {useIntl} from 'react-intl';
import NoDataFoundComponent from '../../youth/common/NoDataFoundComponent';

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
  isLoadingAssessments = false,
}) => {
  const {messages} = useIntl();
  return (
    <Container maxWidth={'md'}>
      <Grid container spacing={2}>
        {isLoadingAssessments ? (
          <></> /**skeleton**/
        ) : assessments && assessments.length ? (
          assessments.map((assessment: any, index: number) => {
            return assessment?.type == 1 ? (
              <React.Fragment key={assessment?.question_id}>
                <Grid item xs={12}>
                  <Body1 fontWeight={'bold'}>
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
                    optionInline={false}
                  />
                  <TextField
                    id={'answers[' + index + '][question_id]'}
                    type={'hidden'}
                    {...register('answers[' + index + '][question_id]')}
                    defaultValue={assessment?.question_id}
                    sx={{display: 'none'}}
                  />
                  <TextField
                    id={'assessment_id'}
                    type={'hidden'}
                    {...register('assessment_id')}
                    defaultValue={assessment?.assessment_id}
                    sx={{display: 'none'}}
                  />
                </Grid>
              </React.Fragment>
            ) : (
              <Grid item xs={12}>
                <Body1 fontWeight={'bold'}>
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
                <TextField
                  id={'answers[' + index + '][question_id]'}
                  type={'hidden'}
                  {...register('answers[' + index + '][question_id]')}
                  defaultValue={assessment?.question_id}
                  sx={{display: 'none'}}
                />
                <TextField
                  id={'assessment_id'}
                  type={'hidden'}
                  {...register('assessment_id')}
                  defaultValue={assessment?.assessment_id}
                  sx={{display: 'none'}}
                />
              </Grid>
            );
          })
        ) : (
          <NoDataFoundComponent messageType={messages['assessment.label']} />
        )}
      </Grid>
    </Container>
  );
};

export default AssessmentForm;

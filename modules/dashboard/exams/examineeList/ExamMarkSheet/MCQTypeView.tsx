import React, {FC} from 'react';
import {Checkbox, FormControlLabel, Grid} from '@mui/material';
import {Body1, Body2} from '../../../../../@softbd/elements/common';
import NoDataFoundComponent from '../../../../youth/common/NoDataFoundComponent';
import {useIntl} from 'react-intl';
import {question_type} from '../../../../../@softbd/utilities/helpers';

interface McqTypeComponentProps {
  section: any;
}
const MCQTypeView: FC<McqTypeComponentProps> = ({section}) => {
  const {messages} = useIntl();
  const questions = section?.questions;
  console.log('questions', questions);
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} display={'flex'}>
        <Body1 sx={{fontWeight: 'bold'}}>
          {messages['common.type'] + ': '}
        </Body1>
        <Body2 sx={{marginTop: '3px'}}>
          {question_type[section?.question_type - 1].label}
        </Body2>
      </Grid>
      <Grid item xs={12} display={'flex'}>
        <Body1 sx={{fontWeight: 'bold'}}>
          {messages['common.total_marks'] + ': '}
        </Body1>
        <Body2 sx={{marginTop: '3px'}}>{section?.total_marks}</Body2>
      </Grid>
      {questions && questions.length ? (
        questions.map((question: any, index: number) => {
          return (
            <>
              <Grid item xs={10} display={'flex'}>
                <Body2 sx={{fontWeight: 'bold'}}>
                  {'Q' + (index + 1) + '. ' + ' '}
                </Body2>
                <Body2>{question?.title}</Body2>
                <Body2 sx={{fontWeight: 'bold'}}>
                  {'(' + question?.mark + ')'}
                </Body2>
              </Grid>
              <Grid item xs={2}>
                <Body2 sx={{fontWeight: 'bold', textAlign: 'center'}}>
                  {question?.obtained_mark ? (
                    <>{question?.obtained_mark}</>
                  ) : (
                    <>{messages['exam.none']}</>
                  )}
                </Body2>
              </Grid>
              <Grid item xs={10} sx={{marginLeft: '20px'}}>
                <FormControlLabel
                  disabled
                  control={<Checkbox checked={question?.answer.includes(1)} />}
                  label={question?.option_1}
                  componentsProps={
                    question?.correct_answer.includes(1)
                      ? {
                          typography: {
                            sx: {color: 'green !important'},
                          },
                        }
                      : {}
                  }
                />
                <FormControlLabel
                  disabled
                  control={<Checkbox checked={question?.answer.includes(2)} />}
                  label={question?.option_2}
                  componentsProps={
                    question?.correct_answer.includes(2)
                      ? {
                          typography: {
                            sx: {color: 'green !important'},
                          },
                        }
                      : {}
                  }
                />
                <FormControlLabel
                  disabled
                  control={<Checkbox checked={question?.answer.includes(3)} />}
                  label={question?.option_3}
                  componentsProps={
                    question?.correct_answer.includes(3)
                      ? {
                          typography: {
                            sx: {color: 'green !important'},
                          },
                        }
                      : {}
                  }
                />
                <FormControlLabel
                  disabled
                  control={<Checkbox checked={question?.answer.includes(4)} />}
                  label={question?.option_4}
                  componentsProps={
                    question?.correct_answer.includes(4)
                      ? {
                          typography: {
                            sx: {color: 'green !important'},
                          },
                        }
                      : {}
                  }
                />
              </Grid>
            </>
          );
        })
      ) : (
        <NoDataFoundComponent />
      )}
    </Grid>
  );
};

export default MCQTypeView;

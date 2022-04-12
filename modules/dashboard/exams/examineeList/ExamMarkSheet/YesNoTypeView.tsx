import React, {FC} from 'react';
import {FormControlLabel, Grid, Radio, RadioGroup} from '@mui/material';
import {useIntl} from 'react-intl';
import {Body1, Body2} from '../../../../../@softbd/elements/common';
import {question_type} from '../../../../../@softbd/utilities/helpers';
import NoDataFoundComponent from '../../../../youth/common/NoDataFoundComponent';
interface YesNoTypeViewProps {
  section: any;
}
enum YesNoAnswer {
  YES = 1,
  NO = 2,
}
const YesNoTypeView: FC<YesNoTypeViewProps> = ({section}) => {
  const {messages} = useIntl();
  const questions = section?.questions;
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
                <RadioGroup
                  aria-labelledby='demo-radio-buttons-group-label'
                  defaultValue={question?.answer}
                  name='radio-buttons-group'>
                  <FormControlLabel
                    value={YesNoAnswer.YES}
                    control={<Radio />}
                    label={messages['common.yes'] as string}
                    disabled={true}
                    componentsProps={
                      question?.correct_answer == 1
                        ? {
                            typography: {
                              sx: {color: 'green !important'},
                            },
                          }
                        : {}
                    }
                  />
                  <FormControlLabel
                    value={YesNoAnswer.NO}
                    control={<Radio />}
                    label={messages['common.no'] as string}
                    disabled={true}
                    componentsProps={
                      question?.correct_answer == 2
                        ? {
                            typography: {
                              sx: {color: 'green !important'},
                            },
                          }
                        : {}
                    }
                  />
                </RadioGroup>
              </Grid>
            </>
          );
        })
      ) : (
        <NoDataFoundComponent />
      )}
      {/**/}
    </Grid>
  );
};

export default YesNoTypeView;

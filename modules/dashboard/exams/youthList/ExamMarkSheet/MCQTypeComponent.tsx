import React, {FC} from 'react';
import {Checkbox, FormControlLabel, Grid} from '@mui/material';
import {Body2} from '../../../../../@softbd/elements/common';
import {useIntl} from 'react-intl';

interface McqTypeComponentProps {
  question: any;
  index: number;
}
const MCQTypeComponent: FC<McqTypeComponentProps> = ({question, index}) => {
  const {messages} = useIntl();
  return (
    <Grid container spacing={1}>
      <Grid item xs={10} display={'flex'}>
        <Body2 sx={{fontWeight: 'bold', whiteSpace: 'pre'}}>
          {index + '. ' + ' '}
        </Body2>
        <Body2>{question?.title}</Body2>
        <Body2 sx={{fontWeight: 'bold'}}>
          {'(' + question?.individual_marks + ')'}
        </Body2>
      </Grid>
      <Grid item xs={2}>
        <Body2 sx={{fontWeight: 'bold', textAlign: 'center'}}>
          {question?.achived_mark ? (
            <>{question?.achived_mark}</>
          ) : (
            <>{messages['exam.none']}</>
          )}
        </Body2>
      </Grid>
      <Grid item xs={10} display={'flex'} flexDirection={'column'}>
        <FormControlLabel
          disabled
          control={<Checkbox checked={question?.answers.includes('1')} />}
          label={question?.option_1}
          componentsProps={
            question?.answers.includes('1')
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
          control={<Checkbox checked={question?.answers.includes('2')} />}
          label={question?.option_2}
          componentsProps={
            question?.answers.includes('2')
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
          control={<Checkbox checked={question?.answers.includes('3')} />}
          label={question?.option_3}
          componentsProps={
            question?.answers.includes('3')
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
          control={<Checkbox checked={question?.answers.includes('4')} />}
          label={question?.option_4}
          componentsProps={
            question?.answers.includes('4')
              ? {
                  typography: {
                    sx: {color: 'green !important'},
                  },
                }
              : {}
          }
        />
      </Grid>
    </Grid>
  );
};

export default MCQTypeComponent;

import React, {FC} from 'react';
import {Checkbox, FormControlLabel, Grid} from '@mui/material';
import {Body2} from '../../../../../@softbd/elements/common';
import {useIntl} from 'react-intl';

interface McqTypeComponentProps {
  question: any;
  index: number;
}
const MCQTypeView: FC<McqTypeComponentProps> = ({question, index}) => {
  const {messages} = useIntl();
  return (
    <Grid container spacing={1}>
      <Grid item xs={10} display={'flex'}>
        <Body2 sx={{fontWeight: 'bold'}}>{index + '. ' + ' '}</Body2>
        <Body2>{question?.title}</Body2>
        <Body2 sx={{fontWeight: 'bold'}}>{'(' + question?.mark + ')'}</Body2>
      </Grid>
      <Grid item xs={2}>
        <Body2 sx={{fontWeight: 'bold', textAlign: 'center'}}>
          {question?.individual_marks ? (
            <>{question?.individual_marks}</>
          ) : (
            <>{messages['exam.none']}</>
          )}
        </Body2>
      </Grid>
      <Grid item xs={10} display={'flex'} flexDirection={'column'}>
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
    </Grid>
  );
};

export default MCQTypeView;

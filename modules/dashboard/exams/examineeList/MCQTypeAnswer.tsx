import React, {FC} from 'react';
import {Checkbox, FormControlLabel} from '@mui/material';

interface McqTypeComponentProps {
  question: any;
}
const MCQTypeAnswer: FC<McqTypeComponentProps> = ({question}) => {
  console.log('correct ans:', question?.correct_answer);
  return (
    <>
      {' '}
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
      />{' '}
    </>
  );
};

export default MCQTypeAnswer;

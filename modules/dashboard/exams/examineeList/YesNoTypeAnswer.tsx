import React, {FC} from 'react';
import {FormControlLabel, Radio, RadioGroup} from '@mui/material';
import {useIntl} from 'react-intl';
interface YesNoTypeAnswerProps {
  question: any;
}
enum YesNoAnswer {
  YES = 1,
  NO = 0,
}
const YesNoTypeAnswer: FC<YesNoTypeAnswerProps> = ({question}) => {
  const {messages} = useIntl();
  return (
    <>
      {' '}
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
            question?.answer == 1
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
        />
      </RadioGroup>
    </>
  );
};

export default YesNoTypeAnswer;

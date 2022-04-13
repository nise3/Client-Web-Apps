import React, {FC} from 'react';
import {FormControlLabel, Grid, Radio, RadioGroup} from '@mui/material';
import {useIntl} from 'react-intl';
import {Body2} from '../../../../../@softbd/elements/common';

interface YesNoTypeViewProps {
  question: any;
  index: number;
}
enum YesNoAnswer {
  YES = 1,
  NO = 2,
}
const YesNoTypeView: FC<YesNoTypeViewProps> = ({question, index}) => {
  const {messages} = useIntl();
  return (
    <Grid container spacing={1}>
      <>
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
    </Grid>
  );
};

export default YesNoTypeView;

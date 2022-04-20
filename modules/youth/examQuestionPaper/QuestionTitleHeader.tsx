import React, {FC} from 'react';
import {Grid} from '@mui/material';
import {Body2} from '../../../@softbd/elements/common';
interface QuestionTitleHeaderProps {
  index: number;
  question: any;
}
const QuestionTitleHeader: FC<QuestionTitleHeaderProps> = ({
  index,
  question,
}) => {
  return (
    <>
      <Grid container>
        <Grid item xs={10} display={'flex'}>
          <Body2
            sx={{
              fontWeight: 'bold',
              whiteSpace: 'pre',
            }}>
            {index + '. ' + ' '}
          </Body2>
          <Body2>{question?.title}</Body2>
        </Grid>
        <Grid item xs={2}>
          <Body2
            sx={{
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            {question?.individual_marks}
          </Body2>
        </Grid>
      </Grid>
    </>
  );
};

export default QuestionTitleHeader;

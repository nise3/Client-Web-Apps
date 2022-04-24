import React, {FC} from 'react';
import {Grid} from '@mui/material';
import {Body2} from '../../../@softbd/elements/common';
import {useIntl} from 'react-intl';
import {getIntlNumber} from '../../../@softbd/utilities/helpers';
interface QuestionTitleHeaderProps {
  index: number;
  question: any;
}
const QuestionTitleHeader: FC<QuestionTitleHeaderProps> = ({
  index,
  question,
}) => {
  const {formatNumber} = useIntl();
  return (
    <>
      <Grid item xs={11} display={'flex'}>
        <Body2
          sx={{
            fontWeight: 'bold',
            whiteSpace: 'pre',
          }}>
          {getIntlNumber(formatNumber, index) + '. ' + ' '}
        </Body2>
        <Body2>{question?.title}</Body2>
      </Grid>
      <Grid item xs={1}>
        <Body2
          sx={{
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          {getIntlNumber(formatNumber, question?.individual_marks)}
        </Body2>
      </Grid>
    </>
  );
};

export default QuestionTitleHeader;

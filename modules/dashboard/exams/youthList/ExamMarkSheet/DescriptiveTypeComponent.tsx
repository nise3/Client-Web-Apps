import React, {FC, ReactNode} from 'react';
import {useIntl} from 'react-intl';
import {Grid} from '@mui/material';
import {Body2} from '../../../../../@softbd/elements/common';
import DetailsInputView from '../../../../../@softbd/elements/display/DetailsInputView/DetailsInputView';

interface DescriptiveViewProps {
  question: any;
  inputField?: ReactNode;
  index: number;
}

const DescriptiveTypeComponent: FC<DescriptiveViewProps> = ({
  question,
  inputField,
  index,
}) => {
  const {messages} = useIntl();
  return (
    <Grid container spacing={1}>
      <Grid item xs={10} display={'flex'}>
        <Body2 sx={{fontWeight: 'bold', whiteSpace: 'pre'}}>
          {index + '. ' + ' '}
        </Body2>
        <Body2>{question?.title}</Body2>
        <Body2 sx={{fontWeight: 'bold'}}>{'(' + question?.mark + ')'}</Body2>
      </Grid>
      <Grid item xs={2}>
        <Body2 sx={{fontWeight: 'bold', textAlign: 'center'}}>
          {inputField ? (
            inputField
          ) : question?.obtained_mark ? (
            <>{question?.individual_marks}</>
          ) : (
            <>{messages['exam.none']}</>
          )}
          {/* {}*/}
        </Body2>
      </Grid>
      <Grid item xs={10} sx={{marginLeft: '20px'}}>
        <DetailsInputView
          label={messages['common.answer']}
          value={question?.answer}
          isLoading={false}
        />
      </Grid>
    </Grid>
  );
};

export default DescriptiveTypeComponent;

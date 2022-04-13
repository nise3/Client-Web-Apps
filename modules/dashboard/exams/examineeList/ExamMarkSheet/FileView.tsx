import React, {FC} from 'react';
import {Button, Grid} from '@mui/material';
import {Body2, Link} from '../../../../../@softbd/elements/common';
import {useIntl} from 'react-intl';

interface FileViewAnswerProps {
  question: any;
  index: number;
  inputField?: React.ReactNode;
}
const FileView: FC<FileViewAnswerProps> = ({question, index, inputField}) => {
  const {messages} = useIntl();
  return (
    <Grid container spacing={1}>
      <Grid item xs={10} display={'flex'}>
        <Body2 sx={{fontWeight: 'bold'}}>{index + '. '}</Body2>
        <Body2>{question?.title}</Body2>
        <Body2 sx={{fontWeight: 'bold'}}>{'(' + question?.mark + ')'}</Body2>
      </Grid>
      <Grid item xs={2}>
        <Body2 sx={{fontWeight: 'bold', textAlign: 'center'}}>
          {inputField ? (
            <>{inputField}</>
          ) : question?.individual_marks ? (
            <>{question?.individual_marks}</>
          ) : (
            <>{messages['exam.none']}</>
          )}
        </Body2>
      </Grid>
      <Grid item xs={10} sx={{marginLeft: '20px'}}>
        <Link target={'_blank'}>
          <Button variant={'outlined'}>{messages['common.show_file']}</Button>
        </Link>
      </Grid>
    </Grid>
  );
};

export default FileView;

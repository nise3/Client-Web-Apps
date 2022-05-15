import React, {FC} from 'react';
import {Button, Grid} from '@mui/material';

import {useIntl} from 'react-intl';
import {FILE_SERVER_FILE_VIEW_ENDPOINT} from '../../../../@softbd/common/apiRoutes';
import {getIntlNumber} from '../../../../@softbd/utilities/helpers';
import {Body2, Link} from '../../../../@softbd/elements/common';

interface FileViewAnswerProps {
  question: any;
  index: number;
  inputField?: React.ReactNode;
}

const FileView: FC<FileViewAnswerProps> = ({question, index, inputField}) => {
  const {messages, formatNumber} = useIntl();

  let path = question?.file_paths?.[0];
  if (path) {
    path = FILE_SERVER_FILE_VIEW_ENDPOINT + path;
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={10} display={'flex'}>
        <Body2 sx={{fontWeight: 'bold', whiteSpace: 'pre'}}>
          {getIntlNumber(formatNumber, index) + '. '}
        </Body2>
        <Body2>{question?.title}</Body2>
        <Body2 sx={{fontWeight: 'bold'}}>
          {'(' + getIntlNumber(formatNumber, question?.individual_marks) + ')'}
        </Body2>
      </Grid>
      <Grid item xs={2}>
        <Body2 sx={{fontWeight: 'bold', textAlign: 'center'}}>
          {inputField ? (
            <>{inputField}</>
          ) : question?.marks_achieved ? (
            <>{getIntlNumber(formatNumber, question?.marks_achieved)}</>
          ) : (
            <>{''}</>
          )}
        </Body2>
      </Grid>
      <Grid item xs={10} sx={{marginLeft: '20px'}}>
        {path ? (
          <Link target={'_blank'} href={path}>
            <Button variant={'outlined'}>{messages['common.show_file']}</Button>
          </Link>
        ) : (
          <Body2>{messages['exam.no_file_provided']}</Body2>
        )}
      </Grid>
    </Grid>
  );
};

export default FileView;

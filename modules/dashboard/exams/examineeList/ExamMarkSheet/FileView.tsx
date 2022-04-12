import React, {FC} from 'react';
import {Button, Grid} from '@mui/material';
import {Body1, Body2, Link} from '../../../../../@softbd/elements/common';
import {useIntl} from 'react-intl';
import {question_type} from '../../../../../@softbd/utilities/helpers';
import NoDataFoundComponent from '../../../../youth/common/NoDataFoundComponent';
interface FileViewAnswerProps {
  section: any;
}
const FileView: FC<FileViewAnswerProps> = ({section}) => {
  const {messages} = useIntl();
  const questions = section?.questions;
  console.log(questions);
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} display={'flex'}>
        <Body1 sx={{fontWeight: 'bold'}}>
          {messages['common.type'] + ': '}
        </Body1>
        <Body2 sx={{marginTop: '3px'}}>
          {question_type[section?.question_type - 1].label}
        </Body2>
      </Grid>
      <Grid item xs={12} display={'flex'}>
        <Body1 sx={{fontWeight: 'bold'}}>
          {messages['common.total_marks'] + ': '}
        </Body1>
        <Body2 sx={{marginTop: '3px'}}>{section?.total_marks}</Body2>
      </Grid>
      {questions && questions.length ? (
        questions.map((question: any, index: number) => {
          return (
            <>
              <Grid item xs={10} display={'flex'}>
                <Body2 sx={{fontWeight: 'bold'}}>
                  {'Q' + (index + 1) + '. ' + ' '}
                </Body2>
                <Body2>{question?.title}</Body2>
                <Body2 sx={{fontWeight: 'bold'}}>
                  {'(' + question?.mark + ')'}
                </Body2>
              </Grid>
              <Grid item xs={2}>
                <Body2 sx={{fontWeight: 'bold', textAlign: 'center'}}>
                  {question?.obtained_mark ? (
                    <>{question?.obtained_mark}</>
                  ) : (
                    <>{messages['exam.none']}</>
                  )}
                </Body2>
              </Grid>
              <Grid item xs={10} sx={{marginLeft: '20px'}}>
                <Link target={'_blank'}>
                  <Button variant={'outlined'}>
                    {messages['common.show_file']}
                  </Button>
                </Link>
              </Grid>
            </>
          );
        })
      ) : (
        <NoDataFoundComponent />
      )}

      {/* */}
    </Grid>
  );
};

export default FileView;

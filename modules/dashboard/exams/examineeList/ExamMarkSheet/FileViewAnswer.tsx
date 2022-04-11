import React, {FC} from 'react';
import {Button} from '@mui/material';
import {Link} from '../../../../../@softbd/elements/common';
import {useIntl} from 'react-intl';
interface FileViewAnswerProps {
  question: any;
}
const FileViewAnswer: FC<FileViewAnswerProps> = ({question}) => {
  const {messages} = useIntl();
  return (
    <>
      <Link href={question?.answer} target={'_blank'}>
        <Button variant={'outlined'}>{messages['common.show_file']}</Button>
      </Link>
    </>
  );
};

export default FileViewAnswer;

import React, {FC} from 'react';
import {TextField} from '@mui/material';
interface HiddenInputProps {
  index: number;
  question: any;
  register: any;
  section: any;
}
const HiddenInput: FC<HiddenInputProps> = ({
  index,
  question,
  register,
  section,
}) => {
  return (
    <>
      {section?.question_selection_type != 2 && (
        <TextField
          id={'questions[' + index + '].exam_section_question_id '}
          type={'hidden'}
          {...register('questions[' + index + '].exam_section_question_id')}
          defaultValue={question?.exam_section_question_id}
          sx={{display: 'none'}}
        />
      )}
      <TextField
        id={'questions[' + index + '].question_id'}
        type={'hidden'}
        {...register('questions[' + index + '].question_id')}
        defaultValue={question?.question_id}
        sx={{display: 'none'}}
      />
    </>
  );
};

export default HiddenInput;

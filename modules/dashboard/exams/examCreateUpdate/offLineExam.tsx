// const initialValues = {
//   start_time: '',
//   end_time: '',
//   venue: '',
//   Total_marks: '',
// };

import {useIntl} from 'react-intl';
import Grid from '@mui/material/Grid';
import CustomDateTimeField from '../../../../@softbd/elements/input/CustomDateTimeField';
import CustomTextInput from '../../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import CustomTimePicker from '../../../../@softbd/elements/input/TimePicker';
import Box from '@mui/material/Box';
import React, {useCallback, useRef, useState} from 'react';
import Button from '@mui/material/Button';
import {TextField} from '@mui/material';

interface IProps {
  useFrom: any;
}

const OffLineExam = ({useFrom}: IProps) => {
  const {messages} = useIntl();

  const examSetField = useRef<any>();

  const [examSets, setExamSets] = useState<any>(null); //todo: works was till here.multiple set have to implement

  const onInput = useCallback(() => {
    setExamSets(examSetField.current.value);
  }, []);

  return (
    <Box sx={{marginTop: '10px'}}>
      <fieldset>
        <legend style={{color: '#0a8fdc'}}>
          {messages['common.off_online']}
        </legend>
        <Grid container spacing={5}>
          <Grid item xs={6}>
            <CustomDateTimeField
              id='exam_date'
              label={messages['common.exam_date']}
              register={useFrom.register}
              errorInstance={useFrom.errors}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextInput
              id={'venue'}
              label={messages['common.venue']}
              register={useFrom.register}
              errorInstance={useFrom.errors}
              isLoading={false}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomTimePicker
              id='start_time'
              label={messages['common.start_time']}
              register={useFrom.register}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomTimePicker
              id='end_time'
              label={messages['common.end_time']}
              register={useFrom.register}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextInput
              id={'total_marks'}
              label={messages['common.venue']}
              register={useFrom.register}
              errorInstance={useFrom.errors}
              isLoading={false}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              inputRef={examSetField}
              type='number'
              variant='outlined'
              name='searchBox'
              placeholder={messages['common.search'] as string}
              fullWidth
              defaultValue={1}
              onKeyDown={(event) => {
                if (event.code == 'Enter') onInput();
              }}
            />
            <Button onClick={() => onInput()}>OK</Button>
          </Grid>
          <>
            <Grid item xs={6}>
              <CustomTextInput
                id={'title'}
                label={messages['common.title']}
                register={useFrom.register}
                errorInstance={useFrom.errors}
                isLoading={false}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomTextInput
                id={'title_en'}
                label={messages['common.title_en']}
                register={useFrom.register}
                errorInstance={useFrom.errors}
                isLoading={false}
              />
            </Grid>
          </>
        </Grid>
      </fieldset>
    </Box>
  );
};

export default OffLineExam;

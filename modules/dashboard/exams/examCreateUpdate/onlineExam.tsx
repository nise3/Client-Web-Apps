import Grid from '@mui/material/Grid';
import React from 'react';
import {useIntl} from 'react-intl';
import CustomDateTimeField from '../../../../@softbd/elements/input/CustomDateTimeField';
import Box from '@mui/material/Box';
import CustomTextInput from '../../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import CustomTimePicker from '../../../../@softbd/elements/input/TimePicker';

// const initialValues = {
//   start_time: '',
//   end_time: '',
//   venue: '',
//   Total_marks: '',
// };

interface IProps {
  useFrom: any;
}

const OnlineExam = ({useFrom}: IProps) => {
  const {messages} = useIntl();
  return (
    <Box sx={{marginTop: '10px'}}>
      <fieldset>
        <legend style={{color: '#0a8fdc'}}>{messages['common.online']}</legend>
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
        </Grid>
      </fieldset>
    </Box>
  );
};

export default OnlineExam;

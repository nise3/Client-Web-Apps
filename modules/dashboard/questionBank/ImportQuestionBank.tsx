import IconProgramme from '../../../@softbd/icons/IconProgramme';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import {Grid} from '@mui/material';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import React from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';

interface IProps {
  onClose: () => void;
}

const ImportQuestionBank = ({...props}: IProps) => {
  const {
    handleSubmit,
    formState: {isSubmitting},
  } = useForm<any>();

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    console.log('data->', data);
    props.onClose();
  };

  return (
    <>
      <HookFormMuiModal
        open={true}
        {...props}
        title={
          <>
            <IconProgramme />

            <IntlMessages
              id='common.import'
              values={{subject: <IntlMessages id='common.question_bank' />}}
            />
          </>
        }
        maxWidth={'md'}
        handleSubmit={handleSubmit(onSubmit)}
        actions={
          <>
            <CancelButton onClick={props.onClose} isLoading={false} />
            <SubmitButton isSubmitting={isSubmitting} isLoading={false} />
          </>
        }>
        <Grid container spacing={5}>
          <Grid item xs={6}>
            Import Question
          </Grid>
        </Grid>
      </HookFormMuiModal>
    </>
  );
};

export default ImportQuestionBank;

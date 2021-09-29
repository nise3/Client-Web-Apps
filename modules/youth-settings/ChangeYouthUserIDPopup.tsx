import React, {FC} from 'react';
import { Grid} from '@material-ui/core';

import IntlMessages from '../../@crema/utility/IntlMessages';
import CancelButton from '../../@softbd/elements/button/CancelButton/CancelButton';
import SubmitButton from '../../@softbd/elements/button/SubmitButton/SubmitButton';
import CustomTextInput from '../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import HookFormMuiModal from '../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import {useIntl} from 'react-intl';
import {SubmitHandler, useForm} from 'react-hook-form';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';


interface ChangeYouthUserIdPopupProps {
  onClose: () => void;
}
const ChangeYouthUserIDPopup: FC<ChangeYouthUserIdPopupProps> = ({
                                                         ...props
                                                       }) => {

  const {messages} = useIntl();

  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<any>();

  const isLoading = false;

  const onSubmit: SubmitHandler<any> = async (data: []) => {

  };
  return (
    <>
      <HookFormMuiModal
        {...props}
        open={true}
        title={
          <>
            <PeopleAltIcon  />
              <IntlMessages
                id='common.change_userId'
                values={{subject: <IntlMessages id='common.change_userId' />}}
              />
          </>
        }
        maxWidth={'sm'}
        handleSubmit={handleSubmit(onSubmit)}
        actions={
          <>
            <CancelButton onClick={props.onClose} isLoading={isLoading} />
            <SubmitButton isSubmitting={isSubmitting} isLoading={isLoading} />
          </>
        }>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <CustomTextInput
              id='old_email'
              label={messages['common.old_email']}
              register={register}
              errorInstance={errors}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomTextInput
              id='new_email'
              label={messages['common.new_email']}
              register={register}
              errorInstance={errors}
              isLoading={isLoading}
            />
          </Grid>


        </Grid>
      </HookFormMuiModal>

    </>
  );
};

export default ChangeYouthUserIDPopup;

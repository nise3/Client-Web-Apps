import React, {FC} from 'react';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import CancelButton from '../../../../@softbd/elements/button/CancelButton/CancelButton';
// import SubmitButton from '../../../../@softbd/elements/button/SubmitButton/SubmitButton';
import {Grid} from '@mui/material';
import HookFormMuiModal from '../../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import {SubmitHandler, useForm} from 'react-hook-form';

// import {yupResolver} from '@hookform/resolvers/yup/dist/yup';

interface AssociationProfileEditPopupProps {
  onClose: () => void;
}

const AssociationProfileEditPopup: FC<AssociationProfileEditPopupProps> = ({
  ...props
}) => {
  const onSubmit: SubmitHandler<any> = async (data) => {
    console.log('submit');
  };

  const {
    // register,
    // control,
    // reset,
    // setValue,
    // setError,
    // clearErrors,
    handleSubmit,
    // formState: {errors, isSubmitting},
  } = useForm<any>({
    // resolver: yupResolver(validationSchema),
  });

  return (
    <HookFormMuiModal
      open={true}
      {...props}
      title={
        <>
          <IntlMessages
            id='common.edit'
            values={{
              subject: <IntlMessages id='recent_activities.label' />,
            }}
          />
        </>
      }
      handleSubmit={handleSubmit(onSubmit)}
      actions={
        <>
          <CancelButton onClick={props.onClose} isLoading={false} />
          {/*<SubmitButton isSubmitting={handleSubmit} isLoading={false} />*/}
        </>
      }>
      <Grid container spacing={5}>
        <div>sdsds</div>
      </Grid>
    </HookFormMuiModal>
  );
};

export default AssociationProfileEditPopup;

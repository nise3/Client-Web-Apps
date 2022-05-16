import React, {FC, useMemo} from 'react';
import {useIntl} from 'react-intl';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import Grid from '@mui/material/Grid';
import yup from '../../../@softbd/libs/yup';
import IconBatch from '../../../@softbd/icons/IconBatch';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import {useFetchExamDetails} from '../../../services/instituteManagement/hooks';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import {IBatch} from '../../../shared/Interface/institute.interface';
import {CommonAuthUser} from '../../../redux/types/models/CommonAuthUser';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import {Link} from '../../../@softbd/elements/common';
import CommonButton from '../../../@softbd/elements/button/CommonButton/CommonButton';
import {FiUserCheck} from 'react-icons/fi';
import {useRouter} from 'next/router';

interface ExamListPopupProps {
  itemId: number | null;
  onClose: () => void;
  youthId: number | null;
}

const ExamListPopup: FC<ExamListPopupProps> = ({itemId, youthId, ...props}) => {
  const {messages} = useIntl();
  const router = useRouter();
  const path = router.asPath;
  const {errorStack} = useNotiStack();
  const authUser = useAuthUser<CommonAuthUser>();

  const {
    data: itemData,
    isLoading,
    //mutate: mutateBatch,
  } = useFetchExamDetails(1);

  console.log('dd', itemData);

  const validationSchema = useMemo(() => {
    return yup.object().shape({});
  }, [messages, authUser]);

  const {
    register,
    setError,
    handleSubmit,
    formState: {isSubmitting},
  } = useForm<IBatch>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<IBatch> = async (data: IBatch) => {
    try {
    } catch (error: any) {
      processServerSideErrors({error, setError, validationSchema, errorStack});
    }
  };

  return (
    <HookFormMuiModal
      {...props}
      open={true}
      title={
        <>
          <IconBatch />
          <IntlMessages
            id='common.add_new'
            values={{subject: <IntlMessages id='batches.marking' />}}
          />
        </>
      }
      handleSubmit={handleSubmit(onSubmit)}
      maxWidth={isBreakPointUp('xl') ? 'lg' : 'md'}
      actions={
        <>
          <CancelButton onClick={props.onClose} isLoading={isLoading} />
          <SubmitButton isSubmitting={isSubmitting} isLoading={isLoading} />
        </>
      }>
      <Grid container spacing={5}>
        <Grid item xs={6}>
          <CustomTextInput
            required
            id='title'
            label={messages['common.offline']}
            register={register}
            type={'number'}
            inputProps={{
              step: 1,
            }}
            //errorInstance={errors}
            disabled={false}
            isLoading={isLoading}
          />
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={5}>
            <Grid item xs={6}>
              <CustomTextInput
                required
                id='title'
                label={messages['common.online']}
                register={register}
                type={'number'}
                inputProps={{
                  step: 1,
                }}
                //errorInstance={errors}
                disabled={true}
                isLoading={isLoading}
              />
            </Grid>

            <Grid item xs={6}>
              {console.log(`pathid is: ${path}/${youthId}/marksheet/${1}`)}

              <Link href={`${path}/${youthId}/marksheet/${1}`} passHref={true}>
                <CommonButton
                  btnText={messages['batches.marksheet'] as string}
                  startIcon={<FiUserCheck style={{marginLeft: '5px'}} />}
                  style={{marginLeft: '10px'}}
                  variant='outlined'
                  color='primary'
                />
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </HookFormMuiModal>
  );
};

export default ExamListPopup;

import React, {useMemo, useState} from 'react';
import Box from '@mui/material/Box';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import {Fab, Grid} from '@mui/material';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import {RiEditBoxFill} from 'react-icons/ri';
import FormRadioButtons from '../../../@softbd/elements/input/CustomRadioButtonGroup/FormRadioButtons';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import {Body1, S2} from '../../../@softbd/elements/common';
import {styled} from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import {SubmitHandler, useForm} from 'react-hook-form';
import {useIntl} from 'react-intl';
import {useFetchJobCandidates} from '../../../services/IndustryManagement/hooks';
import {yupResolver} from '@hookform/resolvers/yup';
import yup from '../../../@softbd/libs/yup';
import {createRecruitmentStep} from '../../../services/IndustryAssociationManagement/IndustryAssociationService';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';

const PREFIX = 'RecruitmentStepsViewSection';

const classes = {
  fab: `${PREFIX}-fab`,
  applicants: `${PREFIX}-applicants`,
  button: `${PREFIX}-button`,
  buttonChild: `${PREFIX}-buttonChild`,
  edit: `${PREFIX}-edit`,
  modal: `${PREFIX}-modal`,
};

const StyledBox = styled(Box)(({theme}) => ({
  [`& .${classes.button}`]: {
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  },
  [`& .${classes.buttonChild}`]: {
    display: 'flex',
    backgroundColor: '#4806487d',
    borderRadius: 5,
    padding: 8,
    fontSize: '1rem',
  },
  [`& .${classes.fab}`]: {
    backgroundColor: '#fff',
    marginTop: '10px',
  },
  [`& .${classes.applicants}`]: {
    backgroundColor: 'purple',
    padding: '10px',
    borderBottom: '1px solid #301f30',
    borderRadius: '5px 5px 0 0 ',
  },
  [`& .${classes.edit}`]: {
    cursor: 'pointer',
  },
  [`& .${classes.modal}`]: {
    color: 'red',
  },
}));

interface RecruitmentStepsViewSectionProps {
  jobId: string;
  onClickStep: (filters: any) => void;
}

const RecruitmentStepsViewSection = ({
  jobId,
  onClickStep,
}: RecruitmentStepsViewSectionProps) => {
  const {createSuccessMessage, updateSuccessMessage} = useSuccessMessage();
  const {messages} = useIntl();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [stepList, setStepList] = useState<any>([]);

  const {data: candidates} = useFetchJobCandidates(jobId);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      title: yup
        .string()
        .title()
        .required()
        .label(messages['common.title'] as string),
      step_type: yup
        .string()
        .required()
        .label(messages['step.type'] as string),
      is_interview_reschedule_allowed: yup
        .string()
        .required()
        .label(messages['common.applicants_cat_reschedule'] as string),
    });
  }, [messages]);

  const {
    control,
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
  });

  const handleModalOpenClose = () => {
    setOpenModal((prev: boolean) => !prev);
  };

  let isEdit = false;
  let isLoading = false;

  const shortLists = useMemo(
    () => [
      {
        key: '1',
        label: messages['common.only_short_list'],
      },
      {
        key: '2',
        label: messages['common.short_list_written'],
      },
      {
        key: '3',
        label: messages['common.short_list_face_to_face'],
      },
      {
        key: '4',
        label: messages['common.short_list_live_interview'],
      },
      {
        key: '5',
        label: messages['common.short_list_other'],
      },
    ],
    [messages],
  );

  const applicantCanReschedule = useMemo(
    () => [
      {
        key: '1',
        label: messages['common.yes'],
      },
      {
        key: '2',
        label: messages['common.no'],
      },
    ],
    [messages],
  );

  const onSubmit: SubmitHandler<any> = async (formData: any) => {
    try {
      formData.job_id = jobId;

      let arr: any = [];
      arr = [...stepList, formData];
      setStepList(arr);

      await createRecruitmentStep(formData);
      createSuccessMessage('common.recruitment_step');

      handleModalOpenClose();
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <StyledBox>
      <Grid container sx={{color: '#fff'}}>
        <Grid
          item
          xs={12}
          sx={{
            backgroundColor: 'purple',
            padding: '10px',
            borderRadius: '0 5px 5px 5px ',
          }}>
          <Grid container spacing={3} sx={{marginTop: 0, marginBottom: '10px'}}>
            <Grid item xs={2} sx={{textAlign: 'center'}}>
              <Body1>All Applicants</Body1>
              <Fab className={classes.fab}>{candidates?.length}</Fab>
            </Grid>
            {stepList.map((step: any, index: any) => (
              <Grid key={index} item xs={2} sx={{textAlign: 'center'}}>
                <Body1>
                  1st Step{' '}
                  <RiEditBoxFill
                    onClick={handleModalOpenClose}
                    className={classes.edit}
                  />
                </Body1>
                <Fab className={classes.fab}>{candidates?.length}</Fab>
              </Grid>
            ))}

            <Grid item xs={3} className={classes.button}>
              <S2
                className={classes.buttonChild}
                onClick={handleModalOpenClose}>
                <AddIcon /> Add Requirement Step
              </S2>
            </Grid>
            <Grid item xs={2} sx={{textAlign: 'center'}}>
              <Body1>Final Hiring List</Body1>
              <Fab className={classes.fab}>{candidates?.length}</Fab>
            </Grid>
          </Grid>
        </Grid>
        {openModal && (
          <Grid item>
            <HookFormMuiModal
              open={true}
              title={
                <>
                  {isEdit ? (
                    <IntlMessages
                      id='common.edit'
                      values={{
                        subject: <IntlMessages id='common.recruitment_step' />,
                      }}
                    />
                  ) : (
                    <IntlMessages
                      id='common.add_new'
                      values={{
                        subject: <IntlMessages id='common.recruitment_step' />,
                      }}
                    />
                  )}
                </>
              }
              handleSubmit={handleSubmit(onSubmit)}
              actions={
                <>
                  <CancelButton
                    onClick={handleModalOpenClose}
                    isLoading={false}
                  />
                  <SubmitButton
                    isSubmitting={isSubmitting}
                    isLoading={isLoading}
                  />
                </>
              }
              onClose={handleModalOpenClose}>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <FormRadioButtons
                    label={'step.type'}
                    required
                    id='step_type'
                    radios={shortLists}
                    control={control}
                    isLoading={isLoading}
                    styles={{
                      border: '1px solid gray',
                      padding: '10px',
                      margin: '5px',
                      borderRadius: '5px',
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <CustomTextInput
                    required
                    id='title'
                    label={messages['common.step_name']}
                    register={register}
                    errorInstance={errors}
                    isLoading={isLoading}
                    placeholder='Type a test name'
                  />
                </Grid>
                <Grid item xs={6}>
                  <CustomTextInput
                    id='title_en'
                    label={messages['common.step_name_en']}
                    register={register}
                    errorInstance={errors}
                    isLoading={isLoading}
                    placeholder='Type a test name'
                  />
                </Grid>
                <Grid item xs={6}>
                  <CustomTextInput
                    id='interview_contact'
                    label={messages['common.phone']}
                    register={register}
                    errorInstance={errors}
                    isLoading={isLoading}
                    placeholder='Write a Contact Number'
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormRadioButtons
                    id='is_interview_reschedule_allowed'
                    label={'common.applicants_cat_reschedule'}
                    required={true}
                    radios={applicantCanReschedule}
                    control={control}
                    isLoading={isLoading}
                  />
                </Grid>
              </Grid>
            </HookFormMuiModal>
          </Grid>
        )}
      </Grid>
    </StyledBox>
  );
};

export default RecruitmentStepsViewSection;

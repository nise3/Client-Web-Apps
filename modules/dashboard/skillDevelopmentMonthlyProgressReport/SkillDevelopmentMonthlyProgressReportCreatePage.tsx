import React, {useEffect, useMemo} from 'react';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';

import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import {SubmitHandler, useForm} from 'react-hook-form';
import {Button, Grid} from '@mui/material';
import CustomDateTimeField from '../../../@softbd/elements/input/CustomDateTimeField';
import {useIntl} from 'react-intl';
import yup from '../../../@softbd/libs/yup';
import {yupResolver} from '@hookform/resolvers/yup';
import IconTrainingCenter from '../../../@softbd/icons/IconTrainingCenter';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import {ArrowBack} from '@mui/icons-material';
import {useRouter} from 'next/router';

// const PREFIX = 'YouthRegistration';

/*const classes = {
  rootContainer: `${PREFIX}-rootContainer`,
  PaperBox: `${PREFIX}-PaperBox`,
  signInStyle: `${PREFIX}-signInStyle`,
};*/

/*const StyledContainer = styled(Container)(({theme}) => ({
  display: 'flex',
  [theme.breakpoints.only('xs')]: {
    height: 'calc(100vh - 56px)',
  },
  [theme.breakpoints.only('sm')]: {
    height: 'calc(100vh - 75px)',
  },

  [`& .${classes.PaperBox}`]: {
    padding: 40,
    margin: '70px auto',
  },

  [`& .${classes.signInStyle}`]: {
    color: theme.palette.primary.main + ' !important',
  },
}));*/

const initialValues = {
  reporting_month: '',
  trade_name: '',
  number_of_trainers: '',
  number_of_labs_or_training_rooms: '',
  number_of_computers_or_training_equipments: '',
  admitted_trainee_men: '',
  admitted_trainee_women: '',
  admitted_trainee_disabled: '',
  admitted_trainee_qawmi: '',
  admitted_trainee_transgender: '',
  admitted_trainee_others: '',
  admitted_trainee_total: '',
  technical_board_registered_trainee_men: '',
  technical_board_registered_trainee_women: '',
  technical_board_registered_trainee_disabled: '',
  technical_board_registered_trainee_qawmi: '',
  technical_board_registered_trainee_transgender: '',
  technical_board_registered_trainee_others: '',
  technical_board_registered_trainee_total: '',
  latest_test_attended_trainee_men: '',
  latest_test_attended_trainee_women: '',
  latest_test_attended_trainee_disabled: '',
  latest_test_attended_trainee_qawmi: '',
  latest_test_attended_trainee_transgender: '',
  latest_test_attended_trainee_others: '',
  latest_test_attended_trainee_total: '',
  latest_test_passed_trainee_men: '',
  latest_test_passed_trainee_women: '',
  latest_test_passed_trainee_disabled: '',
  latest_test_passed_trainee_qawmi: '',
  latest_test_passed_trainee_transgender: '',
  latest_test_passed_trainee_others: '',
  latest_test_passed_trainee_total: '',
};

const SkillDevelopmentMonthlyProgressReportCreatePage = () => {
  const {messages} = useIntl();
  // const {errorStack, successStack} = useNotiStack();
  const router = useRouter();
  console.log('router->', router);
  // const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      reporting_month: yup
        .string()
        .trim()
        .required()
        .matches(/(19|20)\d\d-[01]\d-[0123]\d/)
        .label(
          messages[
            'skill_development_monthly_progress_report.reporting_month'
          ] as string,
        ),
    });
  }, [messages]);

  const {
    register,
    handleSubmit,
    reset,
    //setError,
    formState: {errors, isSubmitting},
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
  });
  useEffect(() => {
    reset(initialValues);
  }, []);

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    console.log(data);
    /*try {
      const queryParam = {mobile: data?.mobile};

      data.user_name_type = UserNameType.MOBILE;
      if (data.physical_disability_status == PhysicalDisabilityStatus.NO) {
        delete data.physical_disabilities;
      } else {
        let physicalDisabilityIds: any = [];
        data.physical_disabilities.map((physical_disability: any) => {
          physicalDisabilityIds.push(physical_disability.id);
        });
        data.physical_disabilities = physicalDisabilityIds;
      }

      let skillIds: any = [];
      (data?.skills || []).map((skill: any) => {
        skillIds.push(skill.id);
      });
      data.skills = skillIds;

      await youthRegistration(data);
      successStack(<IntlMessages id='youth_registration.success' />);
      setIsFormSubmitted(true);
      router
        .push({
          pathname: LINK_YOUTH_REGISTRATION_VERIFICATION,
          query: queryParam,
        })
        .then((r) => {});
    } catch (error: any) {
      processServerSideErrors({error, setError, validationSchema, errorStack});
    }*/
    router.back();
  };

  return (
    <>
      <PageBlock
        title={
          <>
            <IconTrainingCenter />{' '}
            <IntlMessages id='skill_development_monthly_progress_report.label' />
          </>
        }
        extra={[
          <Button
            key={1}
            variant={'contained'}
            color={'primary'}
            size={'small'}
            onClick={() => router.back()}>
            <ArrowBack />
            {messages['common.back']}
          </Button>,
        ]}>
        {/*<Typography
          variant={'h6'}
          style={{marginBottom: '20px', fontSize: '25px', fontWeight: 'bold'}}>
          {messages['skill_development_report.label']}
        </Typography>*/}
        <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
          <Grid container marginTop={'10px'} spacing={2} maxWidth={'md'}>
            <Grid item xs={12} sm={6} md={6}>
              <CustomDateTimeField
                required
                id='reporting_month'
                label={
                  messages[
                    'skill_development_monthly_progress_report.reporting_month'
                  ]
                }
                register={register}
                errorInstance={errors}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomTextInput
                // required
                id='trade_name'
                label={
                  messages[
                    'skills_development_training_activities_income_expenditure_information.trade_name'
                  ]
                }
                register={register}
                errorInstance={errors}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomTextInput
                // required
                id='number_of_trainers'
                label={messages['dashboard.total_trainers']}
                register={register}
                errorInstance={errors}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomTextInput
                // required
                id='number_of_labs_or_training_rooms'
                label={
                  messages[
                    'skills_development_training_activities_income_expenditure_information.number_of_labs_or_training_rooms'
                  ]
                }
                register={register}
                errorInstance={errors}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomTextInput
                // required
                id='number_of_computers_or_training_equipments'
                label={
                  messages[
                    'skill_development_monthly_progress_report.number_of_computers_or_training_equipments'
                  ]
                }
                register={register}
                errorInstance={errors}
              />
            </Grid>

            <Grid item xs={12}>
              <fieldset style={{fontSize: '20px', border: '1px solid #7e7e7e'}}>
                <legend style={{color: '#0a8fdc'}}>
                  {
                    messages[
                      'skill_development_monthly_progress_report.admitted_trainee'
                    ]
                  }
                </legend>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <CustomTextInput
                      // required
                      id='admitted_trainee_men'
                      label={messages['common.male']}
                      register={register}
                      errorInstance={errors}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <CustomTextInput
                      // required
                      id='admitted_trainee_women'
                      label={messages['common.female']}
                      register={register}
                      errorInstance={errors}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <CustomTextInput
                      // required
                      id='admitted_trainee_disabled'
                      label={messages['common.disability']}
                      register={register}
                      errorInstance={errors}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <CustomTextInput
                      // required
                      id='admitted_trainee_qawmi'
                      label={messages['common.qawmi']}
                      register={register}
                      errorInstance={errors}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <CustomTextInput
                      // required
                      id='admitted_trainee_transgender'
                      label={messages['common.transgender']}
                      register={register}
                      errorInstance={errors}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <CustomTextInput
                      // required
                      id='admitted_trainee_others'
                      label={messages['common.others']}
                      register={register}
                      errorInstance={errors}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <CustomTextInput
                      // required
                      id='admitted_trainee_total'
                      label={messages['common.total']}
                      register={register}
                      errorInstance={errors}
                    />
                  </Grid>
                </Grid>
              </fieldset>
            </Grid>

            <Grid item xs={12}>
              <fieldset style={{fontSize: '20px', border: '1px solid #7e7e7e'}}>
                <legend style={{color: '#0a8fdc'}}>
                  {
                    messages[
                      'skill_development_monthly_progress_report.technical_board_registered_trainee'
                    ]
                  }
                </legend>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <CustomTextInput
                      // required
                      id='technical_board_registered_trainee_men'
                      label={messages['common.male']}
                      register={register}
                      errorInstance={errors}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <CustomTextInput
                      // required
                      id='technical_board_registered_trainee_women'
                      label={messages['common.female']}
                      register={register}
                      errorInstance={errors}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <CustomTextInput
                      // required
                      id='technical_board_registered_trainee_disabled'
                      label={messages['common.disability']}
                      register={register}
                      errorInstance={errors}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <CustomTextInput
                      // required
                      id='technical_board_registered_trainee_qawmi'
                      label={messages['common.qawmi']}
                      register={register}
                      errorInstance={errors}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <CustomTextInput
                      // required
                      id='technical_board_registered_trainee_transgender'
                      label={messages['common.transgender']}
                      register={register}
                      errorInstance={errors}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <CustomTextInput
                      // required
                      id='technical_board_registered_trainee_others'
                      label={messages['common.others']}
                      register={register}
                      errorInstance={errors}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <CustomTextInput
                      // required
                      id='technical_board_registered_trainee_total'
                      label={messages['common.total']}
                      register={register}
                      errorInstance={errors}
                    />
                  </Grid>
                </Grid>
              </fieldset>
            </Grid>

            <Grid item xs={12}>
              <fieldset style={{fontSize: '20px', border: '1px solid #7e7e7e'}}>
                <legend style={{color: '#0a8fdc'}}>
                  {
                    messages[
                      'skill_development_monthly_progress_report.latest_test_attended_trainee'
                    ]
                  }
                </legend>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <CustomTextInput
                      // required
                      id='latest_test_attended_trainee_men'
                      label={messages['common.male']}
                      register={register}
                      errorInstance={errors}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <CustomTextInput
                      // required
                      id='latest_test_attended_trainee_women'
                      label={messages['common.female']}
                      register={register}
                      errorInstance={errors}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <CustomTextInput
                      // required
                      id='latest_test_attended_trainee_disabled'
                      label={messages['common.disability']}
                      register={register}
                      errorInstance={errors}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <CustomTextInput
                      // required
                      id='latest_test_attended_trainee_qawmi'
                      label={messages['common.qawmi']}
                      register={register}
                      errorInstance={errors}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <CustomTextInput
                      // required
                      id='latest_test_attended_trainee_transgender'
                      label={messages['common.transgender']}
                      register={register}
                      errorInstance={errors}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <CustomTextInput
                      // required
                      id='latest_test_attended_trainee_others'
                      label={messages['common.others']}
                      register={register}
                      errorInstance={errors}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <CustomTextInput
                      // required
                      id='latest_test_attended_trainee_total'
                      label={messages['common.total']}
                      register={register}
                      errorInstance={errors}
                    />
                  </Grid>
                </Grid>
              </fieldset>
            </Grid>

            <Grid item xs={12}>
              <fieldset style={{fontSize: '20px', border: '1px solid #7e7e7e'}}>
                <legend style={{color: '#0a8fdc'}}>
                  {
                    messages[
                      'skill_development_monthly_progress_report.latest_test_passed_trainee'
                    ]
                  }
                </legend>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <CustomTextInput
                      // required
                      id='latest_test_passed_trainee_men'
                      label={messages['common.male']}
                      register={register}
                      errorInstance={errors}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <CustomTextInput
                      // required
                      id='latest_test_passed_trainee_women'
                      label={messages['common.female']}
                      register={register}
                      errorInstance={errors}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <CustomTextInput
                      // required
                      id='latest_test_passed_trainee_disabled'
                      label={messages['common.disability']}
                      register={register}
                      errorInstance={errors}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <CustomTextInput
                      // required
                      id='latest_test_passed_trainee_qawmi'
                      label={messages['common.qawmi']}
                      register={register}
                      errorInstance={errors}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <CustomTextInput
                      // required
                      id='latest_test_passed_trainee_transgender'
                      label={messages['common.transgender']}
                      register={register}
                      errorInstance={errors}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <CustomTextInput
                      // required
                      id='latest_test_passed_trainee_others'
                      label={messages['common.others']}
                      register={register}
                      errorInstance={errors}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <CustomTextInput
                      // required
                      id='latest_test_passed_trainee_total'
                      label={messages['common.total']}
                      register={register}
                      errorInstance={errors}
                    />
                  </Grid>
                </Grid>
              </fieldset>
            </Grid>

            <Grid item xs={12}>
              <SubmitButton
                startIcon={false}
                isSubmitting={isSubmitting}
                label={messages['common.create_account'] as string}
                size='large'
                // isDisable={isSubmitting || isFormSubmitted}
              />
              {/*<Typography
                sx={{
                  color: 'red',
                  marginLeft: '10px',
                  fontStyle: 'italic',
                  verticalAlign: 'middle',
                }}
                variant={'caption'}>
                *({messages['youth.registration_username_note']})
              </Typography>*/}
              {/*<Typography style={{marginTop: '15px'}} variant={'body1'}>
                {messages['common.already_have_account']}{' '}
                <Link
                  href={getSSOLoginUrl(router.query)}
                  className={classes.signInStyle}>
                  {messages['common.signin_here']}
                </Link>
              </Typography>*/}
            </Grid>
          </Grid>
        </form>
      </PageBlock>
    </>
  );
};

export default SkillDevelopmentMonthlyProgressReportCreatePage;

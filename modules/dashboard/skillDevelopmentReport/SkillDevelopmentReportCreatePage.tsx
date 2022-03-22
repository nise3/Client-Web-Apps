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
  number_of_trades_allowed: '',
  number_of_ongoing_trades: '',
  current_session_trainees_women: '',
  date_of_last_election_of_all_party_council: '',
  current_session_trainees_men: '',
  current_session_trainees_disabled_and_others: '',
  current_session_trainees_total: '',
  total_trainees_men: '',
  total_trainees_women: '',
  total_trainees_disabled_and_others: '',
  total_trainees_total: '',
  number_of_computers: '',
  number_of_other_equipments: '',
  bank_status_skill_development: '',
  bank_status_coordinating_council: '',
  amount_of_total_fdr: '',
  comments: '',
};

const SkillDevelopmentReportCreatePage = () => {
  const {messages} = useIntl();
  // const {errorStack, successStack} = useNotiStack();
  const router = useRouter();
  // const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      reporting_month: yup
        .number()
        .required()
        .label(
          messages['skill_development_report.approved_trade_number'] as string,
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
    data.reporting_month = 12; //todo: this will be a form field after backend discussion
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
            <IntlMessages
              id='common.add_new'
              values={{
                subject: <IntlMessages id='skill_development_report.label' />,
              }}
            />
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
        <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
          <Grid container marginTop={'10px'} spacing={2} maxWidth={'md'}>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='number_of_trades_allowed'
                label={
                  messages['skill_development_report.approved_trade_number']
                }
                register={register}
                errorInstance={errors}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='number_of_ongoing_trades'
                label={
                  messages['skill_development_report.current_trade_number']
                }
                register={register}
                errorInstance={errors}
              />
            </Grid>
            <Grid item xs={12}>
              <fieldset>
                <legend style={{fontSize: '20px'}}>
                  {
                    messages[
                      'skill_development_report.current_session_trainees'
                    ]
                  }
                </legend>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <CustomTextInput
                      id='current_session_trainees_women'
                      label={messages['skill_development_report.current_women']}
                      register={register}
                      errorInstance={errors}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <CustomTextInput
                      id='current_session_trainees_men'
                      label={messages['skill_development_report.current_men']}
                      register={register}
                      errorInstance={errors}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <CustomTextInput
                      id='current_session_trainees_disabled_and_others'
                      label={
                        messages[
                          'skill_development_report.current_disabled_and_others'
                        ]
                      }
                      register={register}
                      errorInstance={errors}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <CustomTextInput
                      id='current_session_trainees_total'
                      label={messages['skill_development_report.current_total']}
                      register={register}
                      errorInstance={errors}
                    />
                  </Grid>
                </Grid>
              </fieldset>
            </Grid>
            <Grid item xs={12}>
              <fieldset>
                <legend style={{fontSize: '20px'}}>
                  {messages['skill_development_report.trainees_from_the_start']}
                </legend>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <CustomTextInput
                      id='total_trainees_women'
                      label={
                        messages['skill_development_report.from_start_women']
                      }
                      register={register}
                      errorInstance={errors}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <CustomTextInput
                      id='total_trainees_men'
                      label={
                        messages['skill_development_report.from_start_men']
                      }
                      register={register}
                      errorInstance={errors}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <CustomTextInput
                      id='total_trainees_disabled_and_others'
                      label={
                        messages[
                          'skill_development_report.from_start_disabled_and_others'
                        ]
                      }
                      register={register}
                      errorInstance={errors}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <CustomTextInput
                      id='total_trainees_total'
                      label={
                        messages['skill_development_report.from_start_total']
                      }
                      register={register}
                      errorInstance={errors}
                    />
                  </Grid>
                </Grid>
              </fieldset>
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='number_of_computers'
                label={messages['skill_development_report.number_of_computers']}
                register={register}
                errorInstance={errors}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='number_of_other_equipments'
                label={messages['skill_development_report.number_of_machines']}
                register={register}
                errorInstance={errors}
              />
            </Grid>

            <Grid item xs={12}>
              <fieldset>
                <legend style={{fontSize: '20px'}}>
                  {messages['skill_development_report.bank_static']}
                </legend>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <CustomTextInput
                      id='bank_status_skill_development'
                      label={
                        messages[
                          'skill_development_report.skill_improvement_training'
                        ]
                      }
                      register={register}
                      errorInstance={errors}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <CustomTextInput
                      id='bank_status_coordinating_council'
                      label={
                        messages[
                          'skill_development_report.coordinating_committee'
                        ]
                      }
                      register={register}
                      errorInstance={errors}
                    />
                  </Grid>
                </Grid>
              </fieldset>
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='amount_of_total_fdr'
                label={messages['skill_development_report.total_fdr_amount']}
                register={register}
                errorInstance={errors}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
              <CustomDateTimeField
                id='date_of_last_election_of_all_party_council'
                label={messages['skill_development_report.last_election_date']}
                register={register}
                errorInstance={errors}
              />
            </Grid>

            <Grid item xs={12}>
              <CustomTextInput
                id='comments'
                label={messages['common.comment']}
                register={register}
                errorInstance={errors}
                multiline={true}
              />
            </Grid>

            <Grid item xs={12}>
              <SubmitButton
                startIcon={false}
                isSubmitting={isSubmitting}
                label={messages['common.submit'] as string}
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

export default SkillDevelopmentReportCreatePage;

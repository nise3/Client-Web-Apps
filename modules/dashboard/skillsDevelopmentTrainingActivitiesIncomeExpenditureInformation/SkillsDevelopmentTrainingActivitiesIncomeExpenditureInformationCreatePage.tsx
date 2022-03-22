import {useIntl} from 'react-intl';
import {useRouter} from 'next/router';
import React, {useEffect, useMemo} from 'react';
import yup from '../../../@softbd/libs/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import IconTrainingCenter from '../../../@softbd/icons/IconTrainingCenter';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {Button, Grid} from '@mui/material';
import {ArrowBack} from '@mui/icons-material';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import CustomDateTimeField from '../../../@softbd/elements/input/CustomDateTimeField';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import {yupResolver} from '@hookform/resolvers/yup';

const initialValues = {
  reporting_month: '',
  trade_name: '',
  number_of_labs_or_training_rooms: '',
  number_of_allowed_seats: '',
  number_of_trainees: '',
  course_fee_per_trainee: '',
  course_income_from_course_fee: '',
  course_income_from_application_and_others: '',
  course_income_total: '',
  reporting_month_income: '',
  reporting_month_training_expenses_instructor_salaries: '',
  reporting_month_training_expenses_other: '',
  reporting_month_training_expenses_total: '',
  reporting_month_net_income: '',
  bank_status_up_to_previous_month: '',
  bank_status_so_far: '',
  account_no_and_bank_branch_name: '',
  comments: '',
};

const SkillsDevelopmentTrainingActivitiesIncomeExpenditureInformationCreatePage =
  () => {
    const {messages} = useIntl();

    const router = useRouter();

    const validationSchema = useMemo(() => {
      return yup.object().shape({
        reporting_month: yup
          .number()
          .required()
          .label(
            messages[
              'skill_development_report.approved_trade_number'
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
      data.reporting_month = 12; //todo: this will be a form field after backend discussion
      console.log(data);
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
                  subject: (
                    <IntlMessages id='skills_development_training_activities_income_expenditure_information.label' />
                  ),
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
                <CustomDateTimeField
                  id='reporting_month'
                  label={messages['common.month']}
                  register={register}
                  errorInstance={errors}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomTextInput
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
                  id='number_of_allowed_seats'
                  label={
                    messages['training_center_report.number_of_seats_allowed']
                  }
                  register={register}
                  errorInstance={errors}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomTextInput
                  id='number_of_trainees'
                  label={messages['training_center_report.number_of_trainees']}
                  register={register}
                  errorInstance={errors}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomTextInput
                  id='course_fee_per_trainee'
                  label={
                    messages['training_center_report.course_fee_per_trainee']
                  }
                  register={register}
                  errorInstance={errors}
                />
              </Grid>

              <Grid item xs={12}>
                <fieldset>
                  <legend style={{fontSize: '20px', color: '#0a8fdc'}}>
                    {messages['training_center_report.total_income_of_courses']}
                  </legend>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <CustomTextInput
                        id='course_income_from_course_fee'
                        label={
                          messages['training_center_report.total_course_fee']
                        }
                        register={register}
                        errorInstance={errors}
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <CustomTextInput
                        id='course_income_from_application_and_others'
                        label={
                          messages[
                            'training_center_report.application_and_others'
                          ]
                        }
                        register={register}
                        errorInstance={errors}
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <CustomTextInput
                        id='course_income_total'
                        label={messages['training_center_report.total_income']}
                        register={register}
                        errorInstance={errors}
                      />
                    </Grid>
                  </Grid>
                </fieldset>
              </Grid>

              <Grid item xs={12} md={6}>
                <CustomTextInput
                  id='reporting_month_income'
                  label={
                    messages['training_center_report.reporting_month_income']
                  }
                  register={register}
                  errorInstance={errors}
                />
              </Grid>

              <Grid item xs={12}>
                <fieldset>
                  <legend style={{fontSize: '20px', color: '#0a8fdc'}}>
                    {
                      messages[
                        'training_center_report.net_training_expenses_reporting_month'
                      ]
                    }
                  </legend>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <CustomTextInput
                        id='reporting_month_training_expenses_instructor_salaries'
                        label={
                          messages['training_center_report.instructor_salaries']
                        }
                        register={register}
                        errorInstance={errors}
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <CustomTextInput
                        id='reporting_month_training_expenses_other'
                        label={
                          messages['training_center_report.other_expenses']
                        }
                        register={register}
                        errorInstance={errors}
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <CustomTextInput
                        id='reporting_month_training_expenses_total'
                        label={
                          messages[
                            'training_center_report.training_expenses_total'
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
                  id='reporting_month_net_income'
                  label={messages['training_center_report.month_net_income']}
                  register={register}
                  errorInstance={errors}
                />
              </Grid>

              <Grid item xs={12}>
                <fieldset>
                  <legend style={{fontSize: '20px', color: '#0a8fdc'}}>
                    {messages['training_center_report.bank_status']}
                  </legend>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <CustomTextInput
                        id='bank_status_up_to_previous_month'
                        label={
                          messages[
                            'training_center_report.bank_status_up_to_previous_month'
                          ]
                        }
                        register={register}
                        errorInstance={errors}
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <CustomTextInput
                        id='bank_status_so_far'
                        label={
                          messages['training_center_report.bank_status_so_far']
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
                  id='account_no_and_bank_branch_name'
                  label={
                    messages[
                      'training_center_report.account_no_and_bank_branch_name'
                    ]
                  }
                  register={register}
                  errorInstance={errors}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <CustomTextInput
                  id='comments'
                  label={messages['common.comment']}
                  register={register}
                  errorInstance={errors}
                />
              </Grid>

              <Grid item xs={12}>
                <SubmitButton
                  startIcon={false}
                  isSubmitting={isSubmitting}
                  label={messages['common.submit'] as string}
                  size='large'
                />
              </Grid>
            </Grid>
          </form>
        </PageBlock>
      </>
    );
  };

export default SkillsDevelopmentTrainingActivitiesIncomeExpenditureInformationCreatePage;

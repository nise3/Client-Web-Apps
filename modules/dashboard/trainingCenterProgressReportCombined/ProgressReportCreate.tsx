import React, {useMemo, useState} from 'react';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import {SubmitHandler, useForm} from 'react-hook-form';
import {Button, Grid} from '@mui/material';
import {useIntl} from 'react-intl';
import yup from '../../../@softbd/libs/yup';
import {yupResolver} from '@hookform/resolvers/yup';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import {ArrowBack} from '@mui/icons-material';
import {useRouter} from 'next/router';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import {trainingCenterCombinedProgressReportCreate} from '../../../services/instituteManagement/TrainingCenterReportService';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import CustomDateTimeField from '../../../@softbd/elements/input/CustomDateTimeField';

const ProgressReportCreatePage = () => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const {createSuccessMessage} = useSuccessMessage();
  const router = useRouter();
  console.log('router->', router);
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      reporting_month: yup
        .string()
        .trim()
        .required()
        .matches(/(19|20)\d\d-[01]\d-[0123]\d/)
        .label(messages['common.reporting_month'] as string),
    });
  }, [messages]);

  const {
    register,
    handleSubmit,
    setError,
    formState: {errors, isSubmitting},
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    console.log(data);
    try {
      await trainingCenterCombinedProgressReportCreate(data);
      createSuccessMessage('training_center_progress_report_combined.label');
      setIsFormSubmitted(true);
      router.back();
    } catch (error: any) {
      processServerSideErrors({error, setError, validationSchema, errorStack});
    }
  };

  return (
    <>
      <PageBlock
        title={
          <>
            <AssignmentTurnedInIcon />
            <IntlMessages id='training_center_progress_report_combined.label' />
          </>
        }
        extra={[
          <Button
            key={1}
            variant={'contained'}
            color={'primary'}
            size={'small'}
            onClick={() => {
              router.back();
            }}>
            <ArrowBack />
            {messages['common.back']}
          </Button>,
        ]}>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
          <Grid container marginTop={'10px'} spacing={2} maxWidth={'md'}>
            <Grid item xs={12}>
              <CustomDateTimeField
                required
                id='reporting_month'
                label={messages['common.reporting_month']}
                register={register}
                errorInstance={errors}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextInput
                id='voluntary_organizations_registered_in_current_month'
                label={
                  messages[
                    'training_center_progress_report.voluntary_organizations_registered_in_current_month'
                  ]
                }
                register={register}
                errorInstance={errors}
              />
            </Grid>

            <Grid item xs={12}>
              <fieldset style={{border: '1px solid #7e7e7e'}}>
                <legend style={{color: '#0a8fdc'}}>
                  {
                    messages[
                      'training_center_progress_report.members_up_to_previous_month'
                    ]
                  }
                </legend>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <CustomTextInput
                      id={'members_up_to_previous_month_general_members'}
                      label={
                        messages[
                          'training_center_progress_report.general_members'
                        ]
                      }
                      register={register}
                      errorInstance={errors}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <CustomTextInput
                      id={'members_up_to_previous_month_life_member'}
                      label={
                        messages[
                          'training_center_progress_report.lifetime_members'
                        ]
                      }
                      register={register}
                      errorInstance={errors}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <CustomTextInput
                      id={'members_up_to_previous_month_patron_member'}
                      label={
                        messages[
                          'training_center_progress_report.patron_members'
                        ]
                      }
                      register={register}
                      errorInstance={errors}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <CustomTextInput
                      id={'members_up_to_previous_month_total'}
                      label={
                        messages[
                          'training_center_progress_report.total_members'
                        ]
                      }
                      register={register}
                      errorInstance={errors}
                    />
                  </Grid>
                </Grid>
              </fieldset>
            </Grid>
            <Grid item xs={12}>
              <fieldset style={{border: '1px solid #7e7e7e'}}>
                <legend style={{color: '#0a8fdc'}}>
                  {
                    messages[
                      'training_center_progress_report.members_enrollment_in_reporting_month'
                    ]
                  }
                </legend>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <CustomTextInput
                      id={
                        'member_enrollment_in_reporting_month_general_members'
                      }
                      label={
                        messages[
                          'training_center_progress_report.general_members'
                        ]
                      }
                      register={register}
                      errorInstance={errors}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CustomTextInput
                      id={'member_enrollment_in_reporting_month_life_member'}
                      label={
                        messages[
                          'training_center_progress_report.lifetime_members'
                        ]
                      }
                      register={register}
                      errorInstance={errors}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CustomTextInput
                      id={'member_enrollment_in_reporting_month_patron_member'}
                      label={
                        messages[
                          'training_center_progress_report.patron_members'
                        ]
                      }
                      register={register}
                      errorInstance={errors}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CustomTextInput
                      id={'member_enrollment_in_reporting_month_total'}
                      label={
                        messages[
                          'training_center_progress_report.total_members'
                        ]
                      }
                      register={register}
                      errorInstance={errors}
                    />
                  </Grid>
                </Grid>
              </fieldset>
            </Grid>

            <Grid item xs={12}>
              <CustomTextInput
                id='total_number_of_members'
                label={
                  messages['training_center_progress_report.total_members']
                }
                register={register}
                errorInstance={errors}
              />
            </Grid>

            <Grid item xs={12}>
              <CustomTextInput
                id='subscriptions_collected_so_far'
                label={
                  messages[
                    'training_center_progress_report.subscriptions_collected_so_far'
                  ]
                }
                register={register}
                errorInstance={errors}
              />
            </Grid>

            <Grid item xs={12}>
              <fieldset style={{border: '1px solid #7e7e7e'}}>
                <legend style={{color: '#0a8fdc'}}>
                  {
                    messages[
                      'training_center_progress_report.total_amount_of_subscription_in_current_month'
                    ]
                  }
                </legend>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <CustomTextInput
                      id={
                        'subscriptions_collected_in_current_month_organization'
                      }
                      label={
                        messages[
                          'training_center_progress_report.subscriptions_collected_from_organization'
                        ]
                      }
                      register={register}
                      errorInstance={errors}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CustomTextInput
                      id={'subscriptions_collected_in_current_month_member'}
                      label={
                        messages[
                          'training_center_progress_report.subscriptions_collected_from_member'
                        ]
                      }
                      register={register}
                      errorInstance={errors}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CustomTextInput
                      id={'subscriptions_collected_in_current_month_total'}
                      label={
                        messages[
                          'training_center_progress_report.total_subscription'
                        ]
                      }
                      register={register}
                      errorInstance={errors}
                    />
                  </Grid>
                </Grid>
              </fieldset>
            </Grid>

            <Grid item xs={12}>
              <fieldset style={{border: '1px solid #7e7e7e'}}>
                <legend style={{color: '#0a8fdc'}}>
                  {
                    messages[
                      'training_center_progress_report.amount_of_grants_received_in_current_month'
                    ]
                  }
                </legend>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <CustomTextInput
                      id={'grants_received_in_current_month_source'}
                      label={messages['training_center_progress_report.source']}
                      register={register}
                      errorInstance={errors}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CustomTextInput
                      id={'grants_received_in_current_month_amount'}
                      label={messages['common.amount']}
                      register={register}
                      errorInstance={errors}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CustomTextInput
                      id={'grants_received_in_current_month_total'}
                      label={
                        messages['training_center_progress_report.total_grants']
                      }
                      register={register}
                      errorInstance={errors}
                    />
                  </Grid>
                </Grid>
              </fieldset>
            </Grid>

            <Grid item xs={12}>
              <CustomTextInput
                id='gross_income'
                label={messages['training_center_progress_report.gross_income']}
                register={register}
                errorInstance={errors}
              />
            </Grid>
            <Grid item xs={12}>
              <fieldset style={{border: '1px solid #7e7e7e'}}>
                <legend style={{color: '#0a8fdc'}}>
                  {
                    messages[
                      'training_center_progress_report.income_in_skill_development_sector_in_reported_month'
                    ]
                  }
                </legend>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <CustomTextInput
                      id={'income_in_skills_development_sector_trades'}
                      label={
                        messages[
                          'training_center_progress_report.number_of_trades'
                        ]
                      }
                      register={register}
                      errorInstance={errors}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CustomTextInput
                      id={'income_in_skills_development_sector_money'}
                      label={
                        messages[
                          'training_center_progress_report.amount_of_money'
                        ]
                      }
                      register={register}
                      errorInstance={errors}
                    />
                  </Grid>
                </Grid>
              </fieldset>
            </Grid>
            <Grid item xs={12}>
              <fieldset style={{border: '1px solid #7e7e7e'}}>
                <legend style={{color: '#0a8fdc'}}>
                  {
                    messages[
                      'training_center_progress_report.expenditure_in_reported_month'
                    ]
                  }
                </legend>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <CustomTextInput
                      id={'expenditure_in_skill_development_training'}
                      label={
                        messages[
                          'training_center_progress_report.expenditure_in_skill_development_training'
                        ]
                      }
                      register={register}
                      errorInstance={errors}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CustomTextInput
                      id={'expenditure_in_other_sectors'}
                      label={
                        messages[
                          'training_center_progress_report.expenditure_in_other_sectors'
                        ]
                      }
                      register={register}
                      errorInstance={errors}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CustomTextInput
                      id={'expenditure_total'}
                      label={
                        messages[
                          'training_center_progress_report.expenditure_total'
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
                id='total_income_in_the_training_sector'
                label={
                  messages[
                    'training_center_progress_report.total_income_in_the_training_sector'
                  ]
                }
                register={register}
                errorInstance={errors}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='bank_status_and_account_number'
                label={
                  messages[
                    'training_center_progress_report.bank_status_and_account_number'
                  ]
                }
                register={register}
                errorInstance={errors}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='bank_interest'
                label={
                  messages['training_center_progress_report.bank_interest']
                }
                register={register}
                errorInstance={errors}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='amount_of_fdr_and_bank_account_number'
                label={
                  messages[
                    'training_center_progress_report.amount_of_fdr_and_bank_account_number'
                  ]
                }
                register={register}
                errorInstance={errors}
              />
            </Grid>
            <Grid item xs={12}>
              <fieldset style={{border: '1px solid #7e7e7e'}}>
                <legend style={{color: '#0a8fdc'}}>
                  {
                    messages[
                      'training_center_progress_report.information_about_coordinating_council_combined_meeting'
                    ]
                  }
                </legend>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <CustomTextInput
                      id={
                        'number_of_meetings_held_during_current_financial_year'
                      }
                      label={
                        messages[
                          'training_center_progress_report.number_of_meetings_held_during_current_financial_year'
                        ]
                      }
                      register={register}
                      errorInstance={errors}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CustomTextInput
                      id={
                        'number_of_executive_council_meetings_in_current_month'
                      }
                      label={
                        messages[
                          'training_center_progress_report.number_of_executive_council_meetings_in_current_month'
                        ]
                      }
                      register={register}
                      errorInstance={errors}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CustomTextInput
                      id={'coordinating_council_meeting_total'}
                      label={
                        messages[
                          'training_center_progress_report.coordinating_council_meeting_total'
                        ]
                      }
                      register={register}
                      errorInstance={errors}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CustomTextInput
                      id={'names_and_numbers_of_other_meetings'}
                      label={
                        messages[
                          'training_center_progress_report.names_and_numbers_of_other_meetings'
                        ]
                      }
                      register={register}
                      errorInstance={errors}
                    />
                  </Grid>
                </Grid>
              </fieldset>
            </Grid>

            <Grid item xs={12}>
              <CustomTextInput
                id='other_activities_undertaken'
                label={
                  messages[
                    'training_center_progress_report.other_activities_undertaken'
                  ]
                }
                register={register}
                errorInstance={errors}
              />
            </Grid>

            <Grid item xs={12} display={'flex'} justifyContent={'flex-end'}>
              <SubmitButton
                startIcon={false}
                isSubmitting={isSubmitting}
                label={messages['common.submit'] as string}
                size='large'
                isDisable={isSubmitting || isFormSubmitted}
              />
            </Grid>
          </Grid>
        </form>
      </PageBlock>
    </>
  );
};

export default ProgressReportCreatePage;

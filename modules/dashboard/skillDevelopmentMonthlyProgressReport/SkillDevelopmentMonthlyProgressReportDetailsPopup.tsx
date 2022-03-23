import {useIntl} from 'react-intl';
import CustomDetailsViewMuiModal from '../../../@softbd/modals/CustomDetailsViewMuiModal/CustomDetailsViewMuiModal';
import IconCourse from '../../../@softbd/icons/IconCourse';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import {Grid} from '@mui/material';
import DetailsInputView from '../../../@softbd/elements/display/DetailsInputView/DetailsInputView';
import React from 'react';

type Props = {
  itemId: number | null;
  onClose: () => void;
};

const SkillDevelopmentMonthlyProgressReportDetailsPopup = ({
  itemId,
  ...props
}: Props) => {
  const {messages} = useIntl();

  let itemData: any = {};
  let isLoading: any = false;

  return (
    <>
      <CustomDetailsViewMuiModal
        open={true}
        {...props}
        title={
          <>
            <IconCourse />
            <IntlMessages id='course.label' />
          </>
        }
        maxWidth={isBreakPointUp('xl') ? 'lg' : 'md'}
        actions={
          <>
            <CancelButton onClick={props.onClose} isLoading={isLoading} />
          </>
        }>
        <Grid container marginTop={'10px'} spacing={2} maxWidth={'md'}>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              value={itemData?.reporting_month}
              label={
                messages[
                  'skill_development_monthly_progress_report.reporting_month'
                ]
              }
              isLoading={isLoading}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <DetailsInputView
              value={itemData?.trade_name}
              label={
                messages[
                  'skills_development_training_activities_income_expenditure_information.trade_name'
                ]
              }
              isLoading={isLoading}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <DetailsInputView
              value={itemData?.number_of_trainers}
              label={messages['dashboard.total_trainers']}
              isLoading={isLoading}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <DetailsInputView
              value={itemData?.number_of_labs_or_training_rooms}
              label={
                messages[
                  'skills_development_training_activities_income_expenditure_information.number_of_labs_or_training_rooms'
                ]
              }
              isLoading={isLoading}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <DetailsInputView
              value={itemData?.number_of_computers_or_training_equipments}
              label={
                messages[
                  'skill_development_monthly_progress_report.number_of_computers_or_training_equipments'
                ]
              }
              isLoading={isLoading}
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
                  <DetailsInputView
                    value={itemData?.admitted_trainee_men}
                    label={messages['common.male']}
                    isLoading={isLoading}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <DetailsInputView
                    value={itemData?.admitted_trainee_women}
                    label={messages['common.female']}
                    isLoading={isLoading}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <DetailsInputView
                    value={itemData?.admitted_trainee_disabled}
                    label={messages['common.disability']}
                    isLoading={isLoading}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <DetailsInputView
                    value={itemData?.admitted_trainee_qawmi}
                    label={messages['common.qawmi']}
                    isLoading={isLoading}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <DetailsInputView
                    value={itemData?.admitted_trainee_transgender}
                    label={messages['common.transgender']}
                    isLoading={isLoading}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <DetailsInputView
                    value={itemData?.admitted_trainee_others}
                    label={messages['common.others']}
                    isLoading={isLoading}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <DetailsInputView
                    value={itemData?.admitted_trainee_total}
                    label={messages['common.total']}
                    isLoading={isLoading}
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
                  <DetailsInputView
                    value={itemData?.technical_board_registered_trainee_men}
                    label={messages['common.male']}
                    isLoading={isLoading}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <DetailsInputView
                    value={itemData?.technical_board_registered_trainee_women}
                    label={messages['common.female']}
                    isLoading={isLoading}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <DetailsInputView
                    value={
                      itemData?.technical_board_registered_trainee_disabled
                    }
                    label={messages['common.disability']}
                    isLoading={isLoading}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <DetailsInputView
                    value={itemData?.technical_board_registered_trainee_qawmi}
                    label={messages['common.qawmi']}
                    isLoading={isLoading}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <DetailsInputView
                    value={
                      itemData?.technical_board_registered_trainee_transgender
                    }
                    label={messages['common.transgender']}
                    isLoading={isLoading}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <DetailsInputView
                    value={itemData?.technical_board_registered_trainee_others}
                    label={messages['common.others']}
                    isLoading={isLoading}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <DetailsInputView
                    value={itemData?.technical_board_registered_trainee_total}
                    label={messages['common.total']}
                    isLoading={isLoading}
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
                  <DetailsInputView
                    value={itemData?.latest_test_attended_trainee_men}
                    label={messages['common.male']}
                    isLoading={isLoading}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <DetailsInputView
                    value={itemData?.latest_test_attended_trainee_women}
                    label={messages['common.female']}
                    isLoading={isLoading}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <DetailsInputView
                    value={itemData?.latest_test_attended_trainee_disabled}
                    label={messages['common.disability']}
                    isLoading={isLoading}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <DetailsInputView
                    value={itemData?.latest_test_attended_trainee_qawmi}
                    label={messages['common.qawmi']}
                    isLoading={isLoading}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <DetailsInputView
                    value={itemData?.latest_test_attended_trainee_transgender}
                    label={messages['common.transgender']}
                    isLoading={isLoading}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <DetailsInputView
                    value={itemData?.latest_test_attended_trainee_others}
                    label={messages['common.others']}
                    isLoading={isLoading}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <DetailsInputView
                    value={itemData?.latest_test_attended_trainee_total}
                    label={messages['common.total']}
                    isLoading={isLoading}
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
                  <DetailsInputView
                    value={itemData?.latest_test_passed_trainee_men}
                    label={messages['common.male']}
                    isLoading={isLoading}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <DetailsInputView
                    value={itemData?.latest_test_passed_trainee_women}
                    label={messages['common.female']}
                    isLoading={isLoading}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <DetailsInputView
                    value={itemData?.latest_test_passed_trainee_disabled}
                    label={messages['common.disability']}
                    isLoading={isLoading}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <DetailsInputView
                    value={itemData?.latest_test_passed_trainee_qawmi}
                    label={messages['common.qawmi']}
                    isLoading={isLoading}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <DetailsInputView
                    value={itemData?.latest_test_passed_trainee_transgender}
                    label={messages['common.transgender']}
                    isLoading={isLoading}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <DetailsInputView
                    value={itemData?.latest_test_passed_trainee_others}
                    label={messages['common.others']}
                    isLoading={isLoading}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <DetailsInputView
                    value={itemData?.latest_test_passed_trainee_total}
                    label={messages['common.total']}
                    isLoading={isLoading}
                  />
                </Grid>
              </Grid>
            </fieldset>
          </Grid>
        </Grid>
      </CustomDetailsViewMuiModal>
    </>
  );
};

export default SkillDevelopmentMonthlyProgressReportDetailsPopup;

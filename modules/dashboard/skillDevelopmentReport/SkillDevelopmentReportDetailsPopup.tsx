import {useIntl} from 'react-intl';
import CustomDetailsViewMuiModal from '../../../@softbd/modals/CustomDetailsViewMuiModal/CustomDetailsViewMuiModal';
import IconCourse from '../../../@softbd/icons/IconCourse';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import {Grid, Typography} from '@mui/material';
import DetailsInputView from '../../../@softbd/elements/display/DetailsInputView/DetailsInputView';
import React from 'react';
import Box from '@mui/material/Box';

type Props = {
  itemId: number | null;
  onClose: () => void;
};

const SkillDevelopmentReportDetailsPopup = ({itemId, ...props}: Props) => {
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
              value={itemData?.number_of_trades_allowed}
              label={messages['skill_development_report.approved_trade_number']}
              isLoading={isLoading}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <DetailsInputView
              value={itemData?.number_of_ongoing_trades}
              label={messages['skill_development_report.current_trade_number']}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography>
              {messages['skill_development_report.current_session_trainees']}
            </Typography>
            <Box
              sx={{
                border: '1px solid #e9e9e9',
                marginTop: '5px',
                padding: '15px',
              }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <DetailsInputView
                    value={itemData?.current_session_trainees_women}
                    label={messages['skill_development_report.current_women']}
                    isLoading={isLoading}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <DetailsInputView
                    value={itemData?.current_session_trainees_men}
                    label={messages['skill_development_report.current_men']}
                    isLoading={isLoading}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <DetailsInputView
                    value={
                      itemData?.current_session_trainees_disabled_and_others
                    }
                    label={
                      messages[
                        'skill_development_report.current_disabled_and_others'
                      ]
                    }
                    isLoading={isLoading}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <DetailsInputView
                    value={itemData?.current_session_trainees_total}
                    label={messages['skill_development_report.current_total']}
                    isLoading={isLoading}
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Typography>
              {messages['skill_development_report.trainees_from_the_start']}
            </Typography>
            <Box
              sx={{
                border: '1px solid #e9e9e9',
                marginTop: '5px',
                padding: '15px',
              }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <DetailsInputView
                    value={itemData?.total_trainees_women}
                    label={
                      messages['skill_development_report.from_start_women']
                    }
                    isLoading={isLoading}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <DetailsInputView
                    value={itemData?.total_trainees_men}
                    label={messages['skill_development_report.from_start_men']}
                    isLoading={isLoading}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <DetailsInputView
                    value={itemData?.total_trainees_disabled_and_others}
                    label={
                      messages[
                        'skill_development_report.from_start_disabled_and_others'
                      ]
                    }
                    isLoading={isLoading}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <DetailsInputView
                    value={itemData?.total_trainees_total}
                    label={
                      messages['skill_development_report.from_start_total']
                    }
                    isLoading={isLoading}
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <DetailsInputView
              value={itemData?.number_of_computers}
              label={messages['skill_development_report.number_of_computers']}
              isLoading={isLoading}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <DetailsInputView
              value={itemData?.number_of_other_equipments}
              label={messages['skill_development_report.number_of_machines']}
              isLoading={isLoading}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography>
              {messages['skill_development_report.bank_static']}
            </Typography>

            <Box
              sx={{
                border: '1px solid #e9e9e9',
                marginTop: '5px',
                padding: '15px',
              }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <DetailsInputView
                    value={itemData?.bank_status_skill_development}
                    label={
                      messages[
                        'skill_development_report.skill_improvement_training'
                      ]
                    }
                    isLoading={isLoading}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <DetailsInputView
                    value={itemData?.bank_status_coordinating_council}
                    label={
                      messages[
                        'skill_development_report.coordinating_committee'
                      ]
                    }
                    isLoading={isLoading}
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <DetailsInputView
              value={itemData?.amount_of_total_fdr}
              label={messages['skill_development_report.total_fdr_amount']}
              isLoading={isLoading}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <DetailsInputView
              value={itemData?.date_of_last_election_of_all_party_council}
              label={messages['skill_development_report.last_election_date']}
              isLoading={isLoading}
            />
          </Grid>

          <Grid item xs={12}>
            <DetailsInputView
              value={itemData?.comments}
              label={messages['common.comment']}
              isLoading={isLoading}
            />
          </Grid>
        </Grid>
      </CustomDetailsViewMuiModal>
    </>
  );
};

export default SkillDevelopmentReportDetailsPopup;

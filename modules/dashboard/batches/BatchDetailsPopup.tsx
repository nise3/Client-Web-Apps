import React, {useCallback} from 'react';
import {useIntl} from 'react-intl';
import CustomDetailsViewMuiModal from '../../../@softbd/modals/CustomDetailsViewMuiModal/CustomDetailsViewMuiModal';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import {Grid} from '@material-ui/core';
import DetailsInputView from '../../../@softbd/elements/display/DetailsInputView/DetailsInputView';
import DecoratedRowStatus from '../../../@softbd/elements/display/DecoratedRowStatus/DecoratedRowStatus';
import IconBatch from '../../../@softbd/icons/IconBatch';
import {getMomentDateFormat} from '../../../@softbd/utilities/helpers';
import {useFetchBatch} from '../../../services/instituteManagement/hooks';

type Props = {
  itemId: number;
  onClose: () => void;
  openEditModal: (id: number) => void;
};

const BatchDetailsPopup = ({itemId, openEditModal, ...props}: Props) => {
  const {messages} = useIntl();
  const {data: itemData, isLoading} = useFetchBatch(itemId);

  const getTrainersName = useCallback((trainers: any = []) => {
    let namesArray = trainers.map((item: Trainer) => item.trainer_name_en);
    return namesArray.join(', ');
  }, []);

  const getConfigs = (config: string | undefined | null) => {
    let text = '';
    try {
      let configJson = JSON.parse(config || '{}');

      Object.keys(configJson || {}).map((key: string) => {
        let value = configJson[key];
        if (value[0]) {
          if (text) text += ', ';
          text +=
            messages['batches.' + key] +
            '(' +
            (value[1]
              ? messages['common.required']
              : messages['common.not_required']) +
            ')';
        }
      });
    } catch (e) {
      console.log('Failed to parse config data', e);
    }
    return text;
  };

  return (
    <>
      <CustomDetailsViewMuiModal
        {...props}
        open={true}
        title={
          <>
            <IconBatch />
            <IntlMessages id='batches.label' />
          </>
        }
        actions={
          <>
            <CancelButton onClick={props.onClose} isLoading={isLoading} />
            <EditButton
              variant={'contained'}
              onClick={() => openEditModal(itemData.id)}
              isLoading={isLoading}
            />
          </>
        }>
        <Grid container spacing={5}>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['institute.label']}
              value={itemData?.institute_title_en}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['branch.label']}
              value={itemData?.branch_title_en}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['programme.label']}
              value={itemData?.programme_title_en}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['training_center.label']}
              value={itemData?.training_center_title_en}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['course.label']}
              value={itemData?.course_title_en}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['batches.total_seat']}
              value={itemData?.number_of_seats}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['batches.available_seat']}
              value={itemData?.available_seats}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['batches.registration_start_date']}
              value={getMomentDateFormat(itemData?.registration_start_date)}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['batches.registration_end_date']}
              value={getMomentDateFormat(itemData?.registration_end_date)}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['batches.start_date']}
              value={getMomentDateFormat(itemData?.batch_start_date)}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['batches.end_date']}
              value={getMomentDateFormat(itemData?.batch_end_date)}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['trainers.label']}
              value={getTrainersName(itemData?.trainers)}
              isLoading={isLoading}
            />
          </Grid>

          <Grid item xs={6}>
            <DetailsInputView
              label={messages['batches.configs']}
              value={getConfigs(itemData?.dynamic_form_field)}
              isLoading={isLoading}
            />
          </Grid>

          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.status']}
              value={<DecoratedRowStatus rowStatus={itemData?.row_status} />}
              isLoading={isLoading}
            />
          </Grid>
        </Grid>
      </CustomDetailsViewMuiModal>
    </>
  );
};

export default BatchDetailsPopup;
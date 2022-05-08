import React from 'react';
import {Grid} from '@mui/material';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import CustomDetailsViewMuiModal from '../../../@softbd/modals/CustomDetailsViewMuiModal/CustomDetailsViewMuiModal';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import DetailsInputView from '../../../@softbd/elements/display/DetailsInputView/DetailsInputView';
import {useIntl} from 'react-intl';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CustomChipRowStatus from '../../../@softbd/elements/display/CustomChipRowStatus/CustomChipRowStatus';
import IconBranch from '../../../@softbd/icons/IconBranch';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import {useFetch4IRCS} from '../../../services/4IRManagement/hooks';

type Props = {
  itemId: number;
  onClose: () => void;
  openEditModal: (id: number) => void;
};

const FourIRCACDetailsPopup = ({itemId, openEditModal, ...props}: Props) => {
  const {messages} = useIntl();
  const {data: itemData, isLoading} = useFetch4IRCS(itemId);

  return (
    <>
      <CustomDetailsViewMuiModal
        open={true}
        {...props}
        title={
          <>
            <IconBranch />
            <IntlMessages id='4ir_cac.add_edit' />
          </>
        }
        maxWidth={isBreakPointUp('xl') ? 'lg' : 'md'}
        actions={
          <>
            <CancelButton onClick={props.onClose} isLoading={isLoading} />
            {itemData && (
              <EditButton
                variant='contained'
                onClick={() => openEditModal(itemData.id)}
                isLoading={isLoading}
              />
            )}
          </>
        }>
        <Grid container spacing={5}>
          title: '', fee: '', hour: '', language_medium: '', //skills: [],
          level: '', program_id: '', target_group: '', objectives: '', overview:
          '', training_methodology: '', evaluation_system: '', prerequisite: '',
          eligibility: '', cover_image: '',
          <Grid item xs={12}>
            <DetailsInputView
              label={messages['common.title']}
              value={itemData?.title}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12}>
            <DetailsInputView
              label={messages['course.fee']}
              value={itemData?.fee}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12}>
            <DetailsInputView
              label={messages['common.hour']}
              value={itemData?.hour}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12}>
            <DetailsInputView
              label={messages['course.language_medium']}
              value={itemData?.language_medium}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12}>
            <DetailsInputView
              label={messages['common.skills']}
              value={(itemData?.skills || [])
                .map((data: any) => data.title)
                .join(', ')}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12}>
            <DetailsInputView
              label={messages['course.course_level']}
              value={itemData?.level}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12}>
            <DetailsInputView
              label={messages['programme.label']}
              value={itemData?.program_id}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12}>
            <DetailsInputView
              label={messages['course_details.target_group']}
              value={itemData?.target_group}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12}>
            <DetailsInputView
              label={messages['course.objectives']}
              value={itemData?.objectives}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12}>
            <DetailsInputView
              label={messages['course.overview']}
              value={itemData?.overview}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12}>
            <DetailsInputView
              label={messages['course_details.training_methodology']}
              value={itemData?.training_methodology}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12}>
            <DetailsInputView
              label={messages['course.evaluation_system']}
              value={itemData?.evaluation_system}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12}>
            <DetailsInputView
              label={messages['course.prerequisite']}
              value={itemData?.prerequisite}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12}>
            <DetailsInputView
              label={messages['course.eligibility']}
              value={itemData?.eligibility}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomChipRowStatus
              label={messages['common.active_status']}
              value={itemData?.row_status}
              isLoading={isLoading}
            />
          </Grid>
        </Grid>
      </CustomDetailsViewMuiModal>
    </>
  );
};

export default FourIRCACDetailsPopup;

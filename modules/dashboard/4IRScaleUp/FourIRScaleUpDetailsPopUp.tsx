import React from 'react';
import {Grid} from '@mui/material';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import CustomDetailsViewMuiModal from '../../../@softbd/modals/CustomDetailsViewMuiModal/CustomDetailsViewMuiModal';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import DetailsInputView from '../../../@softbd/elements/display/DetailsInputView/DetailsInputView';
import {useIntl} from 'react-intl';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import IconBranch from '../../../@softbd/icons/IconBranch';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import {useFetch4IRScaleUp} from '../../../services/4IRManagement/hooks';
import CustomChipRowStatus from '../../../@softbd/elements/display/CustomChipRowStatus/CustomChipRowStatus';
import Link from 'next/link';
import CommonButton from '../../../@softbd/elements/button/CommonButton/CommonButton';
import {FiUser} from 'react-icons/fi';

type Props = {
  itemId: number;
  onClose: () => void;
  fourIRInitiativeId: number;
  openEditModal: (id: number) => void;
};

const FourIRScaleUpDetailsPopUp = ({
  itemId,
  openEditModal,
  fourIRInitiativeId,
  ...props
}: Props) => {
  const {messages} = useIntl();
  const {data: itemData, isLoading} = useFetch4IRScaleUp(itemId);

  //     {
  //   data: {
  //     id: 1,
  //     project_advancement: ' Project Advancement',
  //     project_budget: 100000,
  //     previous_budget: 1000000,
  //     project_details: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
  //     scale_up: 'true',
  //   },
  //   isLoading: false,
  // };

  // useFetch4IRScaleUp(itemId);

  return (
    <>
      <CustomDetailsViewMuiModal
        open={true}
        {...props}
        title={
          <>
            <IconBranch />
            <IntlMessages id='4ir.scale_up' />
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
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['project.name']}
              value={itemData?.project_name}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['initiative.budget']}
              value={itemData?.budget}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['4ir.scaleup_implement_timeline']}
              value={itemData?.implement_timeline}
              isLoading={isLoading}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.start_date']}
              value={itemData?.start_date}
              isLoading={isLoading}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.end_date']}
              value={itemData?.end_date}
              isLoading={isLoading}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['4ir.scaleup_beneficiary_target']}
              value={itemData?.beneficiary_target}
              isLoading={isLoading}
            />
          </Grid>

          <Grid item xs={12}>
            <CustomChipRowStatus
              label={messages['4ir.scaleup_number_of_beneficiary']}
              value={itemData?.number_of_beneficiary}
              isLoading={isLoading}
            />
          </Grid>

          {/* // todo: file path should be added */}
          <Grid item xs={12} md={6}>
            <Link href={`/`}>
              <CommonButton
                btnText='common.download'
                startIcon={<FiUser style={{marginLeft: '5px'}} />}
                variant={'text'}
              />
            </Link>
          </Grid>

          <Grid item xs={12} md={12}>
            <DetailsInputView
              label={messages['4ir.scaleup_implement_area']}
              value={itemData?.implement_area}
              isLoading={isLoading}
            />
          </Grid>

          <Grid item xs={12}>
            <CustomChipRowStatus
              label={messages['common.approval_status']}
              value={itemData?.approval_status}
              isLoading={isLoading}
            />
          </Grid>

          {itemData?.approval_status && (
            <Grid item xs={12} md={6}>
              <DetailsInputView
                label={messages['4ir_cs.approved_by']}
                value={itemData?.approve_by}
                isLoading={isLoading}
              />
            </Grid>
          )}

          <Grid item xs={12}>
            <CustomChipRowStatus
              label={messages['4ir.scaleup_document_approved_by']}
              value={itemData?.['documents_approval-status']}
              isLoading={isLoading}
            />
          </Grid>
        </Grid>
      </CustomDetailsViewMuiModal>
    </>
  );
};

export default FourIRScaleUpDetailsPopUp;

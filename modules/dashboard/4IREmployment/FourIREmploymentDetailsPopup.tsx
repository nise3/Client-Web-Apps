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
import {useFetchEmployment} from '../../../services/4IRManagement/hooks';

type Props = {
  itemId: number;
  onClose: () => void;
  openEditModal: (id: number) => void;
};

const FourIREmploymentDetailsPopup = ({
  itemId,
  openEditModal,
  ...props
}: Props) => {
  const {messages} = useIntl();
  const {data: itemData, isLoading} = useFetchEmployment(itemId);

  return (
    <>
      <CustomDetailsViewMuiModal
        open={true}
        {...props}
        title={
          <>
            <IconBranch />
            <IntlMessages id='4ir_cs.label' />
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
              label={messages['4ir.employment_status']}
              value={
                itemData?.employment_status == 1
                  ? 'Self Employed'
                  : itemData?.employment_status == 2
                  ? 'Employed'
                  : 'Not Applicable'
              }
              isLoading={isLoading}
            />
          </Grid>

          {itemData?.employment_status == 2 && (
            <>
              <Grid item xs={12} md={6}>
                <DetailsInputView
                  label={messages['common.name']}
                  value={itemData?.name}
                  isLoading={isLoading}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DetailsInputView
                  label={messages['common.name_en']}
                  value={itemData?.name_en}
                  isLoading={isLoading}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DetailsInputView
                  label={messages['common.contact_number']}
                  value={itemData?.contact_number}
                  isLoading={isLoading}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DetailsInputView
                  label={messages['common.email']}
                  value={itemData?.email}
                  isLoading={isLoading}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DetailsInputView
                  label={messages['common.industry_name']}
                  value={itemData?.industry_name}
                  isLoading={isLoading}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DetailsInputView
                  label={messages['common.industry_name_en']}
                  value={itemData?.industry_name_en}
                  isLoading={isLoading}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <DetailsInputView
                  label={messages['common.designation']}
                  value={itemData?.designation}
                  isLoading={isLoading}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <DetailsInputView
                  label={messages['common.starting_salary']}
                  value={itemData?.starting_salary}
                  isLoading={isLoading}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DetailsInputView
                  label={messages['common.job_starting_date']}
                  value={itemData?.job_starting_date}
                  isLoading={isLoading}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DetailsInputView
                  label={messages['common.job_medium']}
                  value={itemData?.medium_of_job}
                  isLoading={isLoading}
                />
              </Grid>
            </>
          )}
        </Grid>
      </CustomDetailsViewMuiModal>
    </>
  );
};

export default FourIREmploymentDetailsPopup;

import React from 'react';
import {Grid} from '@mui/material';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import CustomDetailsViewMuiModal from '../../../@softbd/modals/CustomDetailsViewMuiModal/CustomDetailsViewMuiModal';
import DetailsInputView from '../../../@softbd/elements/display/DetailsInputView/DetailsInputView';
import {useIntl} from 'react-intl';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CustomChipRowStatus from '../../../@softbd/elements/display/CustomChipRowStatus/CustomChipRowStatus';
import IconUser from '../../../@softbd/icons/IconUser';
import {useFetchApplicationDetails} from '../../../services/instituteManagement/hooks';
import AssignBatchButton from './AssignBatchButton';
import {FiUser} from 'react-icons/fi';

type Props = {
  itemId: number;
  onClose: () => void;
};

const ApplicationDetailsPopup = ({itemId, ...props}: Props) => {
  const {messages} = useIntl();
  const {data: itemData, isLoading} = useFetchApplicationDetails(itemId);
  const startIcon = <FiUser style={{marginLeft: '5px'}} />;

  const setGenderTitle = (genderNumber: number) => {
    switch (genderNumber) {
      case 1:
        return messages['common.male'];
      case 2:
        return messages['common.female'];
      case 3:
        return messages['common.others'];
      default:
        return messages['common.notDefined'];
    }
  };

  const setPaymentTitle = (paymentNumber: number) => {
    switch (paymentNumber) {
      case 0:
        return messages['common.unpaid'];
      case 1:
        return messages['common.paid'];
      default:
        return messages['common.notDefined'];
    }
  };

  const setReligionTitle = (religionNumber: number) => {
    switch (religionNumber) {
      case 1:
        return messages['common.religion_islam'];
      case 2:
        return messages['common.religion_hinduism'];
      case 3:
        return messages['common.religion_christianity'];
      case 4:
        return messages['common.religion_buddhism'];
      case 5:
        return messages['common.religion_judaism'];
      case 6:
        return messages['common.religion_sikhism'];
      case 7:
        return messages['common.religion_ethnic'];
      case 8:
        return messages['common.religion_atheist'];
      default:
        return messages['common.notDefined'];
    }
  };

  const setMaritalStatusTitle = (MaritalNumber: number) => {
    switch (MaritalNumber) {
      case 1:
        return messages['common.marital_status_single'];
      case 2:
        return messages['common.marital_status_married'];
      case 3:
        return messages['common.marital_status_widowed'];
      case 4:
        return messages['common.marital_status_divorced'];
      default:
        return messages['common.notDefined'];
    }
  };

  const setFreedomFighterStatusTitle = (MaritalNumber: number) => {
    switch (MaritalNumber) {
      case 1:
        return messages['common.no'];
      case 2:
        return messages['common.yes'];
      case 3:
        return messages['freedom_fighter_status.child'];
      case 4:
        return messages['freedom_fighter_status.grand_child'];
      default:
        return messages['common.notDefined'];
    }
  };

  return (
    <>
      <CustomDetailsViewMuiModal
        open={true}
        {...props}
        title={
          <>
            <IconUser />
            <IntlMessages id='applicationManagement.details' />
          </>
        }
        maxWidth={'xl'}
        actions={
          <>
            <CancelButton onClick={props.onClose} isLoading={isLoading} />
          </>
        }>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            {/*<DatatableButtonGroup>*/}
            <AssignBatchButton
              onClick={() => console.log('pass trainee id, and show the cv')}
              btnText='applicationManagement.viewCV'
              startIcon={startIcon}
            />
            {/*</DatatableButtonGroup>*/}
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['programme.label']}
              value={itemData?.program_title}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['programme.label_en']}
              value={itemData?.program_title_en}
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
              label={messages['course.label_en']}
              value={itemData?.course_title}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['training_center.label']}
              value={itemData?.training_center_title}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['training_center.label_en']}
              value={itemData?.training_center_title_en}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['applicationManagement.assignedBatch']}
              value={itemData?.batch_id}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.paymentStatus']}
              value={setPaymentTitle(itemData?.payment_status)}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.first_name_bn']}
              value={itemData?.first_name}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.first_name_en']}
              value={itemData?.first_name_en}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.last_name_bn']}
              value={itemData?.last_name}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.last_name_en']}
              value={itemData?.last_name_en}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.gender']}
              value={setGenderTitle(itemData?.gender)}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.date_of_birth']}
              value={itemData?.date_of_birth}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.email']}
              value={itemData?.email}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['youth.mobile']}
              value={itemData?.mobile}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.identity_number_type']}
              value={itemData?.identity_number_type}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.identity_number']}
              value={itemData?.identity_number}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.religion']}
              value={setReligionTitle(itemData?.religion)}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.marital_status']}
              value={setMaritalStatusTitle(itemData?.marital_status)}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.nationality']}
              value={itemData?.nationality}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.physical_disability']}
              value={
                itemData?.physical_disability_status === 1
                  ? messages['common.yes']
                  : messages['common.no']
              }
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.freedom_fighter_status']}
              value={setFreedomFighterStatusTitle(
                itemData?.freedom_fighter_status,
              )}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.educations']}
              value={itemData?.educations}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.addresses']}
              value={itemData?.addresses}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
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

export default ApplicationDetailsPopup;

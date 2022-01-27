import React, {FC} from 'react';
import IconGallery from '../../../@softbd/icons/IconGallery';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import VacancyApproveButton from './VacancyApproveButton';
import {useIntl} from 'react-intl';
import {useFetchHrDemand} from '../../../services/instituteManagement/hooks';
import {updateHrDemand} from '../../../services/instituteManagement/HrDemandService';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';

interface HumanResourceDemandMangePopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

const HumanResourceDemandMangePopup: FC<HumanResourceDemandMangePopupProps> = ({
  itemId,
  refreshDataTable,
  onClose,
}) => {
  const {messages} = useIntl();
  const {updateSuccessMessage} = useSuccessMessage();
  const {data: itemData} = useFetchHrDemand(itemId);
  const onApproveClick = async () => {
    try {
      let submitData = {
        vacancy_provided_by_institute: itemData?.vacancy,
      };
      await updateHrDemand(itemId, submitData);
      updateSuccessMessage('hr_demand.label');
      refreshDataTable();
    } catch (error) {
      console.log('error: ', error);
    }
  };
  return (
    <HookFormMuiModal
      open={true}
      title={
        <>
          <IconGallery />

          <IntlMessages
            id='common.manage'
            values={{subject: <IntlMessages id='hr_demand.label' />}}
          />
        </>
      }
      onClose={onClose}
      actions={
        <>
          <CancelButton onClick={onClose} />
          <VacancyApproveButton
            label={messages['common.approve'] as string}
            onClick={onApproveClick}
          />
        </>
      }>
      <div>Manage</div>
    </HookFormMuiModal>
  );
};

export default HumanResourceDemandMangePopup;

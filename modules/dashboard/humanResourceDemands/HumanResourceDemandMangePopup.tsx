import React, {FC} from 'react';
import IconGallery from '../../../@softbd/icons/IconGallery';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
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
          <SubmitButton />
        </>
      }>
      <div>Manage</div>
    </HookFormMuiModal>
  );
};

export default HumanResourceDemandMangePopup;

import React from "react";
import { Grid } from "@mui/material";
import CancelButton from "../../../@softbd/elements/button/CancelButton/CancelButton";
import CustomDetailsViewMuiModal from "../../../@softbd/modals/CustomDetailsViewMuiModal/CustomDetailsViewMuiModal";
import EditButton from "../../../@softbd/elements/button/EditButton/EditButton";
import DetailsInputView from "../../../@softbd/elements/display/DetailsInputView/DetailsInputView";
import { useIntl } from "react-intl";
import IntlMessages from "../../../@crema/utility/IntlMessages";
import { isBreakPointUp } from "../../../@crema/utility/Utils";
import { useFetchSubject } from "../../../services/CertificateAuthorityManagement/hooks";
import IconCourse from "../../../@softbd/icons/IconCourse";

type Props = {
  itemId: number;
  onClose: () => void;
  openEditModal: (id: number) => void;
};

const SubjectDetailsPopup = ({itemId, openEditModal, ...props}: Props) => {
  const {messages} = useIntl();
  const {data: itemData, isLoading} = useFetchSubject(itemId);

  return (
    <>
      <CustomDetailsViewMuiModal
        open={true}
        {...props}
        title={
          <>
            <IconCourse />
            <IntlMessages id='subject.label' />
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
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['subject.title']}
              value={itemData?.title}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['subject.title_en']}
              value={itemData?.title_en}
              isLoading={isLoading}
            />
          </Grid>
        </Grid>
      </CustomDetailsViewMuiModal>
    </>
  );
};

export default SubjectDetailsPopup;

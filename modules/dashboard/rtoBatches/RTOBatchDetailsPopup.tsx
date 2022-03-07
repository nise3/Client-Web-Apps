import React from "react";
import { Grid } from "@mui/material";
import CancelButton from "../../../@softbd/elements/button/CancelButton/CancelButton";
import CustomDetailsViewMuiModal from "../../../@softbd/modals/CustomDetailsViewMuiModal/CustomDetailsViewMuiModal";
import { useIntl } from "react-intl";
import IntlMessages from "../../../@crema/utility/IntlMessages";
import IconFAQ from "../../../@softbd/icons/IconFAQ";
import DetailsInputView from "../../../@softbd/elements/display/DetailsInputView/DetailsInputView";
import { isBreakPointUp } from "../../../@crema/utility/Utils";
import EditButton from "../../../@softbd/elements/button/EditButton/EditButton";
import { useFetchRTOBatch } from "../../../services/CertificateAuthorityManagement/hooks";

type Props = {
  itemId: number;
  onClose: () => void;
  openEditModal: (id: number) => void;
};

const RTOBatchDetailsPopup = ({ itemId, openEditModal, ...props }: Props) => {
  const { messages } = useIntl();

  const { data: itemData, isLoading } = useFetchRTOBatch(itemId);


  /*const getQuestionTypeTitle = (typeID: any) => {
    switch (typeID) {
      case parseInt(QuestionType.MCQ):
        return messages["question.type.mcq"];
      case parseInt(QuestionType.YES_NO):
        return messages["question.type.y_n"];
    }
  };

  const getDifficultyLevelTitle = (typeID: any) => {
    switch (typeID) {
      case LEVEL.BEGINNER:
        return messages["level.easy"];
      case LEVEL.INTERMEDIATE:
        return messages["level.intermediate"];
      case LEVEL.EXPERT:
        return messages["level.hard"];
      default:
        return messages["level.easy"];
    }
  };*/


  return (
    <>
      <CustomDetailsViewMuiModal
        {...props}
        open={true}
        title={
          <>
            <IconFAQ />
            <IntlMessages id="rto_batch.label" />
          </>
        }
        maxWidth={isBreakPointUp("xl") ? "lg" : "md"}
        actions={
          <>
            <CancelButton onClick={props.onClose} isLoading={false} />
            <EditButton
              variant={"contained"}
              onClick={() => openEditModal(itemData?.id)}
              isLoading={isLoading}

            />
          </>
        }>

        <Grid container spacing={5}>
          <Grid item xs={6}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <DetailsInputView
                  label={messages["common.title"]}
                  value={itemData?.title}
                  isLoading={isLoading}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={6}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <DetailsInputView
                  label={messages["common.title_en"]}
                  value={itemData?.title_en}
                  isLoading={isLoading}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={6}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <DetailsInputView
                  label={messages["institute.label"]}
                  value={itemData?.institute_id}
                  isLoading={isLoading}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={6}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <DetailsInputView
                  label={messages["rpl_sector.label"]}
                  value={itemData?.rpl_sector_id}
                  isLoading={isLoading}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={6}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <DetailsInputView
                  label={messages["rpl_occupation.label"]}
                  value={itemData?.rpl_occupation_id}
                  isLoading={isLoading}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={6}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <DetailsInputView
                  label={messages["rpl_level.label"]}
                  value={itemData?.rpl_level_id}
                  isLoading={isLoading}
                />
              </Grid>
            </Grid>
          </Grid>


        </Grid>
      </CustomDetailsViewMuiModal>
    </>
  );
};
export default RTOBatchDetailsPopup;

import React from "react";
import { Grid } from "@mui/material";
import CancelButton from "../../../@softbd/elements/button/CancelButton/CancelButton";
import CustomDetailsViewMuiModal from "../../../@softbd/modals/CustomDetailsViewMuiModal/CustomDetailsViewMuiModal";
import DetailsInputView from "../../../@softbd/elements/display/DetailsInputView/DetailsInputView";
import { useIntl } from "react-intl";
import IntlMessages from "../../../@crema/utility/IntlMessages";
import { useFetchAssessmentDetails } from "../../../services/instituteManagement/hooks";
import CommonButton from "../../../@softbd/elements/button/CommonButton/CommonButton";
import { FiUser } from "react-icons/fi";
import { useRouter } from "next/router";
import Link from "next/link";
import { isBreakPointUp } from "../../../@crema/utility/Utils";
import IconCourse from "../../../@softbd/icons/IconCourse";

type Props = {
  itemId: number;
  onClose: () => void;
};

const AssessmentDetailsPopup = ({itemId, ...props}: Props) => {
  const {messages} = useIntl();
  const {data: itemData, isLoading} = useFetchAssessmentDetails(itemId);

  const router = useRouter();
  const path = router.pathname;

  return (
    <>
      <CustomDetailsViewMuiModal
        open={true}
        {...props}
        title={
          <>
            <IconCourse />
            <IntlMessages id='applicationManagement.details' />
          </>
        }
        maxWidth={isBreakPointUp('xl') ? 'lg' : 'md'}
        actions={
          <>
            <CancelButton onClick={props.onClose} isLoading={isLoading} />
          </>
        }>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Link
              href={`${path}/youth-cv/${itemData?.youth_id}`}
              passHref={true}>
              <CommonButton
                btnText='common.see_cv'
                startIcon={<FiUser style={{marginLeft: '5px'}} />}
                style={{marginTop: '10px'}}
              />
            </Link>
          </Grid>


          <Grid item xs={6}>
            <DetailsInputView
              label={messages['rpl_occupation.label']}
              value={itemData?.rpl_occupation_title}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['rpl_level.label']}
              value={itemData?.rpl_level_title}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['rpl_sector.label']}
              value={itemData?.rpl_sector_title}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['rto_country.label']}
              value={itemData?.rto_country_title}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['assessmentManagement.target_country']}
              value={itemData?.target_country_title}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['rto.label']}
              value={itemData?.rto_title}
              isLoading={isLoading}
            />
          </Grid>


        </Grid>
      </CustomDetailsViewMuiModal>
    </>
  );
};

export default AssessmentDetailsPopup;

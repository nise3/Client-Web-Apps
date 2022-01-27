import {useIntl} from 'react-intl';
import {useFetchHrDemandDetails} from '../../../services/IndustryManagement/hooks';
import CustomDetailsViewMuiModal from '../../../@softbd/modals/CustomDetailsViewMuiModal/CustomDetailsViewMuiModal';
import IconList from '../../../@softbd/icons/IconList';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {Grid} from '@mui/material';
import DetailsInputView from '../../../@softbd/elements/display/DetailsInputView/DetailsInputView';
import React, {useEffect, useState} from 'react';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';

type Props = {
  itemId: number;
  onClose: () => void;
  onApprove: (id: any) => void;
};

const JobRequirementDetailsPopup = ({itemId, ...props}: Props) => {
  const {messages} = useIntl();
  const [instituteTitles, setInstituteTitles] = useState<Array<string>>([]);

  const {data: itemData, isLoading} = useFetchHrDemandDetails(itemId);

  useEffect(() => {
    let institutes: Array<any> = [];
    itemData?.hr_demand_institutes.forEach((institute: any) => {
      institutes.push(institute.institute_title);
      institutes.push(' ');
    });
    setInstituteTitles(institutes);
  }, []);

  return (
    <>
      <CustomDetailsViewMuiModal
        open={true}
        {...props}
        title={
          <>
            <IconList />
            <IntlMessages id='common.human_resource' />
          </>
        }
        maxWidth={'md'}
        actions={
          <CancelButton onClick={props.onClose} isLoading={isLoading} />
        }>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.industry_name']}
              value={itemData?.organization_title}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.institute_name']}
              value={instituteTitles}
              isLoading={isLoading}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.skills']}
              value={itemData?.skill_title}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.no_of_vacancy']}
              value={itemData?.vacancy}
              isLoading={isLoading}
            />
          </Grid>
        </Grid>
      </CustomDetailsViewMuiModal>
    </>
  );
};

export default JobRequirementDetailsPopup;

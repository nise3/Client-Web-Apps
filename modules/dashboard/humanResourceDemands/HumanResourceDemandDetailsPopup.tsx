import {useIntl} from 'react-intl';
import CustomDetailsViewMuiModal from '../../../@softbd/modals/CustomDetailsViewMuiModal/CustomDetailsViewMuiModal';
import IconList from '../../../@softbd/icons/IconList';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {Grid} from '@mui/material';
import DetailsInputView from '../../../@softbd/elements/display/DetailsInputView/DetailsInputView';
import React, {useEffect, useState} from 'react';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import {useFetchHrDemand} from '../../../services/instituteManagement/hooks';

type Props = {
  itemId: number;
  onClose: () => void;
};

const HumanResourceDemandDetailsPopup = ({itemId, ...props}: Props) => {
  const {messages} = useIntl();
  const [mandatorySkills, setMandatorySkills] = useState<Array<string>>([]);
  const [optionalSkills, setOptionalSkills] = useState<Array<string>>([]);

  const {data: itemData, isLoading} = useFetchHrDemand(itemId);
  useEffect(() => {
    let mandatorySkills: Array<any> = [];
    if (itemData && itemData?.hr_demand?.mandatory_skills?.length > 0) {
      itemData?.hr_demand?.mandatory_skills?.forEach((skill: any) => {
        mandatorySkills.push(
          <div
            dangerouslySetInnerHTML={{
              __html: `<Chip>${skill?.title}</Chip>`,
            }}
          />,
        );
      });
    }

    setMandatorySkills(mandatorySkills);

    let optionalSkills: Array<any> = [];
    if (itemData && itemData?.hr_demand?.optional_skills?.length > 0) {
      itemData?.hr_demand?.optional_skills?.forEach((skill: any) => {
        optionalSkills.push(
          <div
            dangerouslySetInnerHTML={{
              __html: `<Chip>${skill?.title}</Chip>`,
            }}
          />,
        );
      });
    }

    setOptionalSkills(optionalSkills);
  }, [itemData]);

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
        maxWidth={isBreakPointUp('xl') ? 'lg' : 'md'}
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
              label={messages['common.mandatory_skills']}
              value={mandatorySkills}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.optional_skills']}
              value={optionalSkills}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.no_of_vacancy']}
              value={itemData?.hr_demand?.vacancy}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.requirements']}
              value={itemData?.hr_demand?.requirement}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.requirements_en']}
              value={itemData?.hr_demand?.requirement_en}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.designation']}
              value={itemData?.hr_demand?.designation}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.designation_en']}
              value={itemData?.hr_demand?.designation_en}
              isLoading={isLoading}
            />
          </Grid>
        </Grid>
      </CustomDetailsViewMuiModal>
    </>
  );
};

export default HumanResourceDemandDetailsPopup;

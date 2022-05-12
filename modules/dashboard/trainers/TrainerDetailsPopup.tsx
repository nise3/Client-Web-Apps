import React from 'react';
import {Grid} from '@mui/material';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import CustomDetailsViewMuiModal from '../../../@softbd/modals/CustomDetailsViewMuiModal/CustomDetailsViewMuiModal';
//import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import DetailsInputView from '../../../@softbd/elements/display/DetailsInputView/DetailsInputView';
import {useIntl} from 'react-intl';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import DecoratedRowStatus from '../../../@softbd/elements/display/DecoratedRowStatus/DecoratedRowStatus';
import IconTrainer from '../../../@softbd/icons/IconTrainer';
import {useFetchTrainer} from '../../../services/instituteManagement/hooks';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import {Gender} from '../../industry/enrollment/constants/GenderEnums';

type Props = {
  itemId: number;
  onClose: () => void;
  openEditModal: (id: number) => void;
};

const TrainerDetailsPopup = ({itemId, openEditModal, ...props}: Props) => {
  const {data: itemData, isLoading} = useFetchTrainer(itemId);
  const {messages} = useIntl();

  const genders = [
    {
      key: Gender.MALE,
      label: messages['common.male'],
    },
    {
      key: Gender.FEMALE,
      label: messages['common.female'],
    },
    {
      key: Gender.OTHERS,
      label: messages['common.others'],
    },
  ];

  const marital_status = [
    {
      key: 0,
      label: messages['common.unmarried'],
    },
    {
      key: 1,
      label: messages['common.marital_status_married'],
    },
  ];

  const religions = [
    {
      id: 1,
      label: messages['common.religion_islam'],
    },
    {
      id: 2,
      label: messages['common.religion_hinduism'],
    },
    {
      id: 3,
      label: messages['common.religion_christianity'],
    },
    {
      id: 4,
      label: messages['common.religion_buddhism'],
    },
    {
      id: 5,
      label: messages['common.notDefined'],
    },
  ];

  return (
    <>
      <CustomDetailsViewMuiModal
        open={true}
        {...props}
        title={
          <>
            <IconTrainer />
            <IntlMessages id='trainers.label' />
          </>
        }
        maxWidth={isBreakPointUp('xl') ? 'lg' : 'md'}
        actions={
          <>
            <CancelButton onClick={props.onClose} isLoading={isLoading} />
            {/*  <EditButton
              onClick={() => openEditModal(itemData.id)}
              isLoading={isLoading}
            />*/}
          </>
        }>
        <Grid container spacing={5}>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.title_en']}
              value={itemData?.trainer_name_en}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.title']}
              value={itemData?.trainer_name}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.subject']}
              value={itemData?.subject}
              isLoading={isLoading}
            />
          </Grid>{' '}
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.subject_en']}
              value={itemData?.subject_en}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.about_me']}
              value={itemData?.about_me}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['branch.label']}
              value={itemData?.branch_title}
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
              label={messages['common.district_title_permanent_address']}
              value={itemData?.district_title_permanent_address}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.district_title_present_address']}
              value={itemData?.district_title_present_address}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.division_title_permanent_address']}
              value={itemData?.division_title_permanent_address}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.division_title_present_address']}
              value={itemData?.division_title_present_address}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.upazila_title_permanent_address']}
              value={itemData?.upazila_title_permanent_address}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.upazila_title_present_address']}
              value={itemData?.upazila_title_present_address}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.educational_qualification']}
              value={itemData?.educational_qualification}
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
              label={messages['common.mobile']}
              value={itemData?.mobile}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.gender']}
              value={genders[itemData?.gender - 1]?.label}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['institute.label']}
              value={(itemData?.institutes || [])
                .map((institute: any) => institute.title)
                .join(', ')}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.marital_status']}
              value={marital_status[itemData?.marital_status - 1]?.label}
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
              label={messages['common.nid']}
              value={itemData?.nid}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.passport_number']}
              value={itemData?.passport_number}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.permanent_house_address']}
              value={itemData?.permanent_house_address}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.present_house_address']}
              value={itemData?.present_house_address}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.religion']}
              value={religions[itemData?.religion - 1]?.label}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['menu.skill']}
              value={(itemData?.skills || [])
                .map((skill: any) => skill.title)
                .join(', ')}
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
              label={messages['common.status']}
              value={<DecoratedRowStatus rowStatus={itemData?.row_status} />}
              isLoading={isLoading}
            />
          </Grid>
        </Grid>
      </CustomDetailsViewMuiModal>
    </>
  );
};
export default TrainerDetailsPopup;

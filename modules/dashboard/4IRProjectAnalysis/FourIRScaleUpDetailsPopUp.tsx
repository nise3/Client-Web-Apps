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
import {useFetch4IRInitiativeAnalysis} from '../../../services/4IRManagement/hooks';
import CustomChipRowStatus from '../../../@softbd/elements/display/CustomChipRowStatus/CustomChipRowStatus';
import CardMediaImageView from '../../../@softbd/elements/display/ImageView/CardMediaImageView';
import {FiUser} from 'react-icons/fi';
import CommonButton from '../../../@softbd/elements/button/CommonButton/CommonButton';
import Link from 'next/link';

type Props = {
  itemId: number;
  onClose: () => void;
  openEditModal: (id: number) => void;
};

const FourIRScaleUpDetailsPopUp = ({
  itemId,
  openEditModal,
  ...props
}: Props) => {
  const {messages} = useIntl();
  const {data: itemData, isLoading} = useFetch4IRInitiativeAnalysis(itemId);
  //
  //     {
  //   data: {
  //     id: 1,
  //     project_advancement: ' Project Advancement',
  //     project_budget: 100000,
  //     previous_budget: 1000000,
  //     project_details: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
  //     scale_up: 'true',
  //   },
  //   isLoading: false,
  // };

  // useFetch4IRScaleUp(itemId);

  console.log(itemData);

  return (
    <>
      <CustomDetailsViewMuiModal
        open={true}
        {...props}
        title={
          <>
            <IconBranch />
            <IntlMessages id='4ir_initiative_analysis.label' />
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
              label={messages['4ir.researcher_name']}
              value={itemData?.researcher_name}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.organization_name']}
              value={itemData?.organization_name}
              isLoading={isLoading}
            />
          </Grid>

          {/* // todo: file path should be added */}
          <Grid item xs={12} md={6}>
            <Link href={`/`}>
              <CommonButton
                btnText='common.download'
                startIcon={<FiUser style={{marginLeft: '5px'}} />}
                variant={'text'}
              />
            </Link>
          </Grid>

          {/* // todo: file path should be added */}
          <Grid item xs={12} md={6}>
            <Link href={`/`}>
              <CommonButton
                btnText='common.download'
                startIcon={<FiUser style={{marginLeft: '5px'}} />}
                variant={'text'}
              />
            </Link>
          </Grid>

          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['4ir.research_method']}
              value={itemData?.research_method}
              isLoading={isLoading}
            />
          </Grid>

          <Grid item xs={12}>
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

export default FourIRScaleUpDetailsPopUp;

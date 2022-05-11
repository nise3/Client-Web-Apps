import React from 'react';
import {Grid, Typography} from '@mui/material';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import CustomDetailsViewMuiModal from '../../../@softbd/modals/CustomDetailsViewMuiModal/CustomDetailsViewMuiModal';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import DetailsInputView from '../../../@softbd/elements/display/DetailsInputView/DetailsInputView';
import {useIntl} from 'react-intl';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CustomChipRowStatus from '../../../@softbd/elements/display/CustomChipRowStatus/CustomChipRowStatus';
import IconBranch from '../../../@softbd/icons/IconBranch';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import ImageView from '../../../@softbd/elements/display/ImageView/ImageView';
import {useFetch4IRCBLM} from '../../../services/4IRManagement/hooks';

type Props = {
  itemId: number;
  onClose: () => void;
  openEditModal: (id: number) => void;
};

const FourIRCBLMDetailsPopUp = ({itemId, openEditModal, ...props}: Props) => {
  const {messages} = useIntl();
  const {data: itemData, isLoading} = useFetch4IRCBLM(itemId);

  return (
    <>
      <CustomDetailsViewMuiModal
        open={true}
        {...props}
        title={
          <>
            <IconBranch />
            <IntlMessages id='4ir.CBLM' />
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
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={12} md={12}>
                <fieldset>
                  <legend>
                    <Typography variant={'body2'}>
                      {messages['level.experts_list']}
                    </Typography>
                  </legend>

                  {itemData?.experts?.length > 0 &&
                    itemData?.experts?.map((expert: any) => {
                      return (
                        <Grid container spacing={5} key={expert?.id} mb={5}>
                          <Grid item xs={12} md={6}>
                            <DetailsInputView
                              label={messages['common.name']}
                              value={expert?.name}
                              isLoading={isLoading}
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <DetailsInputView
                              label={messages['common.designation']}
                              value={expert?.designation}
                              isLoading={isLoading}
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <DetailsInputView
                              label={messages['common.organization']}
                              value={expert?.organization}
                              isLoading={isLoading}
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <DetailsInputView
                              label={messages['common.mobile']}
                              value={expert?.mobile}
                              isLoading={isLoading}
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <DetailsInputView
                              label={messages['common.email']}
                              value={expert?.email}
                              isLoading={isLoading}
                            />
                          </Grid>
                        </Grid>
                      );
                    })}
                </fieldset>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['4ir_cs.approved_by']}
              value={itemData?.approved_by}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.developed_organization_name']}
              value={itemData?.developed_organization_name}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.developed_organization_name_en']}
              value={itemData?.developed_organization_name_en}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.supported_organization_name']}
              value={itemData?.supported_organization_name}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.supported_organization_name_en']}
              value={itemData?.supported_organization_name_en}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.sector']}
              value={itemData?.sector_name}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.comment']}
              value={itemData?.comments}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <ImageView
              label={messages['common.file']}
              imageUrl={itemData?.file_path}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomChipRowStatus
              label={messages['common.row_status']}
              value={itemData?.row_status}
              isLoading={isLoading}
            />
          </Grid>
        </Grid>
      </CustomDetailsViewMuiModal>
    </>
  );
};

export default FourIRCBLMDetailsPopUp;

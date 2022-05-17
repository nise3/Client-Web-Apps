import React from 'react';
import {Grid} from '@mui/material';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import CustomDetailsViewMuiModal from '../../../@softbd/modals/CustomDetailsViewMuiModal/CustomDetailsViewMuiModal';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import DetailsInputView from '../../../@softbd/elements/display/DetailsInputView/DetailsInputView';
import {useIntl} from 'react-intl';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CustomChipRowStatus from '../../../@softbd/elements/display/CustomChipRowStatus/CustomChipRowStatus';
import IconBranch from '../../../@softbd/icons/IconBranch';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import {useFetchFourIRToT} from '../../../services/4IRManagement/hooks';
import {FILE_SERVER_FILE_VIEW_ENDPOINT} from '../../../@softbd/common/apiRoutes';
import CommonButton from '../../../@softbd/elements/button/CommonButton/CommonButton';
import DownloadIcon from '@mui/icons-material/Download';
import {Link} from '../../../@softbd/elements/common';

type Props = {
  itemId: number;
  onClose: () => void;
  openEditModal: (id: number) => void;
};

const FourIRToTDetailsPopup = ({itemId, openEditModal, ...props}: Props) => {
  const {messages} = useIntl();
  const {data: itemData, isLoading} = useFetchFourIRToT(itemId);

  return (
    <>
      <CustomDetailsViewMuiModal
        open={true}
        {...props}
        title={
          <>
            <IconBranch />
            <IntlMessages id='4ir_tot.label' />
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
                  <h3 style={{marginTop: '2px', marginBottom: '0'}}>
                    {messages['4ir_tot.master_trainer']}
                  </h3>

                  {itemData?.master_trainers?.length > 0 &&
                    itemData?.master_trainers?.map((master_trainer: any) => {
                      return (
                        <Grid
                          container
                          xs={12}
                          spacing={5}
                          key={master_trainer?.id}
                          mb={5}>
                          <Grid item xs={12} md={6}>
                            <DetailsInputView
                              label={messages['common.name']}
                              value={master_trainer?.name}
                              isLoading={isLoading}
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <DetailsInputView
                              label={messages['common.organization']}
                              value={master_trainer?.organization_name}
                              isLoading={isLoading}
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <DetailsInputView
                              label={messages['common.organization_en']}
                              value={master_trainer?.organization_name_en}
                              isLoading={isLoading}
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <DetailsInputView
                              label={messages['common.designation']}
                              value={master_trainer?.designation}
                              isLoading={isLoading}
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <DetailsInputView
                              label={messages['common.mobile']}
                              value={master_trainer?.mobile}
                              isLoading={isLoading}
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <DetailsInputView
                              label={messages['common.email']}
                              value={master_trainer?.email}
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

          <Grid item xs={12}>
            <h3 style={{marginTop: '2px', marginBottom: '0'}}>
              {messages['4ir_tot.organiser']}
            </h3>
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.name']}
              value={itemData?.organizer_name}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.address']}
              value={itemData?.organizer_address}
              isLoading={isLoading}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.email']}
              value={itemData?.organizer_email}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12}>
            <h3 style={{marginTop: '2px', marginBottom: '0'}}>
              {messages['4ir_tot.co_organiser']}
            </h3>
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.name']}
              value={itemData?.co_organizer_name}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.address']}
              value={itemData?.co_organizer_address}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.email']}
              value={itemData?.co_organizer_email}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6} />
          <Grid item xs={12} md={6} mt={5}>
            <DetailsInputView
              label={messages['4ir.tot_date']}
              value={itemData?.tot_date}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6} />
          <Grid item xs={12} md={6}>
            <Link
              underline='none'
              href={`${
                FILE_SERVER_FILE_VIEW_ENDPOINT + itemData?.proof_of_report_file
              }`}
              download
              target={'_blank'}
              style={{
                display: 'flex',
                justifyContent: 'start',
                marginTop: '2rem',
              }}>
              <CommonButton
                startIcon={<DownloadIcon />}
                key={1}
                onClick={() => console.log('file downloading')}
                btnText={'tot.proof_of_report_file'}
                variant={'outlined'}
                color={'primary'}
              />
            </Link>
          </Grid>
          <Grid item xs={12} md={6}>
            <Link
              underline='none'
              href={`${
                FILE_SERVER_FILE_VIEW_ENDPOINT + itemData?.participants
              }`}
              download
              target={'_blank'}
              style={{
                display: 'flex',
                justifyContent: 'end',
                marginTop: '2rem',
              }}>
              <CommonButton
                startIcon={<DownloadIcon />}
                key={1}
                onClick={() => console.log('file downloading')}
                btnText={'4ir_tot.participants'}
                variant={'outlined'}
                color={'primary'}
              />
            </Link>
          </Grid>

          <Grid item xs={12} md={6}>
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

export default FourIRToTDetailsPopup;

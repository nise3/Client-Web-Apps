import React from 'react';
import { Grid } from '@mui/material';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import CustomDetailsViewMuiModal from '../../../@softbd/modals/CustomDetailsViewMuiModal/CustomDetailsViewMuiModal';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import { useIntl } from 'react-intl';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import IconInstitute from '../../../@softbd/icons/IconInstitute';
import { useFetchFAQ } from '../../../services/instituteManagement/hooks';
import { useFetchCalendarEvent, useFetchCMSGlobalConfig } from '../../../services/cmsManagement/hooks';
import { getLanguageLabel } from '../../../@softbd/utilities/helpers';
import LanguageCodes from '../../../@softbd/utilities/LanguageCodes';
import DetailsInputView from '../../../@softbd/elements/display/DetailsInputView/DetailsInputView';
import ShowInTypes from '../../../@softbd/utilities/ShowInTypes';
import DeleteButton from '../../../@softbd/elements/button/DeleteButton/DeleteButton';
import { deleteEvent } from '../../../services/cmsManagement/EventService';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';

type Props = {
  itemId: number;
  onClose: () => void;
  openEditModal: (id: number) => void;
  refreshDataTable: (events: string, item?:any) => void;
};

const EventCalendarDetailsPopup = ({ itemId, openEditModal, refreshDataTable, ...props }: Props) => {
  const { messages } = useIntl();
  const { data: itemData, isLoading } = useFetchCalendarEvent(itemId);
  const { updateSuccessMessage } = useSuccessMessage();
  const { data: cmsGlobalConfig } = useFetchCMSGlobalConfig();

  const onDelete = async () => {
    // console.log('delete this: ', itemId)
    if (itemId) {
      await deleteEvent(itemId);
      updateSuccessMessage('menu.events');
      props.onClose();
      refreshDataTable('delete', itemId);
      // mutateBranch();
    }
  }
  
  return (
    <>
      <CustomDetailsViewMuiModal
        {...props}
        open={true}
        title={
          <>
            <IconInstitute />
            <IntlMessages id='menu.calendar' />
          </>
        }
        actions={
          <>
            <CancelButton onClick={props.onClose} isLoading={isLoading} />
            <EditButton
              variant={'contained'}
              onClick={() => openEditModal(itemData.id)}
              isLoading={isLoading}
            />
            {
            itemId && <DeleteButton
              deleteAction={onDelete}
              deleteTitle={messages['common.delete_confirm'] as string}
            />
          }
          </>
        }>
        <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
            <DetailsInputView
              label={messages['common.title']}
              value={itemData?.title}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.event_start_date']}
              value={itemData?.start_date}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.event_end_date']}
              value={itemData?.start_date}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.start_time']}
              value={itemData?.start_time}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.end_time']}
              value={itemData?.end_time}
              isLoading={isLoading}
            />
          </Grid>
        </Grid>
        {/* <Grid container spacing={5}>

          <Grid item xs={12} md={12}>
            <fieldset>
              <legend>
                {getLanguageLabel(
                  cmsGlobalConfig?.language_configs,
                  LanguageCodes.BANGLA,
                )}
              </legend>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <DetailsInputView
                    label={messages['faq.question']}
                    value={itemData?.question}
                    isLoading={isLoading}
                  />
                </Grid>
                <Grid item xs={12}>
                  <DetailsInputView
                    label={messages['faq.answer']}
                    value={itemData?.answer}
                    isLoading={isLoading}
                  />
                </Grid>
              </Grid>
            </fieldset>
          </Grid>

          {Object.keys(itemData?.other_language_fields || {}).map(
            (key: string) => (
              <Grid item xs={12} md={12} key={key}>
                <fieldset>
                  <legend>
                    {getLanguageLabel(cmsGlobalConfig?.language_configs, key)}
                  </legend>
                  <Grid container spacing={5}>
                    <Grid item xs={12}>
                      <DetailsInputView
                        label={messages['faq.question']}
                        value={itemData?.other_language_fields[key].question}
                        isLoading={isLoading}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <DetailsInputView
                        label={messages['faq.answer']}
                        value={itemData?.other_language_fields[key].answer}
                        isLoading={isLoading}
                      />
                    </Grid>
                  </Grid>
                </fieldset>
              </Grid>
            ),
          )}
        </Grid> */}
      </CustomDetailsViewMuiModal>
    </>
  );
};
export default EventCalendarDetailsPopup;

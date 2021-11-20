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
  itemData: any;
  // isLoading: boolean;
  // onClose: () => void;
};

const EventCalendarDetails = ({ itemData, ...props }: Props) => {
  const { messages } = useIntl();

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <DetailsInputView
            label={messages['common.title']}
            value={itemData?.title}
          // isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <DetailsInputView
            label={messages['common.event_start_date']}
            value={itemData?.start_date}
          // isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <DetailsInputView
            label={messages['common.event_end_date']}
            value={itemData?.start_date}
          // isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <DetailsInputView
            label={messages['common.start_time']}
            value={itemData?.start_time}
          // isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <DetailsInputView
            label={messages['common.end_time']}
            value={itemData?.end_time}
          // isLoading={isLoading}
          />
        </Grid>
      </Grid>
    </>
  );
};
export default EventCalendarDetails;

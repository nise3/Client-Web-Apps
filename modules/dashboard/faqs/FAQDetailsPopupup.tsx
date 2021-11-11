import React from 'react';
import {Grid} from '@mui/material';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import CustomDetailsViewMuiModal from '../../../@softbd/modals/CustomDetailsViewMuiModal/CustomDetailsViewMuiModal';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import {useIntl} from 'react-intl';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import IconInstitute from '../../../@softbd/icons/IconInstitute';
import {useFetchFAQ} from '../../../services/instituteManagement/hooks';
import {useFetchCMSGlobalConfig} from '../../../services/cmsManagement/hooks';
import {getLanguageLabel} from '../../../@softbd/utilities/helpers';
import LanguageCodes from '../../../@softbd/utilities/LanguageCodes';

type Props = {
  itemId: number;
  onClose: () => void;
  openEditModal: (id: number) => void;
};

const FAQDetailsPopup = ({itemId, openEditModal, ...props}: Props) => {
  const {messages} = useIntl();
  const {data: itemData, isLoading} = useFetchFAQ(itemId);

  const {data: cmsGlobalConfig} = useFetchCMSGlobalConfig();

  return (
    <>
      <CustomDetailsViewMuiModal
        {...props}
        open={true}
        title={
          <>
            <IconInstitute />
            <IntlMessages id='menu.faq' />
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
          </>
        }>
        <h3 style={{textAlign: 'center'}}>{itemData?.show_in_label}</h3>
        <Grid container spacing={5}>
          <Grid item xs={12} md={12}>
            <fieldset>
              <legend>
                {getLanguageLabel(
                  cmsGlobalConfig?.language_configs,
                  LanguageCodes.BANGLA,
                )}
              </legend>
              <p>
                {messages['faq.question']}: <br />
                {itemData?.question}
              </p>
              <p>
                {messages['faq.answer']}: <br />
                {itemData?.answer}
              </p>
            </fieldset>
          </Grid>
          {Object.keys(itemData?.other_language_fields || {}).map(
            (key: string) =>
              itemData?.other_language_fields.hasOwnProperty(key) && (
                <Grid item xs={12} md={12}>
                  <fieldset>
                    {
                      <legend>
                        {getLanguageLabel(
                          cmsGlobalConfig?.language_configs,
                          key,
                        )}
                      </legend>
                    }
                    <p>
                      {messages['faq.question']}: <br />
                      {itemData?.other_language_fields[key].question}
                    </p>
                    <p>
                      {messages['faq.answer']}: <br />
                      {itemData?.other_language_fields[key].answer}
                    </p>
                  </fieldset>
                </Grid>
              ),
          )}
        </Grid>
      </CustomDetailsViewMuiModal>
    </>
  );
};
export default FAQDetailsPopup;

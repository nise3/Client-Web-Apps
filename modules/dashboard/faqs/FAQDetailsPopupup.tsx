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
import DetailsInputView from '../../../@softbd/elements/display/DetailsInputView/DetailsInputView';
import ShowInTypes from '../../../@softbd/utilities/ShowInTypes';

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
        <Grid container spacing={5}>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.show_in']}
              value={itemData?.show_in_label}
              isLoading={isLoading}
            />
          </Grid>

          {itemData?.show_in && itemData.show_in == ShowInTypes.TSP && (
            <Grid item xs={12} md={6}>
              <DetailsInputView
                label={messages['institute.label']}
                value={itemData?.institute_title}
                isLoading={isLoading}
              />
            </Grid>
          )}

          {itemData?.show_in && itemData.show_in == ShowInTypes.INDUSTRY && (
            <Grid item xs={12} md={6}>
              <DetailsInputView
                label={messages['organization.label']}
                value={itemData?.organization_title}
                isLoading={isLoading}
              />
            </Grid>
          )}

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
                    label={messages['faqs.question']}
                    value={itemData?.question}
                    isLoading={isLoading}
                  />
                </Grid>
                <Grid item xs={12}>
                  <DetailsInputView
                    label={messages['faqs.answer']}
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
                        label={messages['faqs.question']}
                        value={itemData?.other_language_fields[key].question}
                        isLoading={isLoading}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <DetailsInputView
                        label={messages['faqs.answer']}
                        value={itemData?.other_language_fields[key].answer}
                        isLoading={isLoading}
                      />
                    </Grid>
                  </Grid>
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

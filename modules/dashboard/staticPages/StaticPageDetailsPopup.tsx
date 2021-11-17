import React, {useEffect, useState} from 'react';
import {Grid} from '@mui/material';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import CustomDetailsViewMuiModal from '../../../@softbd/modals/CustomDetailsViewMuiModal/CustomDetailsViewMuiModal';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import DetailsInputView from '../../../@softbd/elements/display/DetailsInputView/DetailsInputView';
import {useIntl} from 'react-intl';
import {WorkOutline} from '@mui/icons-material';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CustomChipRowStatus from '../../../@softbd/elements/display/CustomChipRowStatus/CustomChipRowStatus';
import {useFetchCMSGlobalConfig} from '../../../services/cmsManagement/hooks';
import {getLanguageLabel} from '../../../@softbd/utilities/helpers';
import LanguageCodes from '../../../@softbd/utilities/LanguageCodes';
import ContentTypes from '../recentActivities/ContentTypes';
import ShowInTypes from '../../../@softbd/utilities/ShowInTypes';
import {getStaticPageOrBlockByPageCode} from '../../../services/cmsManagement/StaticPageService';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import {CommonAuthUser} from '../../../redux/types/models/CommonAuthUser';

type Props = {
  pageCode: string;
  pageType: number;
  onClose: () => void;
  openEditModal: (page: any) => void;
};

const StaticPageDetailsPopup = ({
  pageCode,
  pageType,
  openEditModal,
  ...props
}: Props) => {
  const {messages} = useIntl();
  const authUser = useAuthUser<CommonAuthUser>();
  const {data: cmsGlobalConfig} = useFetchCMSGlobalConfig();
  const [itemData, setItemData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (authUser) {
      (async () => {
        setIsLoading(true);
        try {
          const response = await getStaticPageOrBlockByPageCode(pageCode, {
            show_in: ShowInTypes.NICE3,
          });
          if (response && response.data) setItemData(response.data);
        } catch (e) {}
        setIsLoading(false);
      })();
    }
  }, [authUser]);

  const getContentTypeTitle = (contentType: number) => {
    switch (contentType) {
      case ContentTypes.IMAGE:
        return messages['content_type.image'];
      case ContentTypes.FACEBOOK_SOURCE:
        return messages['content_type.facebook_video'];
      case ContentTypes.YOUTUBE_SOURCE:
        return messages['content_type.youtube_video'];
      default:
        return '';
    }
  };

  return (
    <>
      <CustomDetailsViewMuiModal
        maxWidth={'md'}
        open={true}
        {...props}
        title={
          <>
            <WorkOutline />
            <IntlMessages id='static_page.label' />
          </>
        }
        actions={
          <>
            <CancelButton onClick={props.onClose} isLoading={isLoading} />
            <EditButton
              onClick={() =>
                openEditModal({page_code: pageCode, type: pageType})
              }
              isLoading={isLoading}
            />
          </>
        }>
        <Grid container spacing={5}>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.content_slug_or_id']}
              value={itemData?.content_slug_or_id}
              isLoading={isLoading}
            />
          </Grid>

          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.content_type']}
              value={getContentTypeTitle(itemData?.content_type)}
              isLoading={isLoading}
            />
          </Grid>

          <Grid item xs={12}>
            <fieldset>
              <legend>
                {getLanguageLabel(
                  cmsGlobalConfig?.language_configs,
                  LanguageCodes.BANGLA,
                )}
              </legend>
              <Grid container spacing={5}>
                <Grid item xs={6}>
                  <DetailsInputView
                    label={messages['common.title']}
                    value={itemData?.title}
                    isLoading={isLoading}
                  />
                </Grid>
                <Grid item xs={6}>
                  <DetailsInputView
                    label={messages['common.sub_title']}
                    value={itemData?.sub_title}
                    isLoading={isLoading}
                  />
                </Grid>
                <Grid item xs={12}>
                  <DetailsInputView
                    label={messages['common.content']}
                    value={
                      <div
                        dangerouslySetInnerHTML={{
                          __html: itemData?.contents,
                        }}
                      />
                    }
                    isLoading={isLoading}
                  />
                </Grid>
              </Grid>
            </fieldset>
          </Grid>

          {Object.keys(itemData?.other_language_fields || {}).map(
            (key: string) => (
              <Grid item xs={12} key={key}>
                <fieldset>
                  <legend>
                    {getLanguageLabel(cmsGlobalConfig?.language_configs, key)}
                  </legend>
                  <Grid container spacing={5}>
                    <Grid item xs={6}>
                      <DetailsInputView
                        label={messages['common.title']}
                        value={itemData.other_language_fields[key]?.title}
                        isLoading={isLoading}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <DetailsInputView
                        label={messages['common.sub_title']}
                        value={itemData.other_language_fields[key]?.sub_title}
                        isLoading={isLoading}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <DetailsInputView
                        label={messages['common.content']}
                        value={
                          <div
                            dangerouslySetInnerHTML={{
                              __html:
                                itemData.other_language_fields[key]?.contents,
                            }}
                          />
                        }
                        isLoading={isLoading}
                      />
                    </Grid>
                  </Grid>
                </fieldset>
              </Grid>
            ),
          )}

          <Grid item xs={12}>
            <CustomChipRowStatus
              label={messages['common.status']}
              value={itemData?.row_status}
              isLoading={isLoading}
            />
          </Grid>
        </Grid>
      </CustomDetailsViewMuiModal>
    </>
  );
};
export default StaticPageDetailsPopup;

import React, {useEffect, useState} from 'react';
import {FormControlLabel, Grid, Radio, RadioGroup} from '@mui/material';
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
import ShowInTypes from '../../../@softbd/utilities/ShowInTypes';
import {getStaticPageOrBlockByPageCode} from '../../../services/cmsManagement/StaticPageService';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import {CommonAuthUser} from '../../../redux/types/models/CommonAuthUser';
import StaticPageTypes from './StaticPageTypes';
import PageBlockTemplateTypes from '../../../@softbd/utilities/PageBlockTemplateTypes';
import ContentTypes from '../recentActivities/ContentTypes';
import StaticPageCategoryTypes from '../../../@softbd/utilities/StaticPageCategoryTypes';
import ImageView from '../../../@softbd/elements/display/ImageView/ImageView';
import {isBreakPointUp} from '../../../@crema/utility/Utils';

type Props = {
  pageCode: string;
  pageType: number;
  pageCategory: number;
  onClose: () => void;
  openEditModal: (page: any) => void;
};

const StaticPageDetailsPopup = ({
  pageCode,
  pageType,
  pageCategory,
  openEditModal,
  ...props
}: Props) => {
  const {messages} = useIntl();
  const authUser = useAuthUser<CommonAuthUser>();
  const {data: cmsGlobalConfig} = useFetchCMSGlobalConfig();
  const [itemData, setItemData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showInList, setShowInList] = useState<Array<any>>([]);
  const [showIn, setShowIn] = useState<number | null>(null);

  useEffect(() => {
    if (authUser && authUser?.isSystemUser) {
      switch (pageCategory) {
        case StaticPageCategoryTypes.COMMON:
          setShowIn(ShowInTypes.NICE3);
          break;
        case StaticPageCategoryTypes.NISE3:
          setShowIn(ShowInTypes.NICE3);
          break;
        case StaticPageCategoryTypes.YOUTH:
          setShowIn(ShowInTypes.YOUTH);
          break;
        case StaticPageCategoryTypes.RPL:
          setShowIn(ShowInTypes.RPL);
          break;
        default:
          setShowIn(null);
      }
    }
  }, [pageCategory, authUser]);

  useEffect(() => {
    if (authUser && !authUser?.isSystemUser) {
      (async () => {
        setIsLoading(true);
        const response = await getStaticPageOrBlockByPageCode(pageCode, {});
        if (response && response.data) setItemData(response.data);
        setIsLoading(false);
      })();
    }
  }, [authUser]);

  useEffect(() => {
    if (authUser && showIn) {
      (async () => {
        setIsLoading(true);
        setItemData(null);
        try {
          const params: any = {show_in: showIn};

          const response = await getStaticPageOrBlockByPageCode(
            pageCode,
            params,
          );
          if (response && response.data) setItemData(response.data);
        } catch (e) {}
        setIsLoading(false);
      })();
    }
  }, [authUser, showIn]);

  useEffect(() => {
    if (cmsGlobalConfig) {
      const filteredShowIn = cmsGlobalConfig?.show_in?.filter((item: any) =>
        [ShowInTypes.NICE3, ShowInTypes.YOUTH, ShowInTypes.RPL].includes(
          item.id,
        ),
      );

      setShowInList(filteredShowIn);
    }
  }, [cmsGlobalConfig]);

  const getTemplateCodeTitle = (templateCode: string) => {
    switch (templateCode) {
      case PageBlockTemplateTypes.PBT_LR:
        return messages['page_block.template_code_pbt_lr'];
      case PageBlockTemplateTypes.PBT_RL:
        return messages['page_block.template_code_pbt_rl'];
      case PageBlockTemplateTypes.PBT_SHOW_EDITOR_CONTENT:
        return messages['page_block.template_code_pbt_show_editor_content'];
      default:
        return '';
    }
  };

  const getAttachmentTypeTitle = (attachmentType: number) => {
    switch (attachmentType) {
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
        maxWidth={isBreakPointUp('xl') ? 'lg' : 'md'}
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
                openEditModal({
                  page_code: pageCode,
                  type: pageType,
                  category: pageCategory,
                })
              }
              isLoading={isLoading}
            />
          </>
        }>
        <Grid container spacing={5}>
          {authUser &&
            authUser.isSystemUser &&
            pageCategory == StaticPageCategoryTypes.COMMON && (
              <React.Fragment>
                <Grid item xs={12} md={6}>
                  <RadioGroup
                    row
                    aria-label={'show_in'}
                    value={showIn}
                    onChange={(e) => {
                      setShowIn(Number(e.target.value));
                    }}>
                    {showInList.map((item: any) => (
                      <FormControlLabel
                        key={item.id}
                        value={item.id}
                        control={<Radio />}
                        label={item.title}
                      />
                    ))}
                  </RadioGroup>
                </Grid>
                <Grid item xs={12} md={6} />
              </React.Fragment>
            )}

          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.title']}
              value={itemData?.title}
              isLoading={isLoading}
            />
          </Grid>

          {pageType == StaticPageTypes.PAGE && (
            <Grid item xs={12} md={6}>
              <DetailsInputView
                label={messages['common.sub_title']}
                value={itemData?.sub_title}
                isLoading={isLoading}
              />
            </Grid>
          )}

          {pageType == StaticPageTypes.BLOCK && (
            <React.Fragment>
              <Grid item xs={12} md={6}>
                <DetailsInputView
                  label={messages['static_page.template_code']}
                  value={getTemplateCodeTitle(itemData?.template_code)}
                  isLoading={isLoading}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DetailsInputView
                  label={messages['common.is_attachment_available']}
                  value={
                    itemData?.is_attachment_available == 1
                      ? messages['common.yes']
                      : messages['common.no']
                  }
                  isLoading={isLoading}
                />
              </Grid>

              {itemData?.is_attachment_available == 1 && (
                <React.Fragment>
                  <Grid item xs={12} md={6}>
                    <DetailsInputView
                      label={messages['common.attachment_type']}
                      value={getAttachmentTypeTitle(itemData?.attachment_type)}
                      isLoading={isLoading}
                    />
                  </Grid>

                  {itemData?.attachment_type == ContentTypes.IMAGE && (
                    <React.Fragment>
                      <Grid item xs={12} md={6}>
                        <ImageView
                          label={messages['common.image_path']}
                          imageUrl={itemData?.image_path}
                          isLoading={isLoading}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <DetailsInputView
                          label={messages['common.image_alt_title']}
                          value={itemData?.image_alt_title}
                          isLoading={isLoading}
                        />
                      </Grid>
                    </React.Fragment>
                  )}

                  {itemData?.attachment_type != ContentTypes.IMAGE && (
                    <React.Fragment>
                      <Grid item xs={12} md={6}>
                        <DetailsInputView
                          label={messages['common.video_id']}
                          value={itemData?.video_id}
                          isLoading={isLoading}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <DetailsInputView
                          label={messages['common.video_url']}
                          value={itemData?.video_url}
                          isLoading={isLoading}
                        />
                      </Grid>
                    </React.Fragment>
                  )}
                </React.Fragment>
              )}

              <Grid item xs={12} md={6}>
                <DetailsInputView
                  label={messages['common.is_button_available']}
                  value={
                    itemData?.is_button_available == 1
                      ? messages['common.yes']
                      : messages['common.no']
                  }
                  isLoading={isLoading}
                />
              </Grid>

              {itemData?.is_button_available == 1 && (
                <React.Fragment>
                  <Grid item xs={12} md={6}>
                    <DetailsInputView
                      label={messages['common.button_text']}
                      value={itemData?.button_text}
                      isLoading={isLoading}
                    />
                  </Grid>
                </React.Fragment>
              )}
            </React.Fragment>
          )}

          <Grid item xs={12}>
            <fieldset>
              <legend>
                {getLanguageLabel(
                  cmsGlobalConfig?.language_configs,
                  LanguageCodes.BANGLA,
                )}
              </legend>
              <Grid container spacing={5}>
                <Grid
                  item
                  xs={12}
                  md={pageType == StaticPageTypes.PAGE ? 6 : 12}>
                  <DetailsInputView
                    label={messages['common.title']}
                    value={itemData?.title}
                    isLoading={isLoading}
                  />
                </Grid>

                {pageType == StaticPageTypes.PAGE && (
                  <Grid item xs={12} md={6}>
                    <DetailsInputView
                      label={messages['common.sub_title']}
                      value={itemData?.sub_title}
                      isLoading={isLoading}
                    />
                  </Grid>
                )}

                {pageType == StaticPageTypes.BLOCK && (
                  <React.Fragment>
                    {itemData?.attachment_type == ContentTypes.IMAGE && (
                      <Grid item xs={12} md={6}>
                        <DetailsInputView
                          label={messages['common.image_alt_title']}
                          value={itemData?.image_alt_title}
                          isLoading={isLoading}
                        />
                      </Grid>
                    )}

                    {itemData?.is_button_available == 1 && (
                      <Grid item xs={12} md={6}>
                        <DetailsInputView
                          label={messages['common.button_text']}
                          value={itemData?.button_text}
                          isLoading={isLoading}
                        />
                      </Grid>
                    )}
                  </React.Fragment>
                )}

                <Grid item xs={12}>
                  <DetailsInputView
                    label={messages['common.content']}
                    value={
                      <div
                        dangerouslySetInnerHTML={{
                          __html: itemData?.content,
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
                    <Grid
                      item
                      xs={12}
                      md={pageType == StaticPageTypes.PAGE ? 6 : 12}>
                      <DetailsInputView
                        label={messages['common.title']}
                        value={itemData.other_language_fields[key]?.title}
                        isLoading={isLoading}
                      />
                    </Grid>
                    {pageType == StaticPageTypes.PAGE && (
                      <Grid item xs={12} md={6}>
                        <DetailsInputView
                          label={messages['common.sub_title']}
                          value={itemData.other_language_fields[key]?.sub_title}
                          isLoading={isLoading}
                        />
                      </Grid>
                    )}

                    {pageType == StaticPageTypes.BLOCK && (
                      <React.Fragment>
                        {itemData?.attachment_type == ContentTypes.IMAGE && (
                          <Grid item xs={12} md={6}>
                            <DetailsInputView
                              label={messages['common.image_alt_title']}
                              value={
                                itemData.other_language_fields[key]
                                  ?.image_alt_title
                              }
                              isLoading={isLoading}
                            />
                          </Grid>
                        )}

                        {itemData?.is_button_available == 1 && (
                          <Grid item xs={12} md={6}>
                            <DetailsInputView
                              label={messages['common.button_text']}
                              value={
                                itemData.other_language_fields[key]?.button_text
                              }
                              isLoading={isLoading}
                            />
                          </Grid>
                        )}
                      </React.Fragment>
                    )}

                    <Grid item xs={12}>
                      <DetailsInputView
                        label={messages['common.content']}
                        value={
                          <div
                            dangerouslySetInnerHTML={{
                              __html:
                                itemData.other_language_fields[key]?.content,
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

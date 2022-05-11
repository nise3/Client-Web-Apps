import React, {useCallback} from 'react';
import {Card, Grid} from '@mui/material';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import CustomDetailsViewMuiModal from '../../../@softbd/modals/CustomDetailsViewMuiModal/CustomDetailsViewMuiModal';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import DetailsInputView from '../../../@softbd/elements/display/DetailsInputView/DetailsInputView';
import {useIntl} from 'react-intl';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CustomChipRowStatus from '../../../@softbd/elements/display/CustomChipRowStatus/CustomChipRowStatus';
import IconCourse from '../../../@softbd/icons/IconCourse';
import {useFetchCourse} from '../../../services/instituteManagement/hooks';
import {LANGUAGE_MEDIUM, LEVEL} from './CourseEnums';
import {ISkill} from '../../../shared/Interface/organization.interface';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import CardMediaImageView from '../../../@softbd/elements/display/ImageView/CardMediaImageView';

type Props = {
  itemId: number;
  onClose: () => void;
  openEditModal: (id: number) => void;
};

const CourseDetailsPopup = ({itemId, openEditModal, ...props}: Props) => {
  const {messages} = useIntl();
  const {data: itemData, isLoading} = useFetchCourse(itemId);

  const getSkillsName = useCallback(
    (skills: any = []) => {
      let namesArray = skills.map((item: ISkill) => item.title);
      return namesArray.join();
    },
    [itemId],
  );

  const getLevelCaption = (level: any) => {
    switch (String(level)) {
      case LEVEL.BEGINNER:
        return messages['level.beginner'];
      case LEVEL.INTERMEDIATE:
        return messages['level.intermediate'];
      case LEVEL.EXPERT:
        return messages['level.expert'];
      default:
        return '';
    }
  };

  const getLanguageMediumCaption = (languageMedium: any) => {
    switch (String(languageMedium)) {
      case LANGUAGE_MEDIUM.BN:
        return messages['language.bn'];
      case LANGUAGE_MEDIUM.EN:
        return messages['language.en'];
      default:
        return '';
    }
  };

  const getConfigs = (config: string | undefined | null) => {
    let text = '';
    try {
      let configJson = JSON.parse(config || '{}');

      Object.keys(configJson || {}).map((key: string) => {
        let value = configJson[key];
        if (value[0]) {
          if (text) text += ', ';
          text +=
            messages['course.' + key] +
            '(' +
            (value[1]
              ? messages['common.required']
              : messages['common.not_required']) +
            ')';
        }
      });
    } catch (e) {
      console.log('Failed to parse config data', e);
    }
    return text;
  };

  return (
    <>
      <CustomDetailsViewMuiModal
        open={true}
        {...props}
        title={
          <>
            <IconCourse />
            <IntlMessages id='course.label' />
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
          <Grid item xs={12} sm={6} md={6}>
            <DetailsInputView
              label={messages['common.title']}
              value={itemData?.title}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <DetailsInputView
              label={messages['common.title_en']}
              value={itemData?.title_en}
              isLoading={isLoading}
            />
          </Grid>

          {/*<Grid item xs={12} sm={6} md={6}>*/}
          {/*  <DetailsInputView*/}
          {/*    label={messages['common.code']}*/}
          {/*    value={itemData?.code}*/}
          {/*    isLoading={isLoading}*/}
          {/*  />*/}
          {/*</Grid>*/}
          <Grid item xs={6} sm={3} md={3}>
            <DetailsInputView
              label={messages['course.fee']}
              value={itemData?.course_fee}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6} sm={3} md={3}>
            <DetailsInputView
              label={messages['course.duration']}
              value={itemData?.duration}
              isLoading={isLoading}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <DetailsInputView
              label={messages['institute.label']}
              value={itemData?.institute_title}
              isLoading={isLoading}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <DetailsInputView
              label={messages['programme.label']}
              value={itemData?.program_title}
              isLoading={isLoading}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <DetailsInputView
              label={messages['course.course_level']}
              value={getLevelCaption(itemData?.level)}
              isLoading={isLoading}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <DetailsInputView
              label={messages['course.language_medium']}
              value={getLanguageMediumCaption(itemData?.language_medium)}
              isLoading={isLoading}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <DetailsInputView
              label={messages['common.skills']}
              value={getSkillsName(itemData?.skills)}
              isLoading={isLoading}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <DetailsInputView
              label={messages['course.overview']}
              value={itemData?.overview}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <DetailsInputView
              label={messages['course.overview_en']}
              value={itemData?.overview_en}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <DetailsInputView
              label={messages['course.target_group']}
              value={itemData?.target_group}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <DetailsInputView
              label={messages['course.target_group_en']}
              value={itemData?.target_group_en}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <DetailsInputView
              label={messages['course.objectives']}
              value={itemData?.objectives}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <DetailsInputView
              label={messages['course.objectives_en']}
              value={itemData?.objectives_en}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <DetailsInputView
              label={messages['course.training_methodology']}
              value={itemData?.training_methodology}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <DetailsInputView
              label={messages['course.training_methodology_en']}
              value={itemData?.training_methodology_en}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <DetailsInputView
              label={messages['course.evaluation_system']}
              value={itemData?.evaluation_system}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <DetailsInputView
              label={messages['course.evaluation_system_en']}
              value={itemData?.evaluation_system_en}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <DetailsInputView
              label={messages['course.prerequisite']}
              value={itemData?.prerequisite}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <DetailsInputView
              label={messages['course.prerequisite_en']}
              value={itemData?.prerequisite}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <DetailsInputView
              label={messages['course.eligibility']}
              value={itemData?.eligibility}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <DetailsInputView
              label={messages['course.eligibility_en']}
              value={itemData?.eligibility}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['course.configs']}
              value={getConfigs(itemData?.application_form_settings)}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Card>
              <CardMediaImageView
                height='194'
                image={itemData?.cover_image}
                alt={itemData?.title}
              />
            </Card>

            {/* <DetailsInputView
              label={messages['course.cover_image']}
              value={itemData?.cover_image}
              isLoading={isLoading}
            />*/}
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

export default CourseDetailsPopup;

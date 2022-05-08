import React from 'react';
import {Grid, ListItem, ListItemText} from '@mui/material';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import CustomDetailsViewMuiModal from '../../../@softbd/modals/CustomDetailsViewMuiModal/CustomDetailsViewMuiModal';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import DetailsInputView from '../../../@softbd/elements/display/DetailsInputView/DetailsInputView';
import {useIntl} from 'react-intl';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CustomChipRowStatus from '../../../@softbd/elements/display/CustomChipRowStatus/CustomChipRowStatus';
import IconBranch from '../../../@softbd/icons/IconBranch';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import {useFetch4IRProject} from '../../../services/4IRManagement/hooks';
import {getMomentDateFormat} from '../../../@softbd/utilities/helpers';
import {ProjectStatus} from '../../../shared/constants/AppEnums';
import List from '@mui/material/List';

type Props = {
  itemId: number;
  onClose: () => void;
  openEditModal: (id: number) => void;
};

const FourIRInitiativeDetailsPopup = ({
  itemId,
  openEditModal,
  ...props
}: Props) => {
  const {messages} = useIntl();
  const {data: itemData, isLoading} = useFetch4IRProject(itemId);

  return (
    <>
      <CustomDetailsViewMuiModal
        open={true}
        {...props}
        title={
          <>
            <IconBranch />
            <IntlMessages id='4ir_initiative.label' />
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
              label={messages['initiative.name']}
              value={itemData?.project_name}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['initiative.name_en']}
              value={itemData?.project_name_en}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['initiative.organization_name']}
              value={itemData?.organization_name}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['initiative.organization_name_en']}
              value={itemData?.organization_name_en}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['initiative.details']}
              value={itemData?.details}
              isLoading={isLoading}
            />
          </Grid>
          {/*
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['project.details_en']}
              value={itemData?.project_details_en}
              isLoading={isLoading}
            />
          </Grid>*/}
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['initiative.start_date']}
              value={getMomentDateFormat(itemData?.start_date, 'DD MMM YYYY')}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['menu.occupations']}
              value={itemData?.occupation_title}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['initiative.project_budget']}
              value={itemData?.project_budget}
              isLoading={isLoading}
            />
          </Grid>
          {itemData?.tasks?.length > 0 &&
            itemData?.tasks?.map((task: any) => {
              return (
                <Grid item xs={12} key={task}>
                  <List>
                    {task == ProjectStatus.PROJECT_FINALIZED && (
                      <ListItem
                        key={ProjectStatus.PROJECT_FINALIZED}
                        disableGutters>
                        <ListItemText
                          primary={messages['initiative.roadmap_finalized']}
                        />
                      </ListItem>
                    )}
                    {task == ProjectStatus.PROJECT_REVIEWED && (
                      <ListItem
                        key={ProjectStatus.PROJECT_REVIEWED}
                        disableGutters>
                        <ListItemText
                          primary={messages['initiative.projects_reviewed']}
                        />
                      </ListItem>
                    )}
                    {task == ProjectStatus.PROJECT_APPROVED && (
                      <ListItem
                        key={ProjectStatus.PROJECT_APPROVED}
                        disableGutters>
                        <ListItemText
                          primary={messages['initiative.projects_approved']}
                        />
                      </ListItem>
                    )}
                  </List>
                </Grid>
              );
            })}

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

export default FourIRInitiativeDetailsPopup;

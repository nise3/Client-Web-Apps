import React from 'react';
import {Grid, ListItem, Typography} from '@mui/material';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import CustomDetailsViewMuiModal from '../../../@softbd/modals/CustomDetailsViewMuiModal/CustomDetailsViewMuiModal';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import DetailsInputView from '../../../@softbd/elements/display/DetailsInputView/DetailsInputView';
import {useIntl} from 'react-intl';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CustomChipRowStatus from '../../../@softbd/elements/display/CustomChipRowStatus/CustomChipRowStatus';
import IconBranch from '../../../@softbd/icons/IconBranch';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import {useFetch4IInitiative} from '../../../services/4IRManagement/hooks';
import {getMomentDateFormat} from '../../../@softbd/utilities/helpers';
import {ProjectStatus} from '../../../shared/constants/AppEnums';
import List from '@mui/material/List';
import {FILE_SERVER_FILE_VIEW_ENDPOINT} from '../../../@softbd/common/apiRoutes';
import CommonButton from '../../../@softbd/elements/button/CommonButton/CommonButton';
import DownloadIcon from '@mui/icons-material/Download';
import {Link} from '../../../@softbd/elements/common';

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
  const {data: itemData, isLoading} = useFetch4IInitiative(itemId);

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
              value={itemData?.name}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['initiative.name_en']}
              value={itemData?.name_en}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.organization_name']}
              value={itemData?.organization_name}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.organization_name_en']}
              value={itemData?.organization_name_en}
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
              label={messages['common.designation']}
              value={itemData?.designation}
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
              label={messages['initiative.end_date']}
              value={getMomentDateFormat(itemData?.end_date, 'DD MMM YYYY')}
              isLoading={isLoading}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['initiative.initiative_budget']}
              value={itemData?.budget}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}></Grid>
          <Grid item xs={12} md={6}>
            <Link
              underline='none'
              href={`${FILE_SERVER_FILE_VIEW_ENDPOINT + itemData?.file_path}`}
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
                btnText={'common.download_file'}
                variant={'outlined'}
                color={'primary'}
              />
            </Link>
          </Grid>

          <Grid item xs={12}>
            <List>
              <ListItem key={'skill'} disableGutters>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>
                      {messages['initiative.is_skill_provided']}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      {itemData && itemData?.is_skill_provide > 0
                        ? 'YES'
                        : 'NO'}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>

              <ListItem key={ProjectStatus.PROJECT_FINALIZED} disableGutters>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>
                      {messages['initiative.roadmap_finalized']}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      {itemData &&
                      itemData?.tasks &&
                      itemData.tasks.find(
                        (n: number) => n === ProjectStatus.PROJECT_FINALIZED,
                      )
                        ? 'YES'
                        : 'NO'}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>

              <ListItem key={ProjectStatus.PROJECT_REVIEWED} disableGutters>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>
                      {messages['initiative.initiatives_reviewed']}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      {itemData &&
                      itemData?.tasks &&
                      itemData.tasks.find(
                        (n: number) => n === ProjectStatus.PROJECT_REVIEWED,
                      )
                        ? 'YES'
                        : 'NO'}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>

              <ListItem key={ProjectStatus.PROJECT_APPROVED} disableGutters>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>
                      {messages['initiative.initiatives_approved']}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      {itemData &&
                      itemData?.tasks &&
                      itemData.tasks.find(
                        (n: number) => n === ProjectStatus.PROJECT_APPROVED,
                      )
                        ? 'YES'
                        : 'NO'}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
            </List>
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

export default FourIRInitiativeDetailsPopup;

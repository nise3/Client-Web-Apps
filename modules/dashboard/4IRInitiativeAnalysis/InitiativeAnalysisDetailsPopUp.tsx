import React from 'react';
import {Grid} from '@mui/material';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import CustomDetailsViewMuiModal from '../../../@softbd/modals/CustomDetailsViewMuiModal/CustomDetailsViewMuiModal';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import DetailsInputView from '../../../@softbd/elements/display/DetailsInputView/DetailsInputView';
import {useIntl} from 'react-intl';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import IconBranch from '../../../@softbd/icons/IconBranch';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import {useFetch4IRInitiativeAnalysis} from '../../../services/4IRManagement/hooks';
import CustomChipRowStatus from '../../../@softbd/elements/display/CustomChipRowStatus/CustomChipRowStatus';
import CommonButton from '../../../@softbd/elements/button/CommonButton/CommonButton';
import {FILE_SERVER_FILE_VIEW_ENDPOINT} from '../../../@softbd/common/apiRoutes';
import DownloadIcon from '@mui/icons-material/Download';
import {Link} from '../../../@softbd/elements/common';

type Props = {
  itemId: number;
  onClose: () => void;
  openEditModal: (id: number) => void;
};

const InitiativeAnalysisDetailsPopUp = ({
  itemId,
  openEditModal,
  ...props
}: Props) => {
  const {messages} = useIntl();
  const {data: itemData, isLoading} = useFetch4IRInitiativeAnalysis(itemId);

  return (
    <>
      <CustomDetailsViewMuiModal
        open={true}
        {...props}
        title={
          <>
            <IconBranch />
            <IntlMessages id='4ir_initiative_analysis.label' />
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
              label={messages['4ir.researcher_name']}
              value={itemData?.researcher_name}
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
              label={messages['4ir.research_method']}
              value={itemData?.research_method}
              isLoading={isLoading}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Link
              underline='none'
              href={`${FILE_SERVER_FILE_VIEW_ENDPOINT + itemData?.file_path}`}
              download
              target={'_blank'}
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
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

          {/* // todo: file path should be added */}
          {/*<Grid item xs={12} md={6}>*/}
          {/*  <Link*/}
          {/*    underline='none'*/}
          {/*    href={`${FILE_SERVER_FILE_VIEW_ENDPOINT + itemData?.file_path}`}*/}
          {/*    download*/}
          {/*    target={'_blank'}*/}
          {/*    style={{*/}
          {/*      display: 'flex',*/}
          {/*      justifyContent: 'flex-start',*/}
          {/*      marginTop: '2rem',*/}
          {/*    }}>*/}
          {/*    <CommonButton*/}
          {/*      startIcon={<DownloadIcon />}*/}
          {/*      key={1}*/}
          {/*      onClick={() => console.log('file downloading')}*/}
          {/*      btnText={'common.download_file'}*/}
          {/*      variant={'outlined'}*/}
          {/*      color={'primary'}*/}
          {/*    />*/}
          {/*  </Link>*/}

          {/*<Link href={`/`}>*/}
          {/*  <CommonButton*/}
          {/*    btnText='common.download'*/}
          {/*    startIcon={<FiUser style={{marginLeft: '5px'}} />}*/}
          {/*    variant={'text'}*/}
          {/*  />*/}
          {/*</Link>*/}
          {/*</Grid>*/}

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

export default InitiativeAnalysisDetailsPopUp;

import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import {Button, Grid} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import FrontendCustomModal from '../../../@softbd/modals/FrontendCustomModal/FrontendCustomModal';

interface IProps {
  onClose: () => void;
}

const UploadExamAnsFilePopup = ({onClose}: IProps) => {
  console.log('dfdf->');
  return (
    <FrontendCustomModal
      onClose={onClose}
      open={true}
      title={
        <>
          <DriveFileRenameOutlineIcon />
          <IntlMessages id='common.exam_schedule' />
        </>
      }
      maxWidth={isBreakPointUp('xl') ? 'lg' : 'md'}
      actions={
        <Button
          startIcon={<CancelIcon />}
          variant='outlined'
          onClick={onClose}
          color={'warning'}>
          {'Cancel'}
        </Button>
      }>
      <Grid container>
        <Grid item xs={12}>
          dfdfdf
        </Grid>
      </Grid>
    </FrontendCustomModal>
  );
};

export default UploadExamAnsFilePopup;

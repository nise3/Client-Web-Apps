import IconRole from '../../../@softbd/icons/IconRole';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CustomDetailsViewMuiModal from '../../../@softbd/modals/CustomDetailsViewMuiModal/CustomDetailsViewMuiModal';
import Grid from '@mui/material/Grid';
import DetailsInputView from '../../../@softbd/elements/display/DetailsInputView/DetailsInputView';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import {CommonAuthUser} from '../../../redux/types/models/CommonAuthUser';
import {useIntl} from 'react-intl';
import Avatar from '@mui/material/Avatar';
import makeStyles from '@mui/styles/makeStyles';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';

const useStyles = makeStyles({
  ProfileImage: {
    height: '200px',
    width: '200px',
  },
});
type Props = {
  onClose: () => void;
  openEditModal: () => void;
};

export default function UserInfoDetailsPopup({onClose, openEditModal}: Props) {
  const user: CommonAuthUser | null = useAuthUser();
  const {messages} = useIntl();
  const classes = useStyles();

  return (
    <CustomDetailsViewMuiModal
      open={true}
      onClose={onClose}
      title={
        <>
          <IconRole />
          <IntlMessages id='my_account.label' />
        </>
      }
      maxWidth={'md'}
      actions={
        <>
          <EditButton onClick={() => openEditModal()} />
        </>
      }>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <Avatar
            className={classes.ProfileImage}
            src='/images/userPageImages/profileImage.jpeg'
          />
        </Grid>
        <Grid item xs={6}>
          <DetailsInputView
            label={messages['common.profile_name']}
            value={user?.displayName}
          />
        </Grid>
        <Grid item xs={6}>
          <DetailsInputView
            label={messages['common.user_name']}
            value={user?.username}
          />
        </Grid>
        <Grid item xs={6}>
          <DetailsInputView
            label={messages['common.email']}
            value={user?.email}
          />
        </Grid>
        <Grid item xs={6}>
          <DetailsInputView
            label={messages['common.mobile']}
            value={user?.mobile}
          />
        </Grid>
        <Grid item xs={6}>
          <DetailsInputView
            label={messages['role.label']}
            value={user?.role?.title}
          />
        </Grid>
        <Grid item xs={6}>
          <DetailsInputView label={messages['institute.label']} value={'xyz'} />
        </Grid>
        <Grid item xs={6}>
          <DetailsInputView
            label={messages['organization.label']}
            value={'abc'}
          />
        </Grid>
      </Grid>
    </CustomDetailsViewMuiModal>
  );
}

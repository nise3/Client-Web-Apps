import IconRole from '../../../@softbd/icons/IconRole';
import {styled} from '@mui/material/styles';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CustomDetailsViewMuiModal from '../../../@softbd/modals/CustomDetailsViewMuiModal/CustomDetailsViewMuiModal';
import Grid from '@mui/material/Grid';
import DetailsInputView from '../../../@softbd/elements/display/DetailsInputView/DetailsInputView';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import {CommonAuthUser} from '../../../redux/types/models/CommonAuthUser';
import {useIntl} from 'react-intl';
import Avatar from '@mui/material/Avatar';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';

const PREFIX = 'UserInfoDetailsPopup';

const classes = {
  ProfileImage: `${PREFIX}-ProfileImage`,
  noProfileImage: `${PREFIX}-noProfileImage`,
};

const StyledCustomDetailsViewMuiModal = styled(CustomDetailsViewMuiModal)({
  [`& .${classes.ProfileImage}`]: {
    height: '100px',
    width: '100px',
  },
  [`& .${classes.noProfileImage}`]: {
    height: '50px',
    width: '50px',
  },
});

type Props = {
  onClose: () => void;
  openEditModal: () => void;
};

export default function UserInfoDetailsPopup({onClose, openEditModal}: Props) {
  const authUser = useAuthUser<CommonAuthUser>();
  const {messages} = useIntl();

  return (
    <StyledCustomDetailsViewMuiModal
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
          {authUser?.profile_pic ? (
            <Avatar
              className={classes.ProfileImage}
              src={authUser?.profile_pic}
            />
          ) : (
            <Avatar className={classes.noProfileImage}>
              {authUser?.displayName?.charAt(0)}
            </Avatar>
          )}
        </Grid>
        <Grid item xs={6}>
          <DetailsInputView
            label={messages['common.name']}
            value={authUser?.name}
          />
        </Grid>
        <Grid item xs={6}>
          <DetailsInputView
            label={messages['common.name_en']}
            value={authUser?.displayName}
          />
        </Grid>
        <Grid item xs={6}>
          <DetailsInputView
            label={messages['common.user_name']}
            value={authUser?.username}
          />
        </Grid>
        <Grid item xs={6}>
          <DetailsInputView
            label={messages['common.email']}
            value={authUser?.email}
          />
        </Grid>
        <Grid item xs={6}>
          <DetailsInputView
            label={messages['common.mobile']}
            value={authUser?.mobile}
          />
        </Grid>
        <Grid item xs={6}>
          <DetailsInputView
            label={messages['role.label']}
            value={authUser?.role?.title}
          />
        </Grid>
      </Grid>
    </StyledCustomDetailsViewMuiModal>
  );
}

import {styled} from '@mui/styles';
import DeleteButton from '../../../../@softbd/elements/button/DeleteButton/DeleteButton';

const CircularDeleteButton = styled(DeleteButton)(({theme}) => ({
  border: '1px solid',
  borderColor: theme.palette.error.main,
  borderRadius: 40,
  marginLeft: 5,
}));

export default CircularDeleteButton;
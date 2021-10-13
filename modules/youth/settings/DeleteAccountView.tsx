import React, {FC} from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {ChevronLeft, Delete} from '@mui/icons-material';
import {useIntl} from 'react-intl';
import useStyles from './Settings.style';

interface DeleteAccountViewProps {
  onBack: () => void;
}
const DeleteAccountView: FC<DeleteAccountViewProps> = ({onBack}) => {
  const {messages} = useIntl();
  const classes = useStyles();

  const handleClick = () => {};

  return (
    <Card sx={{maxWidth: 700}} className={classes.paperBox}>
      <Box sx={{backgroundColor: '#f510100f', padding: '20px'}}>
        <Box style={{display: 'flex'}}>
          <DeleteIcon
            style={{
              color: '#f04f47',
              marginRight: '5px',
              transform: 'scale(1.2)',
              marginTop: '6px',
            }}
          />
          <Typography variant={'h6'} style={{fontWeight: 'bold'}}>
            {messages['common.deactivate_account']}
          </Typography>
        </Box>
        <Typography style={{marginLeft: '30px', marginBottom: '10px'}}>
          {messages['common.deactivate_warning_text']}
        </Typography>
      </Box>
      <CardContent>
        <Typography style={{marginLeft: '30px', fontWeight: 'bold'}}>
          {messages['common.deactivate_confirm_text']}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          style={{marginLeft: '30px'}}
          variant='contained'
          color='secondary'
          className={classes.button}
          startIcon={<Delete />}
          onClick={handleClick}>
          {messages['common.delete']}
        </Button>

        <Button variant={'outlined'} onClick={onBack}>
          <ChevronLeft /> {messages['common.back']}
        </Button>
      </CardActions>
    </Card>
  );
};

export default DeleteAccountView;

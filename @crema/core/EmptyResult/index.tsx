import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IntlMessages from '../../utility/IntlMessages';
import makeStyles from '@mui/styles/makeStyles';
import {Fonts} from '../../../shared/constants/AppEnums';

const useStyle = makeStyles({
  btn: {
    marginBottom: 8,
  },
});

interface EmptyResultProps {
  title?: string;
  description: string;
  actionTitle: string;
  onAction: () => void;
}

const EmptyResult: React.FC<EmptyResultProps> = ({
  title = <IntlMessages id='common.noRecordFound' />,
  description = '',
  actionTitle,
  onAction,
}) => {
  const classes = useStyle();
  return (
    <Box
      display='flex'
      flexDirection='column'
      flex={1}
      justifyContent='center'
      width={1}
      height={1}
      alignItems='center'
      p={5}>
      <Box
        component='h4'
        mb={4}
        fontWeight={Fonts.REGULAR}
        color='text.secondary'>
        {title}
      </Box>
      {description ? (
        <Box component='p' mb={5} color='text.secondary'>
          {description}
        </Box>
      ) : null}
      {actionTitle ? (
        <Button
          className={classes.btn}
          variant='contained'
          color='primary'
          onClick={onAction}>
          {actionTitle}
        </Button>
      ) : null}
    </Box>
  );
};

export default EmptyResult;

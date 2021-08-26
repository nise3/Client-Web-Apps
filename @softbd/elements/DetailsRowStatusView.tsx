import React from 'react';
import {CheckCircleOutline} from '@material-ui/icons';
import CancelIcon from '@material-ui/icons/Cancel';
import CustomChip from './CustomChip';
import IntlMessages from '../../@crema/utility/IntlMessages';
import FormLabel from '@material-ui/core/FormLabel';
import {makeStyles} from '@material-ui/core';
import {Fonts} from '../../shared/constants/AppEnums';
import TextInputSkeleton from './Skeleton/TextInputSkeleton';

const useStyles = makeStyles(() => {
  return {
    label: {
      fontWeight: Fonts.BOLD,
      fontSize: 14,
      marginBottom: '12px',
      display: 'block',
    },
  };
});

type Props = {
  value: number;
  isLoading?: boolean;
};

const DetailsRowStatusView = ({value, isLoading}: Props) => {
  const classes = useStyles();

  return isLoading ? (
    <TextInputSkeleton />
  ) : (
    <>
      <FormLabel className={classes.label}>
        <IntlMessages id={'common.status'} />
      </FormLabel>
      <CustomChip
        icon={value == 1 ? <CheckCircleOutline /> : <CancelIcon />}
        color={value == 1 ? 'primary' : 'secondary'}
        label={
          value == 1 ? (
            <IntlMessages id='common.active' />
          ) : (
            <IntlMessages id='common.inactive' />
          )
        }
      />
    </>
  );
};

export default DetailsRowStatusView;

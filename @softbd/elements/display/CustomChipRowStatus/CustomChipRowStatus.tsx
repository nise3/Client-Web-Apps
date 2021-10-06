import React from 'react';
import {CheckCircleOutline} from '@mui/icons-material';
import CancelIcon from '@mui/icons-material/Cancel';
import CustomChip from '../CustomChip/CustomChip';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import FormLabel from '@mui/material/FormLabel';
import makeStyles from '@mui/styles/makeStyles';
import {Fonts} from '../../../../shared/constants/AppEnums';
import TextInputSkeleton from '../skeleton/TextInputSkeleton/TextInputSkeleton';
import {MessageFormatElement} from '@formatjs/icu-messageformat-parser';

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
  label?: string | MessageFormatElement[];
};

const CustomChipRowStatus = ({value, isLoading, label}: Props) => {
  const classes = useStyles();

  return isLoading ? (
    <TextInputSkeleton />
  ) : (
    <>
      {label && <FormLabel className={classes.label}>{label}</FormLabel>}

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

export default React.memo(CustomChipRowStatus);

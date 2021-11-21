import React from 'react';
import {CheckCircleOutline} from '@mui/icons-material';
import CancelIcon from '@mui/icons-material/Cancel';
import CustomChip from '../CustomChip/CustomChip';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import FormLabel from '@mui/material/FormLabel';
import {Fonts} from '../../../../shared/constants/AppEnums';
import TextInputSkeleton from '../skeleton/TextInputSkeleton/TextInputSkeleton';
import {MessageFormatElement} from '@formatjs/icu-messageformat-parser';

type Props = {
  value: number;
  isLoading?: boolean;
  label?: string | MessageFormatElement[];
};

const CustomChipRowStatus = ({value, isLoading, label}: Props) => {
  return isLoading ? (
    <TextInputSkeleton />
  ) : (
    <>
      {label && (
        <FormLabel
          sx={{
            fontWeight: Fonts.BOLD,
            fontSize: '14px',
            marginBottom: '12px',
            display: 'block',
          }}>
          {label}
        </FormLabel>
      )}
      <CustomChip
        icon={
          value == 1 ? (
            <CheckCircleOutline fontSize={'small'} />
          ) : (
            <CancelIcon fontSize={'small'} />
          )
        }
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

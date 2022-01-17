import React from 'react';
import FormLabel from '@mui/material/FormLabel';
import {MessageFormatElement} from '@formatjs/icu-messageformat-parser';
import TextInputSkeleton from '../../../@softbd/elements/display/skeleton/TextInputSkeleton/TextInputSkeleton';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CustomChip from '../../../@softbd/elements/display/CustomChip/CustomChip';
import {Fonts} from '../../../shared/constants/AppEnums';

type Props = {
  value: number;
  isLoading?: boolean;
  label?: string | MessageFormatElement[];
};

const CustomChipPaymentStatusStatus = ({value, isLoading, label}: Props) => {
  return isLoading ? (
    <TextInputSkeleton />
  ) : (
    <>
      {label && (
        <FormLabel
          style={{
            fontWeight: Fonts.BOLD,
            fontSize: 14,
            marginBottom: '12px',
            display: 'block',
          }}>
          {label}
        </FormLabel>
      )}

      <CustomChip
        color={value == 1 ? 'primary' : 'secondary'}
        label={
          value == 0 ? (
            <IntlMessages id='common.inactive' />
          ) : value == 1 ? (
            <IntlMessages id='common.approved' />
          ) : value == 2 ? (
            <IntlMessages id='common.pending' />
          ) : (
            <IntlMessages id='common.rejected' />
          )
        }
      />
    </>
  );
};

export default React.memo(CustomChipPaymentStatusStatus);

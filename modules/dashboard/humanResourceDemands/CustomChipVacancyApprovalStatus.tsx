import React from 'react';
import {CheckCircleOutline} from '@mui/icons-material';
import CancelIcon from '@mui/icons-material/Cancel';
import FormLabel from '@mui/material/FormLabel';
import {MessageFormatElement} from '@formatjs/icu-messageformat-parser';
import TextInputSkeleton from '../../../@softbd/elements/display/skeleton/TextInputSkeleton/TextInputSkeleton';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CustomChip from '../../../@softbd/elements/display/CustomChip/CustomChip';
import {Fonts} from '../../../shared/constants/AppEnums';

type Props = {
  value: number | string;
  vacancy?: number;
  isLoading?: boolean;
  label?: string | MessageFormatElement[];
};

const CustomChipVacancyApprovalStatus = ({
  value,
  vacancy,
  isLoading,
  label,
}: Props) => {
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
        icon={value == 2 ? <CheckCircleOutline /> : <CancelIcon />}
        color={value == 2 ? 'primary' : 'secondary'}
        label={
          value == 2 ? (
            <IntlMessages id='common.approved' />
          ) : value == 3 ? (
            <IntlMessages id='common.rejected' />
          ) : (
            <IntlMessages id='common.pending' />
          )
        }
      />
    </>
  );
};

export default React.memo(CustomChipVacancyApprovalStatus);

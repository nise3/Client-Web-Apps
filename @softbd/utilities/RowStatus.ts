import {appIntl} from '../../@crema/utility/Utils';

enum RowStatus {
  ACTIVE = '1',
  INACTIVE = '0',
}

export const getRowStatusLabel = (key: number | string): string => {
  const messages = appIntl();
  switch (key) {
    case RowStatus.ACTIVE:
      return messages['common.active'] as string;
    case RowStatus.INACTIVE:
      return messages['common.inactive'] as string;
    default:
      return 'unknown';
  }
};

export const rowStatusArray = (): Array<{
  key: RowStatus.ACTIVE | RowStatus.INACTIVE;
  label: string;
}> => {
  return [
    {
      key: RowStatus.ACTIVE,
      label: getRowStatusLabel(RowStatus.ACTIVE),
    },
    {
      key: RowStatus.INACTIVE,
      label: getRowStatusLabel(RowStatus.INACTIVE),
    },
  ];
};

export default RowStatus;

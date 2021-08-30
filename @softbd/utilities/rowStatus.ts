import {useIntl} from 'react-intl';

export enum rowStatus {
  ACTIVE = '1',
  INACTIVE = '0',
}

export const getRowStatusLabel = (key: number | string): string => {
  const {messages} = useIntl();
  switch (key) {
    case rowStatus.ACTIVE:
      return messages['common.active'] as string;
    case rowStatus.INACTIVE:
      return messages['common.inactive'] as string;
    default:
      return 'unknown';
  }
};

export const rowStatusArray = (): Array<{
  key: rowStatus.ACTIVE | rowStatus.INACTIVE;
  label: string;
}> => {
  return [
    {
      key: rowStatus.ACTIVE,
      label: getRowStatusLabel(rowStatus.ACTIVE),
    },
    {
      key: rowStatus.INACTIVE,
      label: getRowStatusLabel(rowStatus.INACTIVE),
    },
  ];
};
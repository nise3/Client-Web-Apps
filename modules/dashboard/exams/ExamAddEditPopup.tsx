import React, {FC} from 'react';

interface ExamAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}
const ExamAddEditPopup: FC<ExamAddEditPopupProps> = ({
  itemId,
  refreshDataTable,
  ...props
}) => {
  return <div></div>;
};

export default ExamAddEditPopup;

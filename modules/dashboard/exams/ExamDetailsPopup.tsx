import React, {FC} from 'react';
interface ExamDetailsPopupProps {
  itemId: number;
  onClose: () => void;
  openEditModal: (id: number) => void;
}
const ExamDetailsPopup: FC<ExamDetailsPopupProps> = ({}) => {
  return <div></div>;
};

export default ExamDetailsPopup;

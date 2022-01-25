interface IProps {
  itemId: number;
  onClose: () => void;
  openEditModal: (id: number) => void;
}

const QuestionBankDetailsPopup = ({
  itemId,
  openEditModal,
  ...props
}: IProps) => {
  return <></>;
};

export default QuestionBankDetailsPopup;

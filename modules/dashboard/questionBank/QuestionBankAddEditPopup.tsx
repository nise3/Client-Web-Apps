interface IProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

const QuestionBankAddEditPopup = ({
  itemId,
  refreshDataTable,
  ...props
}: IProps) => {
  return <></>;
};

export default QuestionBankAddEditPopup;

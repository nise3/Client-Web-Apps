import {useIntl} from 'react-intl';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import React, {useCallback, useMemo, useState} from 'react';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import ReadButton from '../../../@softbd/elements/button/ReadButton/ReadButton';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import DeleteButton from '../../../@softbd/elements/button/DeleteButton/DeleteButton';

const QuestionBankPage = () => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();

  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);
  const [isToggleTable, setIsToggleTable] = useState<boolean>(false);

  const closeAddEditModal = useCallback(() => {
    setIsOpenAddEditModal(false);
    setSelectedItemId(null);
  }, []);

  const openAddEditModal = useCallback((itemId: number | null = null) => {
    setIsOpenDetailsModal(false);
    setIsOpenAddEditModal(true);
    setSelectedItemId(itemId);
  }, []);

  const openDetailsModal = useCallback(
    (itemId: number) => {
      setIsOpenDetailsModal(true);
      setSelectedItemId(itemId);
    },
    [selectedItemId],
  );

  const closeDetailsModal = useCallback(() => {
    setIsOpenDetailsModal(false);
  }, []);

  const deletePublicationItem = async (publicationId: number) => {
    console.log('delete');
    refreshDataTable();
  };

  const refreshDataTable = useCallback(() => {
    setIsToggleTable((isToggleTable: boolean) => !isToggleTable);
  }, [isToggleTable]);

  const columns = useMemo(
    () => [
      {
        Header: '#',
        disableFilters: true,
        disableSortBy: true,
        Cell: (props: any) => {
          return props.row.index + 1;
        },
      },
      {
        Header: messages['common.question_id'],
        accessor: 'question_id',
      },
      {
        Header: messages['common.question'],
        accessor: 'question',
        isVisible: false,
      },
      {
        Header: messages['common.subject_name'],
        accessor: 'subject_name',
      },
      {
        Header: messages['common.topic_name'],
        accessor: 'topic_name',
        disableFilters: true,
        disableSortBy: true,
        isVisible: false,
      },
      {
        Header: messages['common.difficulty'],
        accessor: 'difficulty',
        disableFilters: true,
        disableSortBy: true,
        isVisible: false,
      },
      {
        Header: messages['common.marks'],
        accessor: 'marks',
        disableFilters: true,
        disableSortBy: true,
        isVisible: false,
      },
      // {
      //   Header: messages['common.status'],
      //   accessor: 'row_status',
      //   filter: 'rowStatusFilter',
      //   Cell: (props: any) => {
      //     let data = props.row.original;
      //     return <CustomChipRowStatus value={data?.row_status} />;
      //   },
      // },
      {
        Header: messages['common.actions'],
        Cell: (props: any) => {
          let data = props.row.original;
          return (
            <DatatableButtonGroup>
              <ReadButton onClick={() => openDetailsModal(data.id)} />
              <EditButton onClick={() => openAddEditModal(data.id)} />
              <DeleteButton
                deleteAction={() => deletePublicationItem(data.id)}
                deleteTitle={messages['common.delete_confirm'] as string}
              />
            </DatatableButtonGroup>
          );
        },
        sortable: false,
      },
    ],
    [messages],
  );

  return <>question</>;
};

export default QuestionBankPage;

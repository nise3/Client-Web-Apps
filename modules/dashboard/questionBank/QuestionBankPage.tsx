import {useIntl} from 'react-intl';
import React, {useCallback, useMemo, useState} from 'react';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import ReadButton from '../../../@softbd/elements/button/ReadButton/ReadButton';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import DeleteButton from '../../../@softbd/elements/button/DeleteButton/DeleteButton';
import {API_INSTITUTE_QUESTION_BANK} from '../../../@softbd/common/apiRoutes';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import IconProgramme from '../../../@softbd/icons/IconProgramme';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import AddButton from '../../../@softbd/elements/button/AddButton/AddButton';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import QuestionBankAddEditPopup from './QuestionBankAddEditPopup';
import QuestionBankDetailsPopup from './QuestionBankDetailsPopup';

const QuestionBankPage = () => {
  const {messages} = useIntl();

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
      console.log('itemId->', itemId);
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
      },
      {
        Header: messages['common.subject_name'],
        accessor: 'subject_name',
      },
      {
        Header: messages['common.topic_name'],
        accessor: 'topic_name',
      },
      {
        Header: messages['common.difficulty'],
        accessor: 'difficulty',
        disableFilters: true,
        disableSortBy: true,
      },
      {
        Header: messages['common.marks'],
        accessor: 'marks',
        disableFilters: true,
        disableSortBy: true,
      },
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

  const {onFetchData, data, loading, pageCount, totalCount} =
    useReactTableFetchData({
      urlPath: API_INSTITUTE_QUESTION_BANK,
    });

  return (
    <>
      <PageBlock
        title={
          <>
            <IconProgramme />
            <IntlMessages id='common.question_bank' />
          </>
        }
        extra={[
          <AddButton
            key={1}
            onClick={() => openAddEditModal(null)}
            isLoading={loading}
            tooltip={
              <IntlMessages
                id={'common.add_new'}
                values={{
                  subject: messages['common.question_bank'],
                }}
              />
            }
          />,
        ]}>
        <ReactTable
          columns={columns}
          data={data}
          fetchData={onFetchData}
          loading={loading}
          pageCount={pageCount}
          totalCount={totalCount}
          toggleResetTable={isToggleTable}
        />
        {isOpenAddEditModal && (
          <QuestionBankAddEditPopup
            onClose={closeAddEditModal}
            itemId={selectedItemId}
            refreshDataTable={refreshDataTable}
          />
        )}

        {isOpenDetailsModal && selectedItemId && (
          <QuestionBankDetailsPopup
            itemId={selectedItemId}
            onClose={closeDetailsModal}
            openEditModal={openAddEditModal}
          />
        )}
      </PageBlock>
    </>
  );
};

export default QuestionBankPage;

import {useIntl} from 'react-intl';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import React, {useCallback, useMemo, useState} from 'react';
import {deleteQuestionsBank} from '../../../services/instituteManagement/QuestionsBankService';
import {isResponseSuccess} from '../../../@softbd/utilities/helpers';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import LocaleLanguage from '../../../@softbd/utilities/LocaleLanguage';
import CustomChipRowStatus from '../../../@softbd/elements/display/CustomChipRowStatus/CustomChipRowStatus';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import ReadButton from '../../../@softbd/elements/button/ReadButton/ReadButton';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import DeleteButton from '../../../@softbd/elements/button/DeleteButton/DeleteButton';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import {API_EXAM_QUESTION_BANK} from '../../../@softbd/common/apiRoutes';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import AddButton from '../../../@softbd/elements/button/AddButton/AddButton';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import QuestionsBankAddEditPopup from './QuestionsBankAddEditPopup';
import QuestionsBankDetailsPopup from './QuestionsBankDetailsPopup';
import IconQuestion from '../../../@softbd/icons/IconQuestion';
import {QuestionType} from './QuestionBanksEnums';

const QuestionsBankPage = () => {
  const {messages, locale} = useIntl();
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

  const deleteExamQuestionsBank = async (itemId: number) => {
    let response = await deleteQuestionsBank(itemId);
    if (isResponseSuccess(response)) {
      successStack(
        <IntlMessages
          id='common.subject_deleted_successfully'
          values={{subject: <IntlMessages id='question.label' />}}
        />,
      );

      refreshDataTable();
    }
  };

  const refreshDataTable = useCallback(() => {
    setIsToggleTable((previousToggle) => !previousToggle);
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: '#',
        Cell: (props: any) => {
          return props.row.index + 1;
        },
        disableFilters: true,
        disableSortBy: true,
      },
      {
        Header: messages['common.title'],
        accessor: 'title',
        isVisible: locale == LocaleLanguage.BN,
      },
      {
        Header: messages['common.title_en'],
        accessor: 'title_en',
        isVisible: locale == LocaleLanguage.EN,
      },
      {
        Header: messages['common.exam_subject_title'],
        accessor: 'exam_subject_title',
        isVisible: locale == LocaleLanguage.BN,
      },
      {
        Header: messages['common.exam_subject_title_en'],
        accessor: 'exam_subject_title_en',
        isVisible: locale == LocaleLanguage.EN,
      },
      {
        Header: messages['question.type'],
        // accessor: 'question_type',
        Cell: (props: any) => {
          let data = props.row.original?.question_type;
          return <div>{questionType(data)}</div>;
        },
      },
      {
        Header: messages['common.status'],
        accessor: 'row_status',
        filter: 'rowStatusFilter',
        Cell: (props: any) => {
          let data = props.row.original;
          return <CustomChipRowStatus value={data?.row_status} />;
        },
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
                deleteAction={() => deleteExamQuestionsBank(data.id)}
                deleteTitle='Are you sure?'
              />
            </DatatableButtonGroup>
          );
        },
        sortable: false,
      },
    ],
    [messages, locale],
  );

  const {onFetchData, data, loading, pageCount, totalCount} =
    useReactTableFetchData({
      urlPath: API_EXAM_QUESTION_BANK,
    });

  const questionType = (data: any) => {
    switch (String(data)) {
      case QuestionType.MCQ:
        return messages['question.type.mcq'];
      case QuestionType.FILL_IN_THE_BLANK:
        return messages['common.fill_in_the_blanks'];
      case QuestionType.YES_NO:
        return messages['question.type.y_n'];
      case QuestionType.DESCRIPTIVE:
        return messages['common.descriptive'];
      default:
        return '';
    }
  };

  return (
    <>
      <PageBlock
        title={
          <>
            <IconQuestion /> <IntlMessages id='question-bank.label' />
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
                  subject: messages['question-bank.label'],
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
          <QuestionsBankAddEditPopup
            key={1}
            onClose={closeAddEditModal}
            itemId={selectedItemId}
            refreshDataTable={refreshDataTable}
          />
        )}

        {isOpenDetailsModal && selectedItemId && (
          <QuestionsBankDetailsPopup
            key={1}
            itemId={selectedItemId}
            onClose={closeDetailsModal}
            openEditModal={openAddEditModal}
          />
        )}
      </PageBlock>
    </>
  );
};

export default QuestionsBankPage;

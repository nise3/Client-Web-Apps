import React, {useCallback, useMemo, useState} from 'react';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import AddButton from '../../../@softbd/elements/button/AddButton/AddButton';
import {useIntl} from 'react-intl';
import ReadButton from '../../../@softbd/elements/button/ReadButton/ReadButton';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import DeleteButton from '../../../@softbd/elements/button/DeleteButton/DeleteButton';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import QuestionSetAddEditPopup from './QuestionSetAddEditPopup';
import QuestionSetDetailsPopup from './QuestionSetDetailsPopup';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {isResponseSuccess} from '../../../@softbd/utilities/helpers';
import {deleteAssessmentQuestionSet} from '../../../services/CertificateAuthorityManagement/AssessmentQuestionSetService';
import {useFetchAssessmentQuestionSets} from '../../../services/CertificateAuthorityManagement/hooks';
import IconCourse from '../../../@softbd/icons/IconCourse';
import CommonButton from '../../../@softbd/elements/button/CommonButton/CommonButton';
import {FiUserCheck} from 'react-icons/fi';
import AddQuestionPopup from './AddQuestionPopup';

const QuestionSetPage = () => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();

  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [selectedAssessmentId, setSelectedAssessmentId] = useState<
    number | null
  >(null);
  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);
  const [isOpenAddQuestionModal, setIsAddQuestionAssignModal] = useState(false);
  const [subjectFilters] = useState({});
  const {
    data: subjects,
    isLoading: isLoadingSubjects,
    mutate: mutateSubjects,
  } = useFetchAssessmentQuestionSets(subjectFilters);

  const closeAddEditModal = useCallback(() => {
    setIsOpenAddEditModal(false);
    setSelectedItemId(null);
    setSelectedAssessmentId(null);
  }, []);

  const openAddEditModal = useCallback(
    (itemId: number | null = null, assessmentId: number | null) => {
      setIsOpenDetailsModal(false);
      setIsOpenAddEditModal(true);
      setSelectedItemId(itemId);
      setSelectedAssessmentId(assessmentId);
    },
    [],
  );

  const openDetailsModal = useCallback(
    (itemId: number, assessmentId: number | null) => {
      setIsOpenDetailsModal(true);
      setSelectedItemId(itemId);
      setSelectedAssessmentId(assessmentId);
    },
    [selectedItemId, selectedAssessmentId],
  );

  const closeDetailsModal = useCallback(() => {
    setIsOpenDetailsModal(false);
  }, []);

  const closeAddQuestionModal = useCallback(() => {
    setIsAddQuestionAssignModal(false);
    setSelectedItemId(null);
    setSelectedAssessmentId(null);
  }, []);

  const openAddQuestionModal = useCallback(
    (itemId: number | null = null, assessmentId: number | null) => {
      setIsOpenDetailsModal(false);
      setIsAddQuestionAssignModal(true);
      setSelectedItemId(itemId);
      setSelectedAssessmentId(assessmentId);
    },
    [],
  );

  const deleteSubjectItem = async (subjectId: number) => {
    let response = await deleteAssessmentQuestionSet(subjectId);
    if (isResponseSuccess(response)) {
      successStack(
        <IntlMessages
          id='common.subject_deleted_successfully'
          values={{subject: <IntlMessages id='subject.label' />}}
        />,
      );
      refreshDataTable();
    }
  };

  const refreshDataTable = useCallback(() => {
    mutateSubjects();
  }, [mutateSubjects]);

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
        Header: messages['assessment.label'],
        accessor: 'assessment_title',
      },
      {
        Header: messages['question_set.title'],
        accessor: 'title',
      },
      {
        Header: messages['question_set.title_en'],
        accessor: 'title_en',
      },
      {
        Header: messages['common.actions'],
        Cell: (props: any) => {
          let data = props.row.original;
          return (
            <DatatableButtonGroup>
              <ReadButton
                onClick={() => openDetailsModal(data.id, data?.assessment_id)}
              />
              <EditButton
                onClick={() => openAddEditModal(data.id, data?.assessment_id)}
              />
              <CommonButton
                onClick={() =>
                  openAddQuestionModal(data.id, data?.assessment_id)
                }
                btnText='assessment.addQuestion'
                startIcon={<FiUserCheck style={{marginLeft: '5px'}} />}
                color='secondary'
              />
              <DeleteButton
                deleteAction={() => deleteSubjectItem(data.id)}
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

  return (
    <>
      <PageBlock
        title={
          <>
            <IconCourse /> <IntlMessages id='assessment_question_set.label' />
          </>
        }
        extra={[
          <AddButton
            key={1}
            onClick={() => openAddEditModal(null, null)}
            isLoading={isLoadingSubjects}
            tooltip={
              <IntlMessages
                id={'common.add_new'}
                values={{
                  subject: messages['subject.label'],
                }}
              />
            }
          />,
        ]}>
        <ReactTable
          columns={columns}
          data={subjects || []}
          loading={isLoadingSubjects}
          skipDefaultFilter={true}
        />
        {isOpenAddEditModal && (
          <QuestionSetAddEditPopup
            key={1}
            onClose={closeAddEditModal}
            itemId={selectedItemId}
            refreshDataTable={refreshDataTable}
          />
        )}

        {isOpenDetailsModal && selectedItemId && (
          <QuestionSetDetailsPopup
            key={1}
            itemId={selectedItemId}
            onClose={closeDetailsModal}
            openEditModal={openAddEditModal}
          />
        )}

        {isOpenAddQuestionModal && selectedItemId && selectedAssessmentId && (
          <AddQuestionPopup
            key={1}
            onClose={closeAddQuestionModal}
            itemId={selectedItemId}
            assessmentId={selectedAssessmentId}
            refreshDataTable={refreshDataTable}
          />
        )}
      </PageBlock>
    </>
  );
};

export default QuestionSetPage;

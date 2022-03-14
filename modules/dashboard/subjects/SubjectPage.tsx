import React, { useCallback, useMemo, useState } from "react";
import PageBlock from "../../../@softbd/utilities/PageBlock";
import AddButton from "../../../@softbd/elements/button/AddButton/AddButton";
import { useIntl } from "react-intl";
import ReadButton from "../../../@softbd/elements/button/ReadButton/ReadButton";
import EditButton from "../../../@softbd/elements/button/EditButton/EditButton";
import DeleteButton from "../../../@softbd/elements/button/DeleteButton/DeleteButton";
import DatatableButtonGroup from "../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup";
import ReactTable from "../../../@softbd/table/Table/ReactTable";
import SubjectAddEditPopup from "./SubjectAddEditPopup";
import SubjectDetailsPopup from "./SubjectDetailsPopup";
import IntlMessages from "../../../@crema/utility/IntlMessages";
import useNotiStack from "../../../@softbd/hooks/useNotifyStack";
import { isResponseSuccess } from "../../../@softbd/utilities/helpers";
import { deleteSubject } from "../../../services/CertificateAuthorityManagement/SubjectService";
import { useFetchSubjects } from "../../../services/CertificateAuthorityManagement/hooks";
import IconCourse from "../../../@softbd/icons/IconCourse";

const SubjectPage = () => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();

  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);
  const [subjectFilters] = useState({});
  const {
    data: subjects,
    isLoading: isLoadingSubjects,
    mutate: mutateSubjects,
  } = useFetchSubjects(subjectFilters);

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

  const deleteSubjectItem = async (subjectId: number) => {
    let response = await deleteSubject(subjectId);
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
        Header: messages['common.title'],
        accessor: 'title',
      },
      {
        Header: messages['common.title_en'],
        accessor: 'title_en',
        inVisible: false,
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
            <IconCourse /> <IntlMessages id='subjects.label' />
          </>
        }
        extra={[
          <AddButton
            key={1}
            onClick={() => openAddEditModal(null)}
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
          <SubjectAddEditPopup
            key={1}
            onClose={closeAddEditModal}
            itemId={selectedItemId}
            refreshDataTable={refreshDataTable}
          />
        )}

        {isOpenDetailsModal && selectedItemId && (
          <SubjectDetailsPopup
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

export default SubjectPage;

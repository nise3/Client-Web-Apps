import React, {useCallback, useEffect, useMemo, useState} from 'react';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import AddButton from '../../../@softbd/elements/button/AddButton/AddButton';
import {useIntl} from 'react-intl';
import ReadButton from '../../../@softbd/elements/button/ReadButton/ReadButton';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import DeleteButton from '../../../@softbd/elements/button/DeleteButton/DeleteButton';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import {API_COURSES} from '../../../@softbd/common/apiRoutes';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import CustomChipRowStatus from '../../../@softbd/elements/display/CustomChipRowStatus/CustomChipRowStatus';

import IntlMessages from '../../../@crema/utility/IntlMessages';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {deleteCourse} from '../../../services/instituteManagement/CourseService';
import {
  getCalculatedSerialNo,
  isResponseSuccess,
} from '../../../@softbd/utilities/helpers';
import IconCourse from '../../../@softbd/icons/IconCourse';
import LocaleLanguage from '../../../@softbd/utilities/LocaleLanguage';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import {CommonAuthUser} from '../../../redux/types/models/CommonAuthUser';
import {LEVEL} from './CourseEnums';
import {useFetchCertificateIssue, useFetchPublicSkills} from '../../../services/youthManagement/hooks';
import RowStatus from '../../../@softbd/utilities/RowStatus';
import { useFetchBatch, useFetchBatches } from '../../../services/instituteManagement/hooks';

const CertificateIssuePage = () => {
  const {messages, locale} = useIntl();
  const {successStack} = useNotiStack();
  const authUser = useAuthUser<CommonAuthUser>();
  console.log('AUTH USER ', authUser);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
//   const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);
//   const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);
  const [isToggleTable, setIsToggleTable] = useState<boolean>(false);

  const [certificateIssueFilter] = useState<any>({
    row_status: RowStatus.ACTIVE,
  });
  const {data: issuedList} = useFetchCertificateIssue(certificateIssueFilter);
  const [issueFilterItems, setIssueFilterItems] = useState([]);

  useEffect(() => {
    if (issuedList) {
      setIssueFilterItems(
        issuedList.map((skill: any) => {
          return {id: skill?.id, title: skill?.title};
        }),
      );
    }
  }, [issuedList]);
//   const closeAddEditModal = useCallback(() => {
//     setIsOpenAddEditModal(false);
//     setSelectedItemId(null);
//   }, []);

//   const openAddEditModal = useCallback((itemId: number | null = null) => {
//     setIsOpenDetailsModal(false);
//     setIsOpenAddEditModal(true);
//     setSelectedItemId(itemId);
//   }, []);

//   const openDetailsModal = useCallback(
//     (itemId: number) => {
//       setIsOpenDetailsModal(true);
//       setSelectedItemId(itemId);
//     },
//     [selectedItemId],
//   );

//   const closeDetailsModal = useCallback(() => {
//     setIsOpenDetailsModal(false);
//   }, []);

  const deleteIssuedItem = async (courseId: number) => {
    let response = await deleteCourse(courseId);
    if (isResponseSuccess(response)) {
      successStack(
        <IntlMessages
          id='common.subject_deleted_successfully'
          values={{subject: <IntlMessages id='course.label' />}}
        />,
      );
      refreshDataTable();
    }
  };

//   const courseLevelFilterItems = [
//     {id: LEVEL.BEGINNER, title: messages['level.beginner'] as string},
//     {id: LEVEL.INTERMEDIATE, title: messages['level.intermediate'] as string},
//     {id: LEVEL.EXPERT, title: messages['level.expert'] as string},
//   ];

//   const refreshDataTable = useCallback(() => {
//     setIsToggleTable((prevToggle: any) => !prevToggle);
//   }, [isToggleTable]);

  const columns = useMemo(
    () => [
      {
        Header: '#',
        disableFilters: true,
        disableSortBy: true,
        Cell: (props: any) => {
          return getCalculatedSerialNo(
            props.row.index,
            props.currentPageIndex,
            props.currentPageSize,
          );
        },
      },
      {
        Header: messages['certificate.label'],
        accessor: 'certificate_id',
      },
      {
        Header: messages['menu.batch'],
        accessor: 'batch_id'
      },
      {
        Header: messages['common.youth'],
        accessor: 'youth_id',
      },

    //   {
    //     Header: messages['common.skills'],
    //     accessor: 'skills',
    //     filter: 'selectFilter',
    //     selectFilterItems: skillFilterItems,
    //     isVisible: false,
    //   },
    //   {
    //     Header: messages['institute.label'],
    //     accessor: 'institute_title',
    //     isVisible: locale == LocaleLanguage.BN && authUser?.isSystemUser,
    //     disableFilters: !authUser?.isSystemUser || locale == LocaleLanguage.EN,
    //   },
    //   {
    //     Header: messages['institute.label'],
    //     accessor: 'institute_title_en',
    //     isVisible: locale == LocaleLanguage.EN && authUser?.isSystemUser,
    //     disableFilters: !authUser?.isSystemUser || locale == LocaleLanguage.BN,
    //   },
      
    //   {
    //     Header: messages['course.course_level'],
    //     accessor: 'level',
    //     filter: 'selectFilter',
    //     selectFilterItems: courseLevelFilterItems,
    //     Cell: (props: any) => {
    //       let data = props.row.original;
    //       if (data?.level == LEVEL.BEGINNER) {
    //         return <>{messages['level.beginner']}</>;
    //       } else if (data?.level == LEVEL.INTERMEDIATE) {
    //         return <>{messages['level.intermediate']}</>;
    //       } else {
    //         return <>{messages['level.expert']}</>;
    //       }
    //     },
    //   },
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
              {/* <ReadButton onClick={() => openDetailsModal(data.id)} />
              <EditButton onClick={() => openAddEditModal(data.id)} /> */}
              <DeleteButton
                deleteAction={() => deleteIssuedItem(data.id)}
                deleteTitle={messages['common.delete_confirm'] as string}
              />
            </DatatableButtonGroup>
          );
        },
        sortable: false,
      },
    ],
    [messages, locale, issueFilterItems],
  );

  const {onFetchData, data, loading, pageCount, totalCount} =
    useReactTableFetchData({
      urlPath: 'http://192.168.13.215:8001/api/v1/certificates',
    });

  return (
    <>
      <PageBlock
        title={
          <>
            <IconCourse /> <IntlMessages id='certificate.certificate_issue' />
          </>
        }
        // extra={[
        //   <AddButton
        //     key={1}
        //     // onClick={() => openAddEditModal(null)}
        //     onClick={() => {}}
        //     isLoading={loading}
        //     tooltip={
        //       <IntlMessages
        //         id={'common.add_new'}
        //         values={{
        //           subject: messages['course.label'],
        //         }}
        //       />
        //     }
        //   />,
        // ]}
        >
        <ReactTable
          columns={columns}
          data={data}
          fetchData={onFetchData}
          loading={loading}
          pageCount={pageCount}
          totalCount={totalCount}
          toggleResetTable={isToggleTable}
        />
        {/* {isOpenAddEditModal && (
          <CourseAddEditPopup
            key={1}
            onClose={closeAddEditModal}
            itemId={selectedItemId}
            refreshDataTable={refreshDataTable}
          />
        )} */}

        {/* {isOpenDetailsModal && selectedItemId && (
          <CourseDetailsPopup
            key={1}
            itemId={selectedItemId}
            onClose={closeDetailsModal}
            openEditModal={openAddEditModal}
          />
        )} */}
      </PageBlock>
    </>
  );
};

export default CertificateIssuePage;
function refreshDataTable() {
    throw new Error('Function not implemented.');
}


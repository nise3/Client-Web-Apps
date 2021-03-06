import React, {useCallback, useEffect, useMemo, useState} from 'react';
import PageBlock from '../../../../@softbd/utilities/PageBlock';
import AddButton from '../../../../@softbd/elements/button/AddButton/AddButton';
import {useIntl} from 'react-intl';
import ReadButton from '../../../../@softbd/elements/button/ReadButton/ReadButton';
import EditButton from '../../../../@softbd/elements/button/EditButton/EditButton';
import DeleteButton from '../../../../@softbd/elements/button/DeleteButton/DeleteButton';
import DatatableButtonGroup from '../../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import ReactTable from '../../../../@softbd/table/Table/ReactTable';
import FourIRCourseAddEditPopup from './FourIRCourseAddEditPopup';
import FourIRCourseDetailsPopup from './FourIRCourseDetailsPopup';
import CustomChipRowStatus from '../../../../@softbd/elements/display/CustomChipRowStatus/CustomChipRowStatus';

import IntlMessages from '../../../../@crema/utility/IntlMessages';
import useNotiStack from '../../../../@softbd/hooks/useNotifyStack';
import {
  getCalculatedSerialNo,
  isResponseSuccess,
} from '../../../../@softbd/utilities/helpers';
import IconCourse from '../../../../@softbd/icons/IconCourse';
import LocaleLanguage from '../../../../@softbd/utilities/LocaleLanguage';
import {useAuthUser} from '../../../../@crema/utility/AppHooks';
import {CommonAuthUser} from '../../../../redux/types/models/CommonAuthUser';
import {useFetchPublicSkills} from '../../../../services/youthManagement/hooks';
import RowStatus from '../../../../@softbd/utilities/RowStatus';
import {getBrowserCookie} from '../../../../@softbd/libs/cookieInstance';
import {COOKIE_KEY_APP_CURRENT_LANG} from '../../../../shared/constants/AppConst';
import {LEVEL} from '../../courses/CourseEnums';
import {
  approveFourIRCourse,
  deleteFourIRCourse,
} from '../../../../services/4IRManagement/CourseService';
import CommonButton from '../../../../@softbd/elements/button/CommonButton/CommonButton';
import useReactTableFetchData from '../../../../@softbd/hooks/useReactTableFetchData';
import {API_4IR_COURSE} from '../../../../@softbd/common/apiRoutes';
import ApproveButton from '../../industry-associations/ApproveButton';
import {processServerSideErrors} from '../../../../@softbd/utilities/validationErrorHandler';
import {IPageHeader} from '../../4IRSteppers';

interface IFourIRCoursePageProps {
  fourIRInitiativeId: number;
  pageHeader: IPageHeader;
  showEnrollmentHandler: (id: number | null) => void;
}

const FourIRCoursePage = ({
  fourIRInitiativeId,
  pageHeader,
  showEnrollmentHandler,
}: IFourIRCoursePageProps) => {
  const {messages, locale} = useIntl();
  const {successStack, errorStack} = useNotiStack();
  const authUser = useAuthUser<CommonAuthUser>();
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);
  const [isToggleTable, setIsToggleTable] = useState<boolean>(false);
  const language = getBrowserCookie(COOKIE_KEY_APP_CURRENT_LANG) || 'bn';

  const [youthSkillsFilter] = useState<any>({
    row_status: RowStatus.ACTIVE,
  });
  const {data: skills} = useFetchPublicSkills(youthSkillsFilter);

  const [skillFilterItems, setSkillFilterItems] = useState([]);

  useEffect(() => {
    if (skills) {
      setSkillFilterItems(
        skills.map((skill: any) => {
          if (language === 'bn') {
            return {
              id: skill?.id,
              title: skill?.title,
            };
          } else {
            return {
              id: skill?.id,
              title: skill?.title_en,
            };
          }
        }),
      );
    }
  }, [skills, language]);

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

  const deleteCourseItem = async (courseId: number) => {
    try {
      let response = await deleteFourIRCourse(courseId);
      if (isResponseSuccess(response)) {
        successStack(
          <IntlMessages
            id='common.subject_deleted_successfully'
            values={{subject: <IntlMessages id='4ir_course.label' />}}
          />,
        );
        refreshDataTable();
      }
    } catch (error: any) {
      processServerSideErrors({
        error,
        errorStack,
      });
    }
  };

  const courseLevelFilterItems = [
    {id: LEVEL.BEGINNER, title: messages['level.beginner'] as string},
    {id: LEVEL.INTERMEDIATE, title: messages['level.intermediate'] as string},
    {id: LEVEL.EXPERT, title: messages['level.expert'] as string},
  ];

  const refreshDataTable = useCallback(() => {
    setIsToggleTable((prevToggle: any) => !prevToggle);
  }, [isToggleTable]);

  const approveCourse = async (courseId: number) => {
    let response = await approveFourIRCourse(courseId);
    if (isResponseSuccess(response)) {
      {
        successStack(<IntlMessages id='course.approved' />);
      }
      refreshDataTable();
    }
  };

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
        Header: messages['common.title'],
        accessor: 'title',
      },

      {
        Header: messages['common.skills'],
        accessor: 'skills',
        filter: 'selectFilter',
        selectFilterItems: skillFilterItems,
        isVisible: false,
      },
      {
        Header: messages['institute.label'],
        accessor: 'institute_title',
        isVisible: locale == LocaleLanguage.BN && authUser?.isSystemUser,
        disableFilters: !authUser?.isSystemUser || locale == LocaleLanguage.EN,
      },
      {
        Header: messages['institute.label'],
        accessor: 'institute_title_en',
        isVisible: locale == LocaleLanguage.EN && authUser?.isSystemUser,
        disableFilters: !authUser?.isSystemUser || locale == LocaleLanguage.BN,
      },
      {
        Header: messages['course.fee'],
        accessor: 'course_fee',
        disableFilters: true,
      },
      {
        Header: messages['course.duration'],
        accessor: 'duration',
        disableFilters: true,
      },
      {
        Header: messages['course.course_level'],
        accessor: 'level',
        filter: 'selectFilter',
        selectFilterItems: courseLevelFilterItems,
        Cell: (props: any) => {
          let data = props.row.original;
          if (data?.level == LEVEL.BEGINNER) {
            return <>{messages['level.beginner']}</>;
          } else if (data?.level == LEVEL.INTERMEDIATE) {
            return <>{messages['level.intermediate']}</>;
          } else {
            return <>{messages['level.expert']}</>;
          }
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
              {data?.row_status == 0 && authUser?.isSystemUser && (
                <ApproveButton
                  approveAction={() => approveCourse(data.id)}
                  approveTitle={messages['course.approve'] as string}
                  buttonText={messages['course.approve'] as string}
                />
              )}
              <DeleteButton
                deleteAction={() => deleteCourseItem(data.id)}
                deleteTitle={messages['common.delete_confirm'] as string}
              />
              {data?.row_status == 0 ? (
                <CommonButton
                  disabled
                  btnText={'enrollment_view_enrollment'}
                  onClick={() => showEnrollmentHandler(data.id)}
                />
              ) : (
                <CommonButton
                  btnText={'enrollment_view_enrollment'}
                  onClick={() => showEnrollmentHandler(data.id)}
                />
              )}
            </DatatableButtonGroup>
          );
        },
        sortable: false,
      },
    ],
    [messages, locale, skillFilterItems],
  );

  const {onFetchData, data, loading, pageCount, totalCount} =
    useReactTableFetchData({
      urlPath: API_4IR_COURSE,
      paramsValueModifier: (params) => {
        params['four_ir_initiative_id'] = fourIRInitiativeId;
        return params;
      },
    });

  return (
    <>
      <PageBlock
        title={
          <>
            <IconCourse /> <IntlMessages id='course.label' />{' '}
            {`(${pageHeader?.tagline_name} > ${pageHeader?.initative_name})`}
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
                  subject: messages['course.label'],
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
          <FourIRCourseAddEditPopup
            key={1}
            onClose={closeAddEditModal}
            fourIRInitiativeId={fourIRInitiativeId}
            itemId={selectedItemId}
            refreshDataTable={refreshDataTable}
          />
        )}

        {isOpenDetailsModal && selectedItemId && (
          <FourIRCourseDetailsPopup
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

export default FourIRCoursePage;

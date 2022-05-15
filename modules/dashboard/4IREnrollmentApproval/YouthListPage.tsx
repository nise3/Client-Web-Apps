import React, {useEffect, useMemo, useState} from 'react';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import {useIntl} from 'react-intl';
import ReadButton from '../../../@softbd/elements/button/ReadButton/ReadButton';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import {API_COURSE_ENROLLMENTS} from '../../../@softbd/common/apiRoutes';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import CustomChipRowStatus from '../../../@softbd/elements/display/CustomChipRowStatus/CustomChipRowStatus';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {getCalculatedSerialNo} from '../../../@softbd/utilities/helpers';
import IconCourse from '../../../@softbd/icons/IconCourse';
import LocaleLanguage from '../../../@softbd/utilities/LocaleLanguage';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import {CommonAuthUser} from '../../../redux/types/models/CommonAuthUser';
import {useFetchPublicSkills} from '../../../services/youthManagement/hooks';
import RowStatus from '../../../@softbd/utilities/RowStatus';
import {getBrowserCookie} from '../../../@softbd/libs/cookieInstance';
import {COOKIE_KEY_APP_CURRENT_LANG} from '../../../shared/constants/AppConst';
import {LEVEL} from '../courses/CourseEnums';

interface IFourIRCoursePageProps {
  fourIRInitiativeId: number;
  setSelectedCourseId: any;
}

const FourIRCoursePage = ({
  fourIRInitiativeId,
  setSelectedCourseId,
}: IFourIRCoursePageProps) => {
  const {messages, locale} = useIntl();
  const authUser = useAuthUser<CommonAuthUser>();
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

  const courseLevelFilterItems = [
    {id: LEVEL.BEGINNER, title: messages['level.beginner'] as string},
    {id: LEVEL.INTERMEDIATE, title: messages['level.intermediate'] as string},
    {id: LEVEL.EXPERT, title: messages['level.expert'] as string},
  ];

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
              <ReadButton onClick={() => setSelectedCourseId(data.id)} />
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
      urlPath: API_COURSE_ENROLLMENTS,
    });

  return (
    <>
      <PageBlock
        title={
          <>
            <IconCourse /> <IntlMessages id='course.label' />
          </>
        }>
        <ReactTable
          columns={columns}
          data={data}
          fetchData={onFetchData}
          loading={loading}
          pageCount={pageCount}
          totalCount={totalCount}
        />
      </PageBlock>
    </>
  );
};

export default FourIRCoursePage;

import React, {useEffect, useMemo, useState} from 'react';
import PageBlock from '../../../../@softbd/utilities/PageBlock';
import {useIntl} from 'react-intl';
import DatatableButtonGroup from '../../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';

import ReactTable from '../../../../@softbd/table/Table/ReactTable';
import CustomChipRowStatus from '../../../../@softbd/elements/display/CustomChipRowStatus/CustomChipRowStatus';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import {getCalculatedSerialNo} from '../../../../@softbd/utilities/helpers';
import IconCourse from '../../../../@softbd/icons/IconCourse';
import LocaleLanguage from '../../../../@softbd/utilities/LocaleLanguage';
import {useAuthUser} from '../../../../@crema/utility/AppHooks';
import {CommonAuthUser} from '../../../../redux/types/models/CommonAuthUser';
import {useFetchPublicSkills} from '../../../../services/youthManagement/hooks';
import RowStatus from '../../../../@softbd/utilities/RowStatus';
import {getBrowserCookie} from '../../../../@softbd/libs/cookieInstance';
import {COOKIE_KEY_APP_CURRENT_LANG} from '../../../../shared/constants/AppConst';
import {LEVEL} from '../../courses/CourseEnums';
import CommonButton from '../../../../@softbd/elements/button/CommonButton/CommonButton';
import {useRouter} from 'next/router';
import {
  useFetch4IRInitiative,
  useFetchFourIRTagline,
} from '../../../../services/4IRManagement/hooks';

interface ICourseListPage {
  fourIRInitiativeId: number;
  setSelectedCourseId: any;
  onFetchData: any;
  data: any;
  loading: any;
  pageCount: any;
  totalCount: any;
}

const CourseListPage = ({
  setSelectedCourseId,
  onFetchData,
  data,
  loading,
  pageCount,
  totalCount,
}: ICourseListPage) => {
  const {messages, locale} = useIntl();
  const authUser = useAuthUser<CommonAuthUser>();
  const language = getBrowserCookie(COOKIE_KEY_APP_CURRENT_LANG) || 'bn';

  const [youthSkillsFilter] = useState<any>({
    row_status: RowStatus.ACTIVE,
  });
  const {data: skills} = useFetchPublicSkills(youthSkillsFilter);

  const router = useRouter();
  const taglineId = Number(router.query.taglineId);
  const initativeId = Number(router.query.initiativeId);
  const {data: tagline} = useFetchFourIRTagline(Number(taglineId));
  const {data: initaitive} = useFetch4IRInitiative(initativeId);

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
        Header: messages['applicationManagement.courseTitle'],
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
        // isVisible: locale == LocaleLanguage.EN && authUser?.isSystemUser,
        isVisible: false,
        disableFilters: !authUser?.isSystemUser || locale == LocaleLanguage.BN,
      },

      {
        Header: messages['course.course_level'],
        accessor: 'level',
        filter: 'selectFilter',
        isVisible: false,
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
        isVisible: false,
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
              <CommonButton
                btnText={'enrollment_view_enrollment'}
                onClick={() => setSelectedCourseId(data.id)}
              />
            </DatatableButtonGroup>
          );
        },
        sortable: false,
      },
    ],
    [messages, locale, skillFilterItems],
  );

  return (
    <>
      <PageBlock
        title={
          <>
            <IconCourse /> <IntlMessages id='course.label' />{' '}
            {`(${tagline?.name} > ${initaitive?.name})`}
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

export default CourseListPage;

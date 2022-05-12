import React, {useEffect, useMemo, useState} from 'react';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import {useIntl} from 'react-intl';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import {API_YOUTHS} from '../../../@softbd/common/apiRoutes';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import CustomChipRowStatus from '../../../@softbd/elements/display/CustomChipRowStatus/CustomChipRowStatus';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import IconStaticPage from '../../../@softbd/icons/IconStaticPage';
import Genders from '../../../@softbd/utilities/Genders';
import {useRouter} from 'next/router';
import CommonButton from '../../../@softbd/elements/button/CommonButton/CommonButton';
import {FiUser} from 'react-icons/fi';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import {useFetchPublicSkills} from '../../../services/youthManagement/hooks';
import {ISelectFilterItem} from '../../../shared/Interface/common.interface';
import {Link} from '../../../@softbd/elements/common';
import {getCalculatedSerialNo} from '../../../@softbd/utilities/helpers';
import {getBrowserCookie} from '../../../@softbd/libs/cookieInstance';
import {COOKIE_KEY_APP_CURRENT_LANG} from '../../../shared/constants/AppConst';

const CVBankPage = () => {
  const {messages} = useIntl();

  const language = getBrowserCookie(COOKIE_KEY_APP_CURRENT_LANG) || 'bn';
  const router = useRouter();
  const path = router.pathname;
  const [skillFilters] = useState<any>({});
  const {data: skills} = useFetchPublicSkills(skillFilters);
  const [skillFilterItems, setSkillFilterItems] = useState<
    Array<ISelectFilterItem>
  >([]);

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
        Header: messages['youth.username'],
        accessor: 'username',
        isVisible: false,
        disableFilters: true,
      },
      {
        Header: messages['common.first_name'],
        accessor: 'first_name',
        disableFilters: true,
      },

      {
        Header: messages['common.last_name'],
        accessor: 'last_name',
        disableFilters: true,
      },
      {
        Header: messages['youth.gender'],
        accessor: 'gender_label',
        isVisible: false,
        disableFilters: true,
      },
      {
        Header: messages['youth.mobile'],
        accessor: 'mobile',
        disableFilters: true,
        isVisible: false,
      },
      {
        Header: messages['common.search_3'],
        accessor: 'search_text',
        isVisible: false,
        permanentVisible: true,
      },
      {
        Header: messages['skill.label'],
        accessor: 'skill_ids',
        isVisible: false,
        filter: 'selectFilter',
        selectFilterItems: skillFilterItems,
        Cell: (props: any) => {
          const {skills} = props?.row?.original;
          return skills?.map((skill: any) => (
            <p key={skill?.id}>{skill?.title_en}</p>
          ));
        },
      },
      {
        Header: messages['youth.email'],
        accessor: 'email',
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
              <Link href={`${path}/${data?.id}`}>
                <CommonButton
                  btnText='applicationManagement.viewCV'
                  startIcon={<FiUser style={{marginLeft: '5px'}} />}
                  variant={'text'}
                />
              </Link>
              {/*<CommonButton*/}
              {/*  onClick={() => {}}*/}
              {/*  btnText='common.interview'*/}
              {/*  startIcon={<FiMessageCircle style={{marginLeft: '5px'}} />}*/}
              {/*  color='primary'*/}
              {/*/>*/}
              {/*<CommonButton*/}
              {/*  onClick={() => {}}*/}
              {/*  btnText='common.hire'*/}
              {/*  startIcon={<FiUserCheck style={{marginLeft: '5px'}} />}*/}
              {/*  color='secondary'*/}
              {/*/>*/}
              {/*<CommonButton*/}
              {/*  btnText='common.download'*/}
              {/*  startIcon={<FiDownload style={{marginLeft: '5px'}} />}*/}
              {/*  color='inherit'*/}
              {/*/>*/}
            </DatatableButtonGroup>
          );
        },
        sortable: false,
      },
    ],
    [messages, skillFilterItems],
  );

  const {onFetchData, data, loading, pageCount, totalCount} =
    useReactTableFetchData({
      urlPath: API_YOUTHS,
    });

  const filteredData = data.map((youth: any) => {
    let gender_label: string;
    if (youth.gender === parseInt(Genders.MALE)) {
      gender_label = 'Male';
    } else if (youth.gender === parseInt(Genders.FEMALE)) {
      gender_label = 'Female';
    } else {
      gender_label = 'Others';
    }
    return {
      ...youth,
      gender_label,
    };
  });

  return (
    <>
      <PageBlock
        title={
          <>
            <IconStaticPage /> <IntlMessages id='common.cv_bank' />
          </>
        }>
        <ReactTable
          columns={columns}
          data={filteredData}
          fetchData={onFetchData}
          loading={loading}
          pageCount={pageCount}
          totalCount={totalCount}
        />
      </PageBlock>
    </>
  );
};

export default CVBankPage;

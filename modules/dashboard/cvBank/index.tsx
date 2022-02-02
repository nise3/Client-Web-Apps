import React, {useEffect, useMemo, useState} from 'react';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import {useIntl} from 'react-intl';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import {API_YOUTHS} from '../../../@softbd/common/apiRoutes';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import CustomChipRowStatus from '../../../@softbd/elements/display/CustomChipRowStatus/CustomChipRowStatus';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import IconUser from '../../../@softbd/icons/IconUser';
import Genders from '../../../@softbd/utilities/Genders';
import {useRouter} from 'next/router';
import NextLink from 'next/link';
import {Link} from '@mui/material';
import CommonButton from '../../../@softbd/elements/button/CommonButton/CommonButton';
import {FiDownload, FiMessageCircle, FiUser, FiUserCheck} from 'react-icons/fi';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import {useFetchPublicSkills} from '../../../services/youthManagement/hooks';
import {ISelectFilterItem} from '../../../shared/Interface/common.interface';

const CVBankPage = () => {
  const {messages} = useIntl();

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
          return {
            id: skill.id,
            title: skill.title,
          };
        }),
      );
    }
  }, [skills]);

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
        Header: messages['youth.username'],
        accessor: 'username',
        isVisible: false,
        disableFilters: true,
      },
      {
        Header: messages['common.first_name_bn'],
        accessor: 'first_name',
      },
      {
        Header: messages['common.last_name_bn'],
        accessor: 'last_name',
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
              <NextLink href={`${path}/${data?.id}`} passHref={true}>
                <Link underline='none'>
                  <CommonButton
                    btnText='applicationManagement.viewCV'
                    startIcon={<FiUser style={{marginLeft: '5px'}} />}
                    variant={'text'}
                  />
                </Link>
              </NextLink>
              <CommonButton
                onClick={() => {}}
                btnText='common.interview'
                startIcon={<FiMessageCircle style={{marginLeft: '5px'}} />}
                color='primary'
              />
              <CommonButton
                onClick={() => {}}
                btnText='common.hire'
                startIcon={<FiUserCheck style={{marginLeft: '5px'}} />}
                color='secondary'
              />
              <CommonButton
                btnText='common.download'
                startIcon={<FiDownload style={{marginLeft: '5px'}} />}
                color='inherit'
              />
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
            <IconUser /> <IntlMessages id='common.cv_bank' />
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

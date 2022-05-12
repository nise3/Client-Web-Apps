import React, {useCallback, useEffect, useMemo, useState} from 'react';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import {useIntl} from 'react-intl';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import IconJobSector from '../../../@softbd/icons/IconJobSector';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import {API_HUMAN_RESOURCE_DEMAND} from '../../../@softbd/common/apiRoutes';
import HumanResourceDemandMangePopup from './HumanResourceDemandMangePopup';
import CustomChipApprovalStatus from './CustomChipApprovalStatus';
import {HrDemandApprovalStatusByIndustry} from './HrDemandEnums';
import ReadButton from '../../../@softbd/elements/button/ReadButton/ReadButton';
import Link from 'next/link';
import {LINK_HUMAN_RESOURCE_DEMAND} from '../../../@softbd/common/appLinks';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import LocaleLanguage from '../../../@softbd/utilities/LocaleLanguage';
import PersonIcon from '@mui/icons-material/Person';
import CustomChip from '../../../@softbd/elements/display/CustomChip/CustomChip';
import HumanResourceDemandDetailsPopup from './HumanResourceDemandDetailsPopup';
import {getCalculatedSerialNo} from '../../../@softbd/utilities/helpers';
import moment from 'moment';
import CommonButton from '../../../@softbd/elements/button/CommonButton/CommonButton';

import {useFetchPublicSkills} from '../../../services/youthManagement/hooks';
import {ISelectFilterItem} from '../../../shared/Interface/common.interface';
import {getBrowserCookie} from '../../../@softbd/libs/cookieInstance';
import {COOKIE_KEY_APP_CURRENT_LANG} from '../../../shared/constants/AppConst';

const HumanResourceDemandPage = () => {
  const {messages, locale} = useIntl();
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);
  const [isToggleTable, setIsToggleTable] = useState<boolean>(false);
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);
  const openAddEditModal = useCallback((itemId: number | null = null) => {
    setIsOpenAddEditModal(true);
    setIsOpenDetailsModal(false);
    setSelectedItemId(itemId);
  }, []);

  const language = getBrowserCookie(COOKIE_KEY_APP_CURRENT_LANG) || 'bn';
  const [skillFilters] = useState<any>({});
  const {data: skills} = useFetchPublicSkills(skillFilters);
  const [skillFilterItems, setSkillFilterItems] = useState<
    Array<ISelectFilterItem>
  >([]);

  const approvalStatusFilterItems = [
    {
      id: HrDemandApprovalStatusByIndustry.APPROVED,
      title: messages['common.approved'],
    },
    {
      id: HrDemandApprovalStatusByIndustry.REJECTED,
      title: messages['common.rejected'],
    },
  ];
  const closeAddEditModal = useCallback(() => {
    setIsOpenAddEditModal(false);
    setSelectedItemId(null);
  }, []);

  const openDetailsModal = useCallback(
    (itemId: number) => {
      setIsOpenDetailsModal(true);
      setSelectedItemId(itemId);
    },
    [selectedItemId],
  );

  const closeDetailsModal = useCallback(() => {
    setIsOpenAddEditModal(false);
    setIsOpenDetailsModal(false);
  }, []);

  const refreshDataTable = useCallback(() => {
    setIsToggleTable((previousToggle) => !previousToggle);
  }, []);

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
  }, [skills]);

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
        Header: messages['organization.label'],
        accessor: 'organization_title',
        disableFilters: true,
        isVisible: locale == LocaleLanguage.BN,
        //disableFilters: locale == LocaleLanguage.EN,
      },
      {
        Header: messages['organization.label_en'],
        accessor: 'organization_title_en',
        disableFilters: true,
        isVisible: locale == LocaleLanguage.EN,
        //disableFilters: locale == LocaleLanguage.BN,
      },
      {
        Header: messages['common.vacancy'],
        accessor: 'hr_demand.vacancy',
        disableFilters: true,
        Cell: (props: any) => {
          let data: any = props.row.original;
          return (
            <CustomChip
              icon={<PersonIcon fontSize={'small'} />}
              color={'primary'}
              label={data.hr_demand?.vacancy}
            />
          );
        },
      },
      {
        Header: messages['common.provided_vacancy'],
        accessor: 'vacancy_provided_by_institute',
        disableFilters: true,
        Cell: (props: any) => {
          let data: any = props.row.original;
          return (
            <CustomChip
              icon={<PersonIcon fontSize={'small'} />}
              color={'primary'}
              label={data.vacancy_provided_by_institute}
            />
          );
        },
      },
      {
        Header: messages['common.approved_vacancy'],
        accessor: 'vacancy_approved_by_industry_association',
        disableFilters: true,
        Cell: (props: any) => {
          let data: any = props.row.original;
          return (
            <CustomChip
              icon={<PersonIcon fontSize={'small'} />}
              color={'primary'}
              label={data.vacancy_approved_by_industry_association}
            />
          );
        },
      },
      {
        Header: messages['common.mandatory_skills'],
        accessor: 'skill_ids',
        filter: 'selectFilter',
        isVisible: false,
        selectFilterItems: skillFilterItems,
        Cell: (props: any) => {
          const data = props?.row?.original;
          return data?.hr_demand?.mandatory_skills?.map((skill: any) => (
            <>{skill?.title_en + `, `}</>
          ));
        },
      },
      {
        Header: messages['common.approval_status'],
        accessor: 'rejected_by_industry_association',
        filter: 'selectFilter',
        disableFilters: true,
        selectFilterItems: approvalStatusFilterItems,
        Cell: (props: any) => {
          let data = props.row.original;
          if (data?.rejected_by_industry_association == 1) {
            return (
              <CustomChipApprovalStatus
                value={HrDemandApprovalStatusByIndustry.REJECTED}
                variant={'filled'}
              />
            );
          } else if (
            data?.rejected_by_industry_association == 0 &&
            data?.vacancy_approved_by_industry_association == 0
          ) {
            return (
              <CustomChipApprovalStatus
                variant={'filled'}
                value={HrDemandApprovalStatusByIndustry.PENDING}
              />
            );
          } else {
            return (
              <CustomChipApprovalStatus
                variant={'filled'}
                value={HrDemandApprovalStatusByIndustry.APPROVED}
              />
            );
          }
        },
      },
      {
        Header: messages['common.actions'],
        Cell: (props: any) => {
          let data = props.row.original;
          const URL = LINK_HUMAN_RESOURCE_DEMAND + `/${data.id}`;
          return (
            <DatatableButtonGroup>
              <ReadButton onClick={() => openDetailsModal(data.id)} />
              {moment(data?.hr_demand?.end_date).isAfter(moment()) ? (
                <EditButton onClick={() => openAddEditModal(data.id)} />
              ) : (
                <CommonButton
                  onClick={() => openAddEditModal(data.id)}
                  disabled={true}
                  btnText={'hr_demand_deadline_exceeded.label'}
                />
              )}
              <Link href={URL + '?show_cv=1'} passHref>
                <ReadButton>{messages['common.cv_read']}</ReadButton>
              </Link>
              <Link href={URL + '?show_cv=0'} passHref>
                <ReadButton>{messages['common.youth_read']}</ReadButton>
              </Link>
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
      urlPath: API_HUMAN_RESOURCE_DEMAND,
    });

  return (
    <>
      <PageBlock
        title={
          <>
            <IconJobSector /> <IntlMessages id='hr_demand.label' />
          </>
        }>
        <ReactTable
          columns={columns}
          data={data || []}
          fetchData={onFetchData}
          loading={loading}
          pageCount={pageCount}
          totalCount={totalCount}
          toggleResetTable={isToggleTable}
        />
        {isOpenAddEditModal && (
          <HumanResourceDemandMangePopup
            refreshDataTable={refreshDataTable}
            itemId={selectedItemId}
            onClose={closeAddEditModal}
          />
        )}
        {isOpenDetailsModal && selectedItemId && (
          <HumanResourceDemandDetailsPopup
            key={1}
            itemId={selectedItemId}
            onClose={closeDetailsModal}
          />
        )}
      </PageBlock>
    </>
  );
};

export default HumanResourceDemandPage;

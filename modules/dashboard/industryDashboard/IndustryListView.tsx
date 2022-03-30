import React, {useMemo, useState} from 'react';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import {useIntl} from 'react-intl';
import {useFetchIndustryMembers} from '../../../services/IndustryManagement/hooks';
import LocaleLanguage from '../../../@softbd/utilities/LocaleLanguage';

const IndustryListView = () => {
  const {messages, locale, formatNumber} = useIntl();
  const [industryAssociationMembersFilter] = useState<any>({page_size: 5});
  const {data: memberList, isLoading} = useFetchIndustryMembers(
    industryAssociationMembersFilter,
  );

  const columns = useMemo(
    () => [
      {
        Header: '#',
        Cell: (props: any) => {
          return locale == LocaleLanguage.EN
            ? props.row.index + 1
            : formatNumber(props.row.index + 1);
        },
        disableFilters: true,
        disableSortBy: true,
      },
      {
        Header: messages['common.company_name_bn'],
        accessor: 'title',
        isVisible: locale == LocaleLanguage.BN,
      },
      {
        Header: messages['common.company_name_bn'],
        accessor: 'title_en',
        isVisible: locale == LocaleLanguage.EN,
      },
      // {
      //   Header: messages['common.contact_person_name'],
      //   accessor: 'contact_person_name',
      //   isVisible: locale == LocaleLanguage.BN,
      // },
      // {
      //   Header: messages['common.contact_person_name'],
      //   accessor: 'contact_person_name_en',
      //   isVisible: locale == LocaleLanguage.EN,
      // },
      // {
      //   Header: messages['common.contact_person_mobile'],
      //   accessor: 'contact_person_mobile',
      // },
      {
        Header: messages['common.address'],
        accessor: 'address',
        isVisible: locale == LocaleLanguage.BN,
      },
      {
        Header: messages['common.address'],
        accessor: 'address_en',
        isVisible: locale == LocaleLanguage.EN,
      },
      // {
      //   Header: messages['common.type'],
      //   accessor: 'type',
      // },
      // {
      //   Header: messages['dashboard.new_recruits'],
      //   accessor: 'new_recruit',
      // },
      // {
      //   Header: messages['common.job_vacancy'],
      //   accessor: 'job_vacancy',
      // },
      // {
      //   Header: messages['common.employed'],
      //   accessor: 'employed',
      // },
    ],
    [messages],
  );

  return (
    <ReactTable
      columns={columns}
      data={memberList || []}
      loading={isLoading}
      skipDefaultFilter={true}
      hideToolbar={true}
    />
  );
};

export default IndustryListView;

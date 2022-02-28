import React, {useCallback, useMemo, useState} from 'react';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import {useIntl} from 'react-intl';
import ReadButton from '../../../@softbd/elements/button/ReadButton/ReadButton';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import {API_MEMBER_JOBS} from '../../../@softbd/common/apiRoutes';
import ReactTable from '../../../@softbd/table/Table/ReactTable';

import IntlMessages from '../../../@crema/utility/IntlMessages';
/*import useNotiStack from '../../../@softbd/hooks/useNotifyStack';*/
import {getMomentDateFormat} from '../../../@softbd/utilities/helpers';
import IconJobSector from '../../../@softbd/icons/IconJobSector';
import {useRouter} from 'next/router';
import {LINK_JOB_DETAILS_VIEW} from '../../../@softbd/common/appLinks';
import LocaleLanguage from '../../../@softbd/utilities/LocaleLanguage';
import CustomCheckbox from '../../../@softbd/elements/input/CustomCheckbox/CustomCheckbox';

const IndustryAssociationMemberJobsPage = () => {
  const {messages, locale} = useIntl();

  /*  const {successStack, errorStack} = useNotiStack();*/
  const router = useRouter();

  //const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [isToggleTable] = useState<boolean>(false);

  const openJobDetailsView = useCallback((jobId: string) => {
    router
      .push({
        pathname: LINK_JOB_DETAILS_VIEW + jobId,
      })
      .then(() => {});
  }, []);

  /*  const refreshDataTable = useCallback(() => {
    setIsToggleTable((prevToggle: any) => !prevToggle);
  }, [isToggleTable]);*/

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
        Header: messages['common.post'],
        accessor: 'job_title',
        isVisible: locale == LocaleLanguage.BN,
      },
      {
        Header: messages['common.post_en'],
        accessor: 'job_title_en',
        isVisible: locale == LocaleLanguage.EN,
      },
      {
        Header: messages['common.publish_at'],
        accessor: 'published_at',
        filter: 'dateTimeFilter',
        Cell: (props: any) => {
          let data = props.row.original;
          return (
            <>
              {data.published_at
                ? getMomentDateFormat(data.published_at, 'MM-DD-YYYY')
                : 'Not published yet'}
            </>
          );
        },
      },
      {
        Header: messages['common.publication_deadline'],
        accessor: 'application_deadline',
        filter: 'dateTimeFilter',
        Cell: (props: any) => {
          let data = props.row.original;
          return (
            <>
              {data.application_deadline
                ? getMomentDateFormat(data.application_deadline, 'MM-DD-YYYY')
                : 'Not fixed yet'}
            </>
          );
        },
      },
      {
        Header: messages['common.actions'],
        Cell: (props: any) => {
          let data = props.row.original;
          return (
            <DatatableButtonGroup>
              <ReadButton
                onClick={() => {
                  openJobDetailsView(data.job_id);
                }}
              />
              {/* <CustomCheckbox
                id='is_freshers_encouraged'
                label={messages['job_post.is_fresher_applicable']}
                checked={isFresherApplicable}
                onChange={() => {
                  setIsFresherApplicable((prev) => !prev);
                }}
                isLoading={false}
              />*/}
            </DatatableButtonGroup>
          );
        },
        sortable: false,
      },
    ],
    [messages, locale],
  );

  const {onFetchData, data, loading, pageCount, totalCount} =
    useReactTableFetchData({
      urlPath: API_MEMBER_JOBS,
      filters: {
        job_title: 'search_text',
      },
    });

  return (
    <>
      <PageBlock
        title={
          <>
            <IconJobSector />{' '}
            <IntlMessages id='industry_association_member_job.label' />
          </>
        }>
        <ReactTable
          columns={columns}
          data={data}
          fetchData={onFetchData}
          loading={loading}
          pageCount={pageCount}
          totalCount={totalCount}
          toggleResetTable={isToggleTable}
        />
      </PageBlock>
    </>
  );
};

export default IndustryAssociationMemberJobsPage;

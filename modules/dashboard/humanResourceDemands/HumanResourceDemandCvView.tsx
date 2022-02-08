import React, {useEffect, useMemo, useState} from 'react';
import {useIntl} from 'react-intl';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import IconJobSector from '../../../@softbd/icons/IconJobSector';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import CustomChipVacancyApprovalStatus from './CustomChipVacancyApprovalStatus';
import {HrDemandApprovalStatusByIndustry} from './HrDemandEnums';
import {useFetchHrDemand} from '../../../services/instituteManagement/hooks';
import Router, {useRouter} from 'next/router';
import {Button} from '@mui/material';
import ReadButton from '../../../@softbd/elements/button/ReadButton/ReadButton';
import {Link} from '../../../@softbd/elements/common';

const HumanResourceDemandCvView = () => {
  const {messages} = useIntl();
  const router = useRouter();
  const {hrDemandId, show_cv} = router.query;
  const {data: hrDemand, isLoading} = useFetchHrDemand(hrDemandId);
  const [data, setData] = useState([]);
  useEffect(() => {
    if (hrDemand) {
      if (show_cv == '0') {
        let youths = hrDemand?.hr_demand_youths_youth_ids;
        setData(youths);
      } else {
        let cv_links = hrDemand?.hr_demand_youths_cv_links;
        setData(cv_links);
      }
    }
  }, [hrDemand, show_cv]);

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
        Header:
          show_cv == '1'
            ? messages['common.cv_links']
            : messages['common.youths'],
        accessor: 'cv_link',
        Cell: (props: any) => {
          let data = props.row.original;
          if (show_cv == '1') {
            return (
              <Link href={data?.cv_link} target={'_blank'}>
                <ReadButton>{messages['common.view_cv']}</ReadButton>
              </Link>
            );
          } else {
            return <></>;
          }
        },
      },

      {
        Header: messages['common.approval_status'],
        accessor: 'approval_status',
        Cell: (props: any) => {
          let data = props.row.original;
          if (
            data?.approval_status == HrDemandApprovalStatusByIndustry.REJECTED
          ) {
            return (
              <CustomChipVacancyApprovalStatus
                value={HrDemandApprovalStatusByIndustry.REJECTED}
              />
            );
          } else if (
            data?.approval_status == HrDemandApprovalStatusByIndustry.PENDING
          ) {
            return (
              <CustomChipVacancyApprovalStatus
                value={HrDemandApprovalStatusByIndustry.PENDING}
              />
            );
          } else {
            return (
              <CustomChipVacancyApprovalStatus
                value={HrDemandApprovalStatusByIndustry.APPROVED}
              />
            );
          }
        },
      },
    ],
    [messages],
  );

  return (
    <>
      <PageBlock
        title={
          <>
            <IconJobSector /> <IntlMessages id='hr_demand.label' />
          </>
        }>
        <Button variant='outlined' onClick={() => Router.back()}>
          {messages['common.back']}
        </Button>
        <ReactTable
          columns={columns}
          data={data || []}
          loading={isLoading}
          skipDefaultFilter={true}
        />
      </PageBlock>
    </>
  );
};

export default HumanResourceDemandCvView;

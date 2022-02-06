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
import {Link} from '../../../@softbd/elements/common';
import CustomChip from '../../../@softbd/elements/display/CustomChip/CustomChip';

const HumanResourceDemandCvView = () => {
  const {messages} = useIntl();
  const router = useRouter();
  const {hrDemandId} = router.query;
  const {data: hrDemand, isLoading} = useFetchHrDemand(hrDemandId);
  const [hrDemandCv, setHrDemandCv] = useState([]);
  useEffect(() => {
    if (hrDemand) {
      let cv_links = hrDemand?.hr_demand_youths_cv_links;
      setHrDemandCv(cv_links);
      console.log('hrDemandCv: ', cv_links);
    }
  }, [hrDemand]);
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
        Header: messages['common.cv_links'],
        accessor: 'cv_link',
        Cell: (props: any) => {
          let data = props.row.original;
          return (
            <Link target={'_blank'} href={data?.cv_link}>
              <CustomChip
                color={'primary'}
                label={messages['common.view_cv']}
              />
            </Link>
          );
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
          data={hrDemandCv || []}
          loading={isLoading}
          skipDefaultFilter={true}
        />
      </PageBlock>
    </>
  );
};

export default HumanResourceDemandCvView;

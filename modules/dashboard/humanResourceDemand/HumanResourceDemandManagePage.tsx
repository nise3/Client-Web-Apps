import {useIntl} from 'react-intl';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {useRouter} from 'next/router';
import {useFetchHumanResourceDemand} from '../../../services/IndustryManagement/hooks';
import {Typography} from '@mui/material';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import React from 'react';

const HumanResourceDemandManagePage = () => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();
  const router = useRouter();
  const {hrDemandId} = router.query;

  const {
    data: humanResourceDemandData,
    isLoading,
    mutate: mutateHumanResourceDemandData,
  } = useFetchHumanResourceDemand(Number(hrDemandId));

  return (
    <>
      <Typography variant={'h2'}>
        {humanResourceDemandData?.organization_title}
      </Typography>

      <ReactTable
        columns={columns}
        data={data}
        fetchData={onFetchData}
        loading={loading}
        pageCount={pageCount}
        totalCount={totalCount}
        toggleResetTable={isToggleTable}
      />
    </>
  );
};

export default HumanResourceDemandManagePage;

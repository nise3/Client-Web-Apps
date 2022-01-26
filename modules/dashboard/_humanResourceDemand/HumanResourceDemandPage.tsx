import React, {useMemo} from 'react';
import CustomChip from '../../../@softbd/elements/display/CustomChip/CustomChip';
import PersonIcon from '@mui/icons-material/Person';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import {useIntl} from 'react-intl';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import IconJobSector from '../../../@softbd/icons/IconJobSector';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import {API_HUMAN_RESOURCE_DEMAND} from '../../../@softbd/common/apiRoutes';
import Link from 'next/link';
import {styled} from '@mui/material/styles';
import {Button} from '@mui/material';
import {LINK_INSTITUTE_HR_DEMAND} from '../../../@softbd/common/appLinks';

const PrimaryLightButton = styled(Button)(({theme}) => {
  return {
    color: theme.palette.primary.light,
    border: 'none',
  };
});

const HumanResourceDemandPage = () => {
  const {messages} = useIntl();
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
        Header: messages['organization.label'],
        accessor: 'hr_demand_id',
      },
      {
        Header: messages['skill.label'],
        accessor: 'skill_title',
      },
      {
        Header: messages['common.vacancy'],
        Cell: (props: any) => {
          let data = props.row.original;
          return (
            <>
              <CustomChip
                icon={<PersonIcon fontSize={'small'} />}
                color={'primary'}
                label={data?.vacancy}
              />
            </>
          );
        },
      },

      {
        Header: messages['common.actions'],
        Cell: (props: any) => {
          let data = props.row.original;
          const URL = LINK_INSTITUTE_HR_DEMAND + `/${data?.id}`;
          return (
            <DatatableButtonGroup>
              <Link href={URL} passHref>
                <PrimaryLightButton variant={'outlined'}>
                  {messages['common.manage']}
                </PrimaryLightButton>
              </Link>
            </DatatableButtonGroup>
          );
        },
        sortable: false,
      },
    ],
    [messages],
  );

  const {onFetchData, data, loading, pageCount, totalCount} =
    useReactTableFetchData({
      urlPath: API_HUMAN_RESOURCE_DEMAND,
    });
  console.log('data: ', data);

  /*const data = [
    {
      hr_demand_id: 1,
    },
  ];*/

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
        />
      </PageBlock>
    </>
  );
};

export default HumanResourceDemandPage;

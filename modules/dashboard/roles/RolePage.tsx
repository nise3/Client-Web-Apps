import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useIntl} from 'react-intl';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {isResponseSuccess} from '../../../@softbd/utilities/helpers';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CustomChipRowStatus from '../../../@softbd/elements/display/CustomChipRowStatus/CustomChipRowStatus';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import ReadButton from '../../../@softbd/elements/button/ReadButton/ReadButton';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import DeleteButton from '../../../@softbd/elements/button/DeleteButton/DeleteButton';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import AddButton from '../../../@softbd/elements/button/AddButton/AddButton';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import {deleteRole} from '../../../services/userManagement/RoleService';
import {useFetchRoles} from '../../../services/userManagement/hooks';
import RoleAddEditPopup from './RoleAddEditPopup';
import RoleDetailsPopup from './RoleDetailsPopup';
import IconRole from '../../../@softbd/icons/IconRole';
import {Button, makeStyles} from '@material-ui/core';
import clsx from 'clsx';
import {AccountTreeOutlined} from '@material-ui/icons';
import Link from 'next/link';
import {useAuthUser} from '../../../@crema/utility/AppHooks';

const useStyles = makeStyles((theme) => {
  return {
    button: {
      color: theme.palette.primary.light,
      border: 'none',
    },
  };
});

/*
const filter = (authUser: AuthUser | null) => {
  if (authUser && authUser.institute_id) {
    return {
      institute_id: authUser.institute_id,
    };
  } else if (authUser && authUser.organization_id) {
    return {
      organization_id: authUser.organization_id,
    };
  } else {
    return {};
  }
};
*/

const RolePage = () => {
  const classes = useStyles();
  const {messages} = useIntl();
  const {successStack} = useNotiStack();
  const authUser = useAuthUser();

  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);
  //const [roleFilters] = useState<any>(filter(authUser));
  const [roleFilters, setRoleFilters] = useState<any>({});

  const {
    data: roles,
    isLoading,
    mutate: mutateRoles,
  } = useFetchRoles(roleFilters);

  useEffect(() => {
    if (authUser) {
      if (authUser.institute_id) {
        setRoleFilters({
          institute_id: authUser.institute_id,
        });
      } else if (authUser.organization_id) {
        setRoleFilters({
          organization_id: authUser.organization_id,
        });
      }
    }
  }, []);

  const closeAddEditModal = useCallback(() => {
    setIsOpenAddEditModal(false);
    setSelectedItemId(null);
  }, []);

  const openAddEditModal = useCallback((itemId: number | null = null) => {
    setIsOpenDetailsModal(false);
    setIsOpenAddEditModal(true);
    setSelectedItemId(itemId);
  }, []);

  const openDetailsModal = useCallback(
    (itemId: number) => {
      setIsOpenDetailsModal(true);
      setSelectedItemId(itemId);
    },
    [selectedItemId],
  );

  const closeDetailsModal = useCallback(() => {
    setIsOpenDetailsModal(false);
  }, []);

  const deleteRoleItem = async (roleId: number) => {
    let response = await deleteRole(roleId);
    if (isResponseSuccess(response)) {
      successStack(
        <IntlMessages
          id='common.subject_deleted_successfully'
          values={{subject: <IntlMessages id='role.label' />}}
        />,
      );
      refreshDataTable();
    }
  };

  const refreshDataTable = useCallback(() => {
    mutateRoles();
  }, []);

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
        Header: messages['common.title_en'],
        accessor: 'title_en',
      },
      {
        Header: messages['common.title_bn'],
        accessor: 'title_bn',
      },
      {
        Header: messages['role.unique_value'],
        accessor: 'key',
        isVisible: false,
      },
      {
        Header: messages['permission_sub_group.label'],
        accessor: 'permission_sub_group_title_en',
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
          const URL = `/dashboard/roles/assign-permissions/${data.id}`;
          return (
            <DatatableButtonGroup>
              <ReadButton onClick={() => openDetailsModal(data.id)} />
              <EditButton onClick={() => openAddEditModal(data.id)} />
              <DeleteButton
                deleteAction={() => deleteRoleItem(data.id)}
                deleteTitle={messages['common.delete_confirm'] as string}
              />
              <Link href={URL} passHref>
                <Button
                  className={clsx(classes.button)}
                  variant={'outlined'}
                  startIcon={<AccountTreeOutlined />}>
                  {messages['permission.label']}
                </Button>
              </Link>
            </DatatableButtonGroup>
          );
        },
        sortable: false,
      },
    ],
    [messages],
  );

  return (
    <>
      <PageBlock
        title={
          <>
            <IconRole /> <IntlMessages id='role.label' />
          </>
        }
        extra={[
          <AddButton
            key={1}
            onClick={() => openAddEditModal(null)}
            isLoading={isLoading}
            tooltip={
              <IntlMessages
                id={'common.add_new'}
                values={{
                  subject: messages['role.label'],
                }}
              />
            }
          />,
        ]}>
        <ReactTable
          columns={columns}
          data={roles || []}
          loading={isLoading}
          skipDefaultFilter={true}
        />
        {isOpenAddEditModal && (
          <RoleAddEditPopup
            key={1}
            onClose={closeAddEditModal}
            itemId={selectedItemId}
            refreshDataTable={refreshDataTable}
          />
        )}

        {isOpenDetailsModal && selectedItemId && (
          <RoleDetailsPopup
            key={1}
            itemId={selectedItemId}
            onClose={closeDetailsModal}
            openEditModal={openAddEditModal}
          />
        )}
      </PageBlock>
    </>
  );
};

export default RolePage;

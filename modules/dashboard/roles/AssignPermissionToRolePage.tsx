import React, {useCallback, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {
  forEach as lodashForEach,
  groupBy as lodashGroupBy,
  map as lodashMap,
  startCase as lodashStartCase,
  toLower as lodashToLower,
} from 'lodash';
import {CardContent, CardHeader, Checkbox, Divider, Grid} from '@mui/material';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import {useIntl} from 'react-intl';
import {assignPermissions} from '../../../services/userManagement/RoleService';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {
  useFetchPermissionSubGroup,
  useFetchRole,
} from '../../../services/userManagement/hooks';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import Card from '@mui/material/Card';
import BackButton from '../../../@softbd/elements/button/BackButton';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {useAuthUser} from '../../../@crema/utility/AppHooks';

const AssignPermissionToRolePage = () => {
  const router = useRouter();
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const {updateSuccessMessage} = useSuccessMessage();
  const {roleId} = router.query;

  const [permissions, setPermissions] = useState<any>({});
  const [checkedPermissions, setCheckedPermissions] = useState<any>(
    new Set([]),
  );
  const [checkedModules, setCheckedModules] = useState<any>(new Set());
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [allPermissions, setAllPermissions] = useState<any>(null);

  const authUser = useAuthUser();

  const {data: itemData, mutate: mutateRole} = useFetchRole(Number(roleId));
  const {data: permissionSubGroup, isLoading} = useFetchPermissionSubGroup(
    itemData?.permission_sub_group_id,
  );

  useEffect(() => {
    if (permissionSubGroup) {
      const filteredPermission = permissionSubGroup?.permissions.filter(
        (item: any) => authUser?.permissions.includes(item.key),
      );
      console.log('authUser=>', authUser);
      if (authUser && authUser?.isSystemUser) {
        setAllPermissions(permissionSubGroup?.permissions);
      } else {
        setAllPermissions(filteredPermission);
      }
    }
  }, [permissionSubGroup]);

  useEffect(() => {
    if (itemData && allPermissions) {
      const subGroupPermissionsIds = (allPermissions || []).map(
        (permission: any) => permission.id,
      );

      const itemDataPermissionsIds = itemData.permissions.map(
        (permission: any) => permission.id,
      );

      const filteredSelectedPermissions = subGroupPermissionsIds.filter(
        (id: any) => itemDataPermissionsIds.includes(id),
      );

      let selectedPermissions = new Set(filteredSelectedPermissions);
      setCheckedPermissions(selectedPermissions);

      let hashPermissions = lodashGroupBy(allPermissions, 'module');
      setPermissions(hashPermissions);

      lodashForEach(Object.keys(hashPermissions), (module) => {
        if (
          isAllCheckUnderModule(module, selectedPermissions, hashPermissions)
        ) {
          setCheckedModules((checkedModules: any) =>
            checkedModules.add(module),
          );
        }
      });
    }
  }, [itemData, allPermissions]);

  const handlePermissionCheck = useCallback(
    (permission, module) => {
      const newPermissions = new Set([...checkedPermissions]);
      newPermissions.has(permission)
        ? newPermissions.delete(permission)
        : newPermissions.add(permission);
      setCheckedPermissions(newPermissions);

      if (isAllCheckUnderModule(module, newPermissions, permissions)) {
        setCheckedModules(
          (oldCheckModules: any) => new Set([...oldCheckModules, module]),
        );
      } else {
        uncheckModule(module);
      }
    },
    [permissions, checkedPermissions],
  );

  const handleCheckAllPermissions = useCallback(
    (isChecked: any, module) => {
      const permissionsIds = lodashMap(permissions[module], 'id');
      if (isChecked) {
        setCheckedPermissions(
          new Set([...checkedPermissions, ...permissionsIds]),
        );
        setCheckedModules(new Set([...checkedModules, module]));
      } else {
        let newPermissions = new Set([...checkedPermissions]);
        permissionsIds.forEach((item) => {
          newPermissions.delete(item);
        });
        setCheckedPermissions(newPermissions);
        uncheckModule(module);
      }
    },
    [permissions, checkedPermissions],
  );

  const isAllCheckUnderModule = useCallback(
    (module, checkedPermissions, hashPermissions) => {
      const permissionsIds = lodashMap(hashPermissions[module], 'id');
      let allCheckedUnderModule = true;
      for (let i = 0; i < permissionsIds.length; i++) {
        if (!checkedPermissions.has(permissionsIds[i])) {
          allCheckedUnderModule = false;
          break;
        }
      }
      return allCheckedUnderModule;
    },
    [permissions],
  );

  const uncheckModule = useCallback(
    (module) => {
      const modules = new Set([...checkedModules]);
      modules.delete(module);
      setCheckedModules(modules);
    },
    [checkedModules],
  );
  const syncPermissionAction = useCallback(async () => {
    setIsSubmitting(true);
    try {
      await assignPermissions(Number(roleId), Array.from(checkedPermissions));
      mutateRole();
      updateSuccessMessage('permission.label');
    } catch (error: any) {
      processServerSideErrors({error, errorStack});
    }
    setIsSubmitting(false);
  }, [roleId, checkedPermissions]);

  return (
    <PageBlock
      title={
        <IntlMessages
          id='common.assign_permission'
          values={{subject: itemData?.title}}
        />
      }
      extra={[
        <React.Fragment key={1}>
          <BackButton key={1} url={'/roles'} />
          <SubmitButton
            key={2}
            onClick={syncPermissionAction}
            isLoading={isLoading}
            isSubmitting={isSubmitting}
            label={messages['permissions.sync_permission'] as string}
          />
        </React.Fragment>,
      ]}>
      <Grid container spacing={1}>
        {Object.keys(permissions || {}).map((module) => (
          <Grid item xs={12} md={4} key={module}>
            <Card>
              <CardHeader
                title={
                  <label>
                    <Checkbox
                      checked={checkedModules.has(module)}
                      onChange={(e) =>
                        handleCheckAllPermissions(e.target.checked, module)
                      }
                    />
                    {lodashStartCase(lodashToLower(module))}
                  </label>
                }
              />
              <Divider />
              <CardContent>
                {permissions[module].map((permission: any) => {
                  return (
                    <label key={permission.id} style={{display: 'block'}}>
                      <Checkbox
                        value={permission.id}
                        checked={checkedPermissions.has(permission.id)}
                        onChange={() =>
                          handlePermissionCheck(permission.id, module)
                        }
                      />
                      {lodashStartCase(permission.title)}
                    </label>
                  );
                })}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </PageBlock>
  );
};

export default AssignPermissionToRolePage;

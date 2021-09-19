import React, {useCallback, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import AppPage from '../../../../@crema/hoc/AppPage';
import PageMeta from '../../../../@crema/core/PageMeta';
import {
  map as lodashMap,
  forEach as lodashForEach,
  groupBy as lodashGroupBy,
} from 'lodash';
import {Box, Checkbox, createStyles, Divider, Grid} from '@material-ui/core';
import PageBlock from '../../../../@softbd/utilities/PageBlock';
import {makeStyles} from '@material-ui/styles';
import {Theme} from '@material-ui/core/styles';
import SubmitButton from '../../../../@softbd/elements/button/SubmitButton/SubmitButton';
import {useIntl} from 'react-intl';
import {isResponseSuccess} from '../../../../@softbd/utilities/helpers';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import useNotiStack from '../../../../@softbd/hooks/useNotifyStack';
import {useFetchPermissions} from '../../../../services/userManagement/hooks';
import {
  assignPermissions,
  getPermissionGroupWithPermissions,
} from '../../../../services/userManagement/PermissionGroupService';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    permissionGroup: {
      display: 'flex',
      flexDirection: 'column',
    },
    checkboxGroupWrapper: {
      boxShadow: '0px 0px 5px 1px #e9e9e9',
      display: 'flex',
      flexDirection: 'column',
    },
  }),
);

const AssignPermissionToPermissionGroup = () => {
  const classes = useStyles();
  const router = useRouter();
  const {messages} = useIntl();
  const {successStack} = useNotiStack();
  const {permissionGroupId} = router.query;

  const [permissions, setPermissions] = useState<any>({});
  const [checkedPermissions, setCheckedPermissions] = useState<any>(
    new Set([]),
  );
  const [checkedModules, setCheckedModules] = useState<any>(new Set());
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [permissionFilters] = useState({});

  const {data: allPermissions, isLoading} =
    useFetchPermissions(permissionFilters);
  const [itemData, setItemData] = useState<any>(null);

  useEffect(() => {
    (async () => {
      if (permissionGroupId) {
        const response = await getPermissionGroupWithPermissions(
          Number(permissionGroupId),
          {permission: 1},
        );
        if (response) {
          console.log('ppp', response.data);
          setItemData(response.data);
        }
      }
    })();
  }, [permissionGroupId]);

  useEffect(() => {
    if (itemData && allPermissions) {
      let selectedPermissions = new Set(
        lodashMap(itemData.permissions || [], 'id'),
      );
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
    const response = await assignPermissions(
      Number(permissionGroupId),
      Array.from(checkedPermissions),
    );
    if (isResponseSuccess(response)) {
      successStack(
        <IntlMessages
          id='common.subject_updated_successfully'
          values={{subject: <IntlMessages id='permission.label' />}}
        />,
      );
    }
    setIsSubmitting(false);
  }, [permissionGroupId, checkedPermissions]);

  return (
    <PageBlock
      title={'Assign Permission'}
      extra={[
        <SubmitButton
          key={1}
          onClick={syncPermissionAction}
          isLoading={isLoading}
          isSubmitting={isSubmitting}
          label={messages['permissions.sync_permission'] as string}
        />,
      ]}>
      <Grid container spacing={5}>
        {Object.keys(permissions || {}).map((module) => (
          <Grid item xs={4} key={module} className={classes.permissionGroup}>
            <Box className={classes.checkboxGroupWrapper}>
              <label>
                <Checkbox
                  checked={checkedModules.has(module)}
                  onChange={(e) =>
                    handleCheckAllPermissions(e.target.checked, module)
                  }
                />
                {module}
              </label>
              <Divider />
              {permissions[module].map((permission: any) => {
                return (
                  <label key={permission.id}>
                    <Checkbox
                      value={permission.id}
                      checked={checkedPermissions.has(permission.id)}
                      onChange={() =>
                        handlePermissionCheck(permission.id, module)
                      }
                    />
                    {permission.name}
                  </label>
                );
              })}
            </Box>
          </Grid>
        ))}
      </Grid>
    </PageBlock>
  );
};

export default AppPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['common.assign_permission']} />
      <AssignPermissionToPermissionGroup />
    </>
  );
});

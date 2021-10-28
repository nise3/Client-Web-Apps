import React, {useCallback, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {
  forEach as lodashForEach,
  groupBy as lodashGroupBy,
  map as lodashMap,
  startCase as lodashStartCase,
  toLower as lodashToLower,
} from 'lodash';
import {Box, Checkbox, Divider, Grid} from '@mui/material';
import createStyles from '@mui/styles/createStyles';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import {makeStyles} from '@mui/styles';
import {Theme} from '@mui/material/styles';
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

const AssignPermissionToRolePage = () => {
  const classes = useStyles();
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

  const {data: itemData} = useFetchRole(Number(roleId));
  const {data: permissionGroup, isLoading} = useFetchPermissionSubGroup(
    itemData?.permission_sub_group_id,
  );

  useEffect(() => {
    if (permissionGroup) {
      setAllPermissions(permissionGroup.permissions);
    }
  }, [permissionGroup]);

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
    try {
      await assignPermissions(Number(roleId), Array.from(checkedPermissions));
      updateSuccessMessage('permission.label');
    } catch (error: any) {
      processServerSideErrors({error, errorStack});
    }
    setIsSubmitting(false);
  }, [roleId, checkedPermissions]);

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
                {lodashStartCase(lodashToLower(module))}
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
                    {lodashStartCase(permission.title)}
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

export default AssignPermissionToRolePage;
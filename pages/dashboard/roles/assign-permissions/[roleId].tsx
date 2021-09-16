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

const data = [
  {
    id: 1,
    key: 'add_user',
    name: 'Add User',
    module: 'User',
  },
  {
    id: 2,
    key: 'edit_user',
    name: 'Edit User',
    module: 'User',
  },
  {
    id: 3,
    key: 'delete_user',
    name: 'Delete User',
    module: 'User',
  },
  {
    id: 4,
    key: 'add_org',
    name: 'Add Org',
    module: 'Organization',
  },
  {
    id: 5,
    key: 'edit_org',
    name: 'Edit Org',
    module: 'Organization',
  },
  {
    id: 6,
    key: 'add_ins',
    name: 'Add Inst',
    module: 'Institute',
  },
  {
    id: 7,
    key: 'edit_ins',
    name: 'Edit Inst',
    module: 'Institute',
  },
  {
    id: 8,
    key: 'edit_sample',
    name: 'Edit Sample',
    module: 'Sample',
  },
  {
    id: 9,
    key: 'add_sample',
    name: 'Add Sample',
    module: 'Sample',
  },
  {
    id: 10,
    key: 'asd_sample1',
    name: 'Add Sample',
    module: 'Sample1',
  },
  {
    id: 11,
    key: 'edit_sample1',
    name: 'Edit Sample',
    module: 'Sample1',
  },
  {
    id: 12,
    key: 'edits_sample1',
    name: 'Edits Sample',
    module: 'Sample1',
  },
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    permissionGroup: {
      display: 'flex',
      flexDirection: 'column',
    },
  }),
);

const AssignPermissionToRole = () => {
  const classes = useStyles();
  const router = useRouter();
  const {roleId} = router.query;

  const [permissions, setPermissions] = useState<any>({});
  const [checkedPermissions, setCheckedPermissions] = useState<any>(
    new Set([1, 2, 3, 4, 5]),
  );
  const [checkedModules, setCheckedModules] = useState<any>(new Set());

  useEffect(() => {
    if (roleId) {
      let hashPermissions = lodashGroupBy(data, 'module');
      setPermissions(hashPermissions);

      lodashForEach(Object.keys(hashPermissions), (module) => {
        if (
          isAllCheckUnderModule(module, checkedPermissions, hashPermissions)
        ) {
          setCheckedModules((checkedModules: any) =>
            checkedModules.add(module),
          );
        }
      });
    }
  }, [roleId]);

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

  return (
    <PageBlock title={'Assign Permission'}>
      <Grid container spacing={8}>
        {Object.keys(permissions || {}).map((module) => (
          <Grid item xs={4} key={module} className={classes.permissionGroup}>
            <Box style={{boxShadow: '0px 0px 5px 1px #e9e9e9'}}>
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

export default AppPage(() => (
  <>
    <PageMeta title='Assign Permission' />
    <AssignPermissionToRole />
  </>
));

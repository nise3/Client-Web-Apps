import React, {useCallback, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import AppPage from '../../../../@crema/hoc/AppPage';
import PageMeta from '../../../../@crema/core/PageMeta';
import {
  reduce as lodashReduce,
  map as lodashMap,
  forEach as lodashForEach,
} from 'lodash';
import {Box, Checkbox, Divider, Grid} from '@material-ui/core';
import CustomAccordion from '../../../../@softbd/elements/accordion/CustomAccordion';
import PageBlock from '../../../../@softbd/utilities/PageBlock';

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

const AssignPermissionToRole = () => {
  const router = useRouter();
  const {roleId} = router.query;

  const [permissions, setPermissions] = useState<any>({});
  const [checkedPermissions, setCheckedPermissions] = useState<number[]>([
    1, 2,
  ]);

  useEffect(() => {
    let hashPermissions = lodashReduce(
      data,
      function (result: any, value: any, key: any) {
        (result[value['module']] || (result[value['module']] = [])).push(value);
        return result;
      },
      {},
    );
    console.log('permissions', hashPermissions);
    setPermissions(hashPermissions);
  }, [roleId]);

  const handlePermissionCheck = useCallback(
    (permission) => {
      const newPermissions = checkedPermissions?.includes(permission)
        ? checkedPermissions?.filter((id: any) => id !== permission)
        : [...checkedPermissions, permission];

      console.log('checkedPermissions', newPermissions);
      setCheckedPermissions(newPermissions);
    },
    [checkedPermissions],
  );

  const handleCheckAllPermissions = useCallback(
    (module) => {
      // const permissionsIds = lodashMap(permissions[module], 'id');
      // let newPermissions = [];
      // lodashForEach(permissionsIds, function (permission) {
      //   if (!checkedPermissions.includes(permission)) {
      //     newPermissions = [...checkedPermissions, permission];
      //   }
      // });
      // console.log('asdasdasd', permissionsIds);
    },
    [permissions],
  );

  return (
    <PageBlock title={'Assign Permission'}>
      <Grid container spacing={3}>
        {Object.keys(permissions || {}).map((item) => (
          <Grid item xs={4}>
            <CustomAccordion title={item} height={'100%'}>
              <label>
                <Checkbox
                  //value={permission.id}
                  //checked={checkedPermissions.includes(permission.id)}
                  onChange={() => handleCheckAllPermissions(item)}
                />
                Check All
              </label>
              <Divider />
              {permissions[item].map((permission: any) => {
                return (
                  <label>
                    <Checkbox
                      value={permission.id}
                      checked={checkedPermissions.includes(permission.id)}
                      onChange={() => handlePermissionCheck(permission.id)}
                    />
                    {permission.name}
                  </label>
                );
              })}
            </CustomAccordion>
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

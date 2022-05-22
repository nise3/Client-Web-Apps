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
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {useFetchLocalizedPermissions} from '../../../services/userManagement/hooks';
import {
  assignPermissions,
  getPermissionGroupWithPermissions,
} from '../../../services/userManagement/PermissionGroupService';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import Card from '@mui/material/Card';
import BackButton from '../../../@softbd/elements/button/BackButton';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import LocaleLanguage from '../../../@softbd/utilities/LocaleLanguage';

const AssignPermissionToPermissionGroupPage = () => {
  const router = useRouter();
  const {messages, locale} = useIntl();
  const {errorStack} = useNotiStack();
  const {updateSuccessMessage} = useSuccessMessage();
  const {permissionGroupId} = router.query;

  const [permissions, setPermissions] = useState<any>({});
  const [checkedPermissions, setCheckedPermissions] = useState<any>(
    new Set([]),
  );
  const [checkedModules, setCheckedModules] = useState<any>(new Set());
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [permissionFilters] = useState({});

  const {data: allPermissions, isLoading} =
    useFetchLocalizedPermissions(permissionFilters);
  const [itemData, setItemData] = useState<any>(null);

  useEffect(() => {
    (async () => {
      if (permissionGroupId) {
        const response = await getPermissionGroupWithPermissions(
          Number(permissionGroupId),
          {permission: 1},
        );
        if (response) {
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
    try {
      await assignPermissions(
        Number(permissionGroupId),
        Array.from(checkedPermissions),
      );
      updateSuccessMessage('permission.label');
    } catch (error: any) {
      processServerSideErrors({error, errorStack});
    }

    setIsSubmitting(false);
  }, [permissionGroupId, checkedPermissions]);

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
          <BackButton key={1} url={'/permission-groups'} />
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
                      {lodashStartCase(
                        locale == LocaleLanguage.BN
                          ? permission.title
                          : permission.title_en,
                      )}
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

export default AssignPermissionToPermissionGroupPage;

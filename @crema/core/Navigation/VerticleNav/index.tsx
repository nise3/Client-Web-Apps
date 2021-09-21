import React, {useMemo} from 'react';
import List from '@material-ui/core/List';

import VerticalCollapse from './VerticalCollapse';
import VerticalItem from './VerticalItem';
import VerticalNavGroup from './VerticalNavGroup';
import {useAuthUser} from '../../../utility/AppHooks';
import routesConfig from '../../../../modules/routesConfig';
import {checkPermission} from '../../../utility/authorizations';

interface NavigationProps {}

const filterRoute = function (arr: any[], usr: any) {
  const newArr = [];

  const len = arr.length;
  for (let i = 0; i < len; i++) {
    const item = arr[i];
    const newItem = {...item};
    if (
      !item.hasOwnProperty('permissionKey') ||
      checkPermission(usr, [item.permissionKey])
    ) {
      if (
        item.hasOwnProperty('children') &&
        Array.isArray(item.children) &&
        item.children.length
      ) {
        newItem.children = filterRoute(item.children, usr);
      }
      if (newItem?.type === 'item' || newItem?.children?.length) {
        newArr.push(newItem);
      }
    }
  }

  return newArr;
};

const Navigation: React.FC<NavigationProps> = () => {
  const authUser = useAuthUser();
  const filteredRouters = useMemo(
    () => filterRoute(routesConfig, authUser),
    [authUser],
  );

  return (
    <List>
      {(filteredRouters || []).map((item: any) => (
        <React.Fragment key={item.id}>
          {item.type === 'group' && <VerticalNavGroup item={item} level={0} />}

          {item.type === 'collapse' && (
            <VerticalCollapse item={item} level={0} />
          )}

          {item.type === 'item' && <VerticalItem item={item} level={0} />}
        </React.Fragment>
      ))}
    </List>
  );
};

export default Navigation;

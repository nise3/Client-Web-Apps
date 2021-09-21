import React, {useEffect, useState} from 'react';
import List from '@material-ui/core/List';

import VerticalCollapse from './VerticalCollapse';
import VerticalItem from './VerticalItem';
import VerticalNavGroup from './VerticalNavGroup';
import {useAuthUser} from '../../../utility/AppHooks';
import routesConfig, {NavItemProps} from '../../../../modules/routesConfig';
import {checkPermission} from '../../../utility/authorizations';

interface NavigationProps {}

const Navigation: React.FC<NavigationProps> = () => {
  const authUser = useAuthUser();
  const [filteredRouters, setFilteredRouters] = useState<any[]>([]);

  useEffect(() => {
    const routes: NavItemProps[] = [];

    routesConfig.forEach((item1: any, i1: number) => {
      if (
        !item1.hasOwnProperty('permissionKey') ||
        checkPermission(authUser, [item1.permissionKey])
      ) {
        routes.push(item1);
        (item1?.children || []).forEach((item2: any, i2: number) => {
          if (typeof routes[i1]['children'] === 'undefined') {
            routes[i1]['children'] = [];
          }

          if (
            !item2.hasOwnProperty('permissionKey') ||
            checkPermission(authUser, [item2.permissionKey])
          ) {
            // @ts-ignore
            routes[i1]['children'].push(item2);
            (item2?.children || []).forEach((item3: any, i3: number) => {
              if (
                // @ts-ignore
                typeof routes[i1]['children'][i2]['children'] === 'undefined'
              ) {
                // @ts-ignore
                routes[i1]['children'][i2]['children'] = [];
              }

              if (
                !item3.hasOwnProperty('permissionKey') ||
                checkPermission(authUser, [item3.permissionKey])
              ) {
                // console.log(
                //   'checkPermission(authUser, [item3.permissionKey])',
                //   checkPermission(authUser, [item3.permissionKey]),
                // );
                // @ts-ignore
                routes[i1]['children'][i2]['children'].push(item3);

                (item3?.children || []).forEach((item4: any, i4: number) => {
                  if (
                    // @ts-ignore
                    typeof routes[i1]['children'][i2]['children'][i3][
                      'children'
                    ] === 'undefined'
                  ) {
                    // @ts-ignore
                    routes[i1]['children'][i2]['children'][i3]['children'] = [];
                  }
                  if (
                    !item4.hasOwnProperty('permissionKey') ||
                    checkPermission(authUser, [item4.permissionKey])
                  ) {
                    // @ts-ignore
                    routes[i1]['children'][i2]['children'][i3]['children'].push(
                      item4,
                    );
                  }
                });
              }
            });
          }
        });
      }
    });
    console.log(routes);
    setFilteredRouters(routes);
  }, [authUser]);

  return (
    <List>
      {[].map((item: any) => (
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

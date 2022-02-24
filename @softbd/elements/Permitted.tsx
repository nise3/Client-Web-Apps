import React, {FC} from 'react';
import {CommonAuthUser} from '../../redux/types/models/CommonAuthUser';
import {useAuthUser} from '../../@crema/utility/AppHooks';
import {checkPermission} from '../../@crema/utility/authorizations';

interface PermissionProps {
  children: any;
  to: any[];
  when?: Function;
  except?: Function;
}

const Permitted: FC<PermissionProps> = ({
  to,
  when = () => true,
  except = () => false,
  children,
}) => {
  const user = useAuthUser<CommonAuthUser>();

  let condition = (checkPermission(user, to) && when()) || except();

  return condition ? children : <></>;
};

export default Permitted;

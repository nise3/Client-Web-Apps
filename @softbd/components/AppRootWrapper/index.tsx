import React from 'react';
import {useAppToken} from "../../../@crema/utility/AppHooks";
import Loader from "../../../@crema/core/Loader";

function AppRootWrapper({children}: any) {
  const [loading] = useAppToken();

  if (loading) {
    return <Loader/>;
  }

  return <>{children}</>;
}


export default AppRootWrapper;

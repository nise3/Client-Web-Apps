import React from 'react';
import AppContextPropsType from '../../redux/types/AppContextPropsType';
import defaultConfig from './ContextProvider/defaultConfig';

export default React.createContext<AppContextPropsType>(defaultConfig);

import React from 'react';
import {create} from 'jss';
import rtl from 'jss-rtl';
import jssPreset from '@mui/styles/jssPreset';
import StylesProvider from '@mui/styles/StylesProvider';
// Configure JSS
const jss = create({plugins: [...jssPreset().plugins, rtl()]});

const CremaStyleProvider: React.FC<React.ReactNode> = (props: any) => {
  return <StylesProvider jss={jss}>{props.children}</StylesProvider>;
};
export default CremaStyleProvider;

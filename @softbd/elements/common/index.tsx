import React from 'react';
import NextLink from 'next/link';
import {Typography} from '@mui/material';
import clsx from 'clsx';
import makeStyles from '@mui/styles/makeStyles';
import {CremaTheme} from '../../../types/AppContextPropsType';

interface LinkProp {
  children?: any;
  href?: string;
  className?: string;
  decorated?: boolean;
  [x: string]: any;
}
interface TextProp {
  children?: any;
  className?: string;
  [x: string]: any;
}
interface HeadingProp {
  children?: any;
  className?: string;
  centered?: boolean;
  [x: string]: any;
}

const useStyles = makeStyles((/*theme: CremaTheme*/) => ({
  linkText: {
    textDecoration: 'none',
    color: 'inherit',
  },
}));

export const Link = ({
  children,
  href = '',
  className = '',
  // decorated = false,
  ...props
}: LinkProp) => {
  const classes = useStyles();
  return (
    <NextLink href={href}>
      <a
        // style={decorated ? {} : {textDecoration: 'none', color: 'unset'}}
        className={clsx(classes.linkText, className)}
        {...props}>
        {children}
      </a>
    </NextLink>
  );
};

export const Text = ({children, ...props}: TextProp) => (
  <Typography variant='inherit' {...props}>
    {children}
  </Typography>
);

export const H1 = ({children, centered = false, ...props}: HeadingProp) => (
  <Typography
    variant='h1'
    style={centered ? {textAlign: 'center'} : {}}
    {...props}>
    {children}
  </Typography>
);

<H1 centered></H1>;

export const H2 = ({children, centered = false, ...props}: HeadingProp) => (
  <Typography
    variant='h2'
    style={centered ? {textAlign: 'center'} : {}}
    {...props}>
    {children}
  </Typography>
);

export const H3 = ({children, centered = false, ...props}: HeadingProp) => (
  <Typography
    variant='h3'
    style={centered ? {textAlign: 'center'} : {}}
    {...props}>
    {children}
  </Typography>
);

export const H4 = ({children, centered = false, ...props}: HeadingProp) => (
  <Typography
    variant='h4'
    style={centered ? {textAlign: 'center'} : {}}
    {...props}>
    {children}
  </Typography>
);

export const H5 = ({children, centered = false, ...props}: HeadingProp) => (
  <Typography
    variant='h5'
    style={centered ? {textAlign: 'center'} : {}}
    {...props}>
    {children}
  </Typography>
);

export const H6 = ({children, centered = false, ...props}: HeadingProp) => (
  <Typography
    variant='h6'
    style={centered ? {textAlign: 'center'} : {}}
    {...props}>
    {children}
  </Typography>
);

export const S1 = ({children, centered = false, ...props}: HeadingProp) => (
  <Typography
    variant='subtitle1'
    style={centered ? {textAlign: 'center'} : {}}
    {...props}>
    {children}
  </Typography>
);

export const S2 = ({children, centered = false, ...props}: HeadingProp) => (
  <Typography
    variant='subtitle2'
    style={centered ? {textAlign: 'center'} : {}}
    {...props}>
    {children}
  </Typography>
);

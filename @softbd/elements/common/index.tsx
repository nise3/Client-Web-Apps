import React from 'react';
import NextLink from 'next/link';
import {Theme, Typography} from '@mui/material';
import clsx from 'clsx';
import makeStyles from '@mui/styles/makeStyles';

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

const useStyles = makeStyles((theme: Theme) => ({
  linkText: {
    textDecoration: 'none',
    color: 'inherit',
  },
}));

export const Link = ({
  children,
  href = '',
  className = '',
  ...props
}: LinkProp) => {
  const classes = useStyles();
  return (
    <NextLink href={href}>
      <a className={clsx(classes.linkText, className)} {...props}>
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

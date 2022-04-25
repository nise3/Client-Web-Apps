import React from 'react';
import NextLink from 'next/link';
import {Typography} from '@mui/material';
import clsx from 'clsx';
import {useRouter} from 'next/router';

interface LinkProp {
  children?: any;
  href?: string;
  className?: string;
  decorated?: boolean;
  passHref?: boolean;
  target?: '_self' | '_blank' | '_parent' | '_top';

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

export const Link = ({
  children,
  style,
  href = '',
  className = '',
  passHref = true,
  target = '_self',
  ...props
}: LinkProp) => {
  return (
    <NextLink href={href} passHref={passHref} {...props}>
      <a href={href} target={target} className={className} style={style}>
        {children}
      </a>
    </NextLink>
  );
};

export const NavLink = ({
  children,
  style,
  href = '',
  className = '',
  passHref = true,
  ...props
}: LinkProp) => {
  const route = useRouter();
  const active = route.pathname == href ? 'active' : '';
  return (
    <NextLink href={href} passHref={passHref} {...props}>
      <a href={href} className={clsx(className, active)} style={style}>
        {children}
      </a>
    </NextLink>
  );
};

export const Text = ({children, ...props}: TextProp) => (
  <Typography variant='body1' {...props}>
    {children}
  </Typography>
);

export const H1 = ({children, centered = false, ...props}: HeadingProp) => (
  <Typography
    variant='h1'
    tabIndex={0}
    style={centered ? {textAlign: 'center'} : {}}
    {...props}>
    {children}
  </Typography>
);

export const H2 = ({children, centered = false, ...props}: HeadingProp) => (
  <Typography
    variant='h2'
    tabIndex={0}
    style={centered ? {textAlign: 'center'} : {}}
    {...props}>
    {children}
  </Typography>
);

export const H3 = ({children, centered = false, ...props}: HeadingProp) => (
  <Typography
    variant='h3'
    tabIndex={0}
    style={centered ? {textAlign: 'center'} : {}}
    {...props}>
    {children}
  </Typography>
);

export const H4 = ({children, centered = false, ...props}: HeadingProp) => (
  <Typography
    variant='h4'
    tabIndex={0}
    style={centered ? {textAlign: 'center'} : {}}
    {...props}>
    {children}
  </Typography>
);

export const H5 = ({children, centered = false, ...props}: HeadingProp) => (
  <Typography
    variant='h5'
    tabIndex={0}
    style={centered ? {textAlign: 'center'} : {}}
    {...props}>
    {children}
  </Typography>
);

export const H6 = ({children, centered = false, ...props}: HeadingProp) => (
  <Typography
    variant='h6'
    tabIndex={0}
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

export const Body1 = ({children, centered = false, ...props}: HeadingProp) => (
  <Typography
    variant='body1'
    style={centered ? {textAlign: 'center'} : {}}
    {...props}>
    {children}
  </Typography>
);

export const Body2 = ({children, centered = false, ...props}: HeadingProp) => (
  <Typography
    variant='body2'
    style={centered ? {textAlign: 'center'} : {}}
    {...props}>
    {children}
  </Typography>
);

export const Caption = ({
  children,
  centered = false,
  ...props
}: HeadingProp) => (
  <Typography
    variant='caption'
    style={centered ? {textAlign: 'center'} : {}}
    {...props}>
    {children}
  </Typography>
);

export const Hx = ({
  children,
  centered = false,
  level = 'h2',
  ...props
}: HeadingProp) => (
  <Typography
    variant={level}
    tabIndex={0}
    style={centered ? {textAlign: 'center'} : {}}
    {...props}>
    {children}
  </Typography>
);
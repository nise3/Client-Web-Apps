import React from 'react';
import {styled} from '@mui/material/styles';
import NextLink from 'next/link';
import {Typography} from '@mui/material';
import clsx from 'clsx';
import {useRouter} from 'next/router';

const CustomATag = ({
  children,
  className,
  extraClassName = '',
  ...props
}: LinkProp) => {
  return (
    <a className={clsx(classes.linkText, className, extraClassName)} {...props}>
      {children}
    </a>
  );
};

const PREFIX = 'Link';

const classes = {
  linkText: `${PREFIX}-linkText`,
};

const StyledCustomATag = styled(CustomATag)(() => ({
  textDecoration: 'none',
  color: 'inherit',
}));

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

export const Link = ({
  children,
  href = '',
  className = '',
  ...props
}: LinkProp) => {
  return (
    <NextLink href={href}>
      <StyledCustomATag href={href} extraClassName={className} {...props}>
        {children}
      </StyledCustomATag>
    </NextLink>
  );
};

export const NavLink = ({
  children,
  href = '',
  className = '',
  ...props
}: LinkProp) => {
  const route = useRouter();
  const active = route.pathname == href ? 'active' : '';
  return (
    <NextLink href={href}>
      <StyledCustomATag
        href={href}
        extraClassName={clsx(className, active)}
        {...props}>
        {children}
      </StyledCustomATag>
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

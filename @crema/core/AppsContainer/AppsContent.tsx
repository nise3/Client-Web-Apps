import React, {ReactNode} from 'react';
import {styled} from '@mui/material/styles';
import Scrollbar from '../Scrollbar';
import {alpha} from '@mui/material';

interface UnstyledAppsContentProps {
  isDetailView?: boolean;
  fullView?: boolean;
  style?: any;
  children: ReactNode;

  [x: string]: any;
}

const UnstyledAppsContent: React.FC<UnstyledAppsContentProps> = ({
  isDetailView = false,
  fullView = false,
  style = {},
  children,
}) => {
  return <Scrollbar style={style}>{children}</Scrollbar>;
};

const AppsContent = styled(UnstyledAppsContent)(({theme}) => ({
  display: 'flex',
  flexDirection: 'column',
  height: `${(props: any) =>
    'calc(100% -' + (props.isDetailView ? 60 : 115) + 'px)'}`,
  [theme.breakpoints.up('sm')]: {
    height: `${(props: any) =>
      'calc(100% -' + (props.fullView ? 0 : 60) + 'px)'}`,
  },
  [theme.breakpoints.up('xl')]: {
    height: `${(props: any) =>
      'calc(100% -' + (props.fullView ? 0 : 77) + 'px)'}`,
  },
  '& .scrum-absolute': {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
  },
  '& .scrum-row': {
    display: 'inline-flex',
    minWidth: '100%',
    height: '100%',
    marginLeft: '-10px',
    marginRight: '-10px',
  },
  '& .scrum-col': {
    minWidth: '280px',
    maxWidth: '280px',
    marginLeft: '10px',
    marginRight: '10px',
    borderRadius: 10,
    backgroundColor: alpha(theme.palette.background.paper, 0.45),
    height: '100% !important',
    [theme.breakpoints.up('md')]: {
      minWidth: '354px',
      maxWidth: '354px',
    },
  },
  '& .scroll-scrum-item': {
    height: 'auto !important',
  },
}));

export default AppsContent;

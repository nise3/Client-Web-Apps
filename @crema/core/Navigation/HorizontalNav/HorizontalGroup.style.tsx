import {styled} from '@mui/material/styles';
import {Manager} from 'react-popper';
import {Fonts} from '../../../../shared/constants/AppEnums';

const PREFIX = 'HorizontalGroup';

export const classes = {
  root: `${PREFIX}-root`,
  children: `${PREFIX}-children`,
  popper: `${PREFIX}-popper`,
  popperClose: `${PREFIX}-popperClose`,
  pl0: `${PREFIX}-pl0`,
  fontBold: `${PREFIX}-fontBold`,
  ml2: `${PREFIX}-ml2`,
  textLg: `${PREFIX}-textLg`,
};

export const StyledManager = styled(Manager)(({theme}) => {
  return {
    [`& .${classes.root}`]: {
      color: theme.palette.secondary.contrastText + '!important',
      '&.active, &.active:hover, &.active:focus': {
        backgroundColor: theme.palette.primary.main + '!important',
        color: theme.palette.secondary.contrastText + '!important',
      },
      '& .list-item-text': {
        padding: '0 0 0 16px',
      },
      '&.level-0': {
        height: 48,
        borderRadius: 4,
        '&:hover': {
          background: 'transparent',
        },
      },
      '&.dense': {
        padding: '8px 12px 8px 12px',
        minHeight: 40,
        '&.level-0': {
          height: 44,
        },
        '& .list-item-text': {
          padding: '0 0 0 8px',
        },
      },
    },
    [`& .${classes.children}`]: {},
    [`& .${classes.popper}`]: {
      zIndex: 999,
    },
    [`& .${classes.popperClose}`]: {
      pointerEvents: 'none',
    },
    [`& .${classes.pl0}`]: {
      paddingLeft: 0,
    },
    [`& .${classes.fontBold}`]: {
      fontWeight: Fonts.MEDIUM,
    },
    [`& .${classes.ml2}`]: {
      marginLeft: 8,
    },
    [`& .${classes.textLg}`]: {
      fontSize: 18,
    },
  };
});

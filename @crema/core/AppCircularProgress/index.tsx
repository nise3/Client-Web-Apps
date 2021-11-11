import React from 'react';
import { styled } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import ProtoTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import {Fonts} from '../../../shared/constants/AppEnums';
import {CremaTheme} from '../../../redux/types/AppContextPropsType';

const PREFIX = 'AppCircularProgress';

const classes = {
  root: `${PREFIX}-root`,
  circularProgressRoot: `${PREFIX}-circularProgressRoot`,
  circularProgressPrimary: `${PREFIX}-circularProgressPrimary`,
  centerContent: `${PREFIX}-centerContent`,
  circle: `${PREFIX}-circle`
};

const StyledBox = styled(Box)((
  {
    theme: CremaTheme
  }
) => ({
  [`&.${classes.root}`]: {
    position: 'relative',
    minWidth: (props: {
      pathColor: string;
      activeColor: string;
      minWidth: number;
      maxWidth: number;
    }) => props.minWidth,
    maxWidth: (props: {
      pathColor: string;
      activeColor: string;
      minWidth: number;
      maxWidth: number;
    }) => props.maxWidth,
    margin: '0 auto',
  },

  [`& .${classes.circularProgressRoot}`]: (props: any) => ({
    color: props.pathColor,
    width: '100% !important',
    height: '100% !important',
  }),

  [`& .${classes.circularProgressPrimary}`]: (props: any) => ({
    color: props.activeColor,
    animationDuration: '550ms',
    position: 'absolute',
    left: theme.direction === 'rtl' ? -2 : 2,
    top: -2,
    width: '100% !important',
    height: '100% !important',
  }),

  [`& .${classes.centerContent}`]: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    zIndex: 3,
    fontWeight: Fonts.EXTRA_BOLD,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  [`& .${classes.circle}`]: {
    strokeLinecap: 'round',
  }
}));

interface AppCircularProgressProps {
  pathColor?: string;
  activeColor?: string;
  value: number;
  centerNode?: any;
  minWidth?: number;
  maxWidth?: number;
  hidePercentage?: boolean;
  valueStyle?: any;
  thickness?: number;
  props?: any;
}

const AppCircularProgress: React.FC<AppCircularProgressProps> = ({
  value,
  centerNode,
  valueStyle,
  hidePercentage = false,
  minWidth = 130,
  maxWidth = 200,
  pathColor = '#d6d6d6',
  activeColor = '#23fa23',
  thickness = 10,
  ...props
}) => {

    pathColor,
    activeColor,
    minWidth,
    maxWidth,
  });

  return (
    <StyledBox className={classes.root}>
      <Box position='relative'>
        <CircularProgress
          variant="determinate"
          value={100}
          className={classes.circularProgressRoot}
          thickness={thickness}
          {...props}
        />
        <CircularProgress
          className={classes.circularProgressPrimary}
          variant="determinate"
          value={value}
          thickness={thickness}
          classes={{
            circle: classes.circle,
          }}
          {...props}
        />
      </Box>
      <Box className={classes.centerContent}>
        {centerNode}
        {hidePercentage ? null : (
          <Box
            fontSize={30}
            fontWeight={500}
            color='secondary.main'
            style={valueStyle}>
            {value}%
          </Box>
        )}
      </Box>
    </StyledBox>
  );
};
export default AppCircularProgress;
AppCircularProgress.prototype = {
  hidePercentage: ProtoTypes.bool,
  pathColor: ProtoTypes.string,
  activeColor: ProtoTypes.string,
  value: ProtoTypes.number,
  thickness: ProtoTypes.number,
  valueStyle: ProtoTypes.object,
};

AppCircularProgress.defaultProps = {
  hidePercentage: false,
  minWidth: 130,
  maxWidth: 200,
  pathColor: '#d6d6d6',
  activeColor: '#23fa23',
  thickness: 10,
};

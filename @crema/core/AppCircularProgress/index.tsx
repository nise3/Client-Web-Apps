import React from 'react';
import {styled} from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import {Fonts} from '../../../shared/constants/AppEnums';

const PREFIX = 'AppCircularProgress';

const classes = {
  circularProgressRoot: `${PREFIX}-circularProgressRoot`,
  circularProgressPrimary: `${PREFIX}-circularProgressPrimary`,
  centerContent: `${PREFIX}-centerContent`,
  circle: `${PREFIX}-circle`,
};

const StyledBox = styled(Box)(({theme}) => ({
  position: 'relative',
  minWidth: 130,
  maxWidth: 200,
  margin: '0 auto',

  [`& .${classes.circularProgressRoot}`]: {
    color: '#d6d6d6',
    width: '100% !important',
    height: '100% !important',
  },

  [`& .${classes.circularProgressPrimary}`]: {
    color: '#23fa23',
    animationDuration: '550ms',
    position: 'absolute',
    left: theme.direction === 'rtl' ? -2 : 2,
    top: -2,
    width: '100% !important',
    height: '100% !important',
  },

  [`& .${classes.centerContent}`]: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    zIndex: 3,
    fontWeight: Fonts.BOLD,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  [`& .${classes.circle}`]: {
    strokeLinecap: 'round',
  },
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
  return (
    <StyledBox>
      <Box position='relative'>
        <CircularProgress
          variant='determinate'
          value={100}
          className={classes.circularProgressRoot}
          thickness={thickness}
          {...props}
        />
        <CircularProgress
          className={classes.circularProgressPrimary}
          variant='determinate'
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

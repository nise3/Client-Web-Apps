import {EyeOutlined} from '@ant-design/icons';
import React from 'react';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles(() => {
  return {
    button: {
      color: "#009688"
    },
  };
});


interface Props {
  onClick: () => void;
}

const ReadButton = ({onClick}: Props) => {
  const classes = useStyles();
  return (
    <Button startIcon={<EyeOutlined />} onClick={onClick} className={classes.button}>
      Read
    </Button>
  );
};

export default ReadButton;

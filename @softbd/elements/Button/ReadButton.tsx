import React from 'react';
import Button from '@material-ui/core/Button';
import {PanoramaFishEye} from '@material-ui/icons';

interface Props {
  onClick: () => void;
}

const ReadButton = ({onClick, ...extra}: Props) => {
  return (
    <Button startIcon={<PanoramaFishEye />} onClick={onClick} {...extra}>
      Read
    </Button>
  );
};

export default ReadButton;

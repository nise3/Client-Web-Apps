import makeStyles from '@mui/styles/makeStyles';
import {Fonts} from '../../../../shared/constants/AppEnums';
import Grid from '@mui/material/Grid';
import FormLabel from '@mui/material/FormLabel';
import TextInputSkeleton from '../skeleton/TextInputSkeleton/TextInputSkeleton';
import {MessageFormatElement} from '@formatjs/icu-messageformat-parser';
import React from 'react';

const useStyles = makeStyles(() => {
  return {
    inputView: {
      fontWeight: Fonts.MEDIUM,
      fontSize: 14,
      width: '100%',
      minHeight: '40px',
      padding: '8px',
      lineHeight: 1.5,
      boxShadow: '0px 0px 3px #ddd',
      borderRadius: '0.25rem',
      marginTop: '8px',
      maxHeight: '150px',
      overflow: 'auto',
    },

    label: {
      fontWeight: Fonts.BOLD,
      fontSize: 14,
      marginBottom: '5px',
    },
  };
});

type Props = {
  label: string | MessageFormatElement[];
  value: string | React.ReactNode;
  isLoading?: boolean;
};

const DetailsInputView = ({label, value, isLoading}: Props) => {
  const classes = useStyles();

  return isLoading ? (
    <TextInputSkeleton />
  ) : (
    <Grid item xs={12}>
      <FormLabel className={classes.label}>{label}</FormLabel>
      <div className={classes.inputView}>{value}</div>
    </Grid>
  );
};

export default React.memo(DetailsInputView);

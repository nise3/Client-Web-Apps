import {makeStyles} from '@material-ui/core';
import {Fonts} from '../shared/constants/AppEnums';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import TextInputSkeleton from './elements/Skeleton/TextInputSkeleton';


const useStyles = makeStyles(() => {
  return {
    inputView: {
      fontWeight: Fonts.MEDIUM,
      fontSize: 16,
      width: '100%',
      minHeight: '40px',
      padding: '8px',
      lineHeight: 1.5,
      boxShadow: '0px 0px 3px #ddd',
      borderRadius: '0.25rem',
      marginTop: '8px',
    },

    label: {
      fontWeight: Fonts.BOLD,
      fontSize: 16,
      marginBottom: '5px',
    },
  };
});

type Props = {
  label: string;
  value: string;
  isLoading?: boolean;
}


const DetailsInputView = ({label, value, isLoading}: Props) => {
  const classes = useStyles();
  return (
    isLoading ? <TextInputSkeleton /> :
      <Grid item xs={12}>
        <FormLabel className={classes.label}>{label}</FormLabel>
        <div className={classes.inputView}>{value}</div>
      </Grid>
  );
};

export default DetailsInputView;
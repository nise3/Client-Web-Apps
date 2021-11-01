import {makeStyles} from '@mui/styles';
import {Theme} from '@mui/system';

const useFormatStyle = makeStyles((theme: Theme) => ({
  spanTag: {
    color: '#23860d',
    fontSize: '0.75rem',
    lineHeight: '1.66',
    letterSpacing: '0.03333em',
    textAlign: 'left',
    marginTop: '4px',
    marginRight: '14px',
    marginBottom: '0',
    marginLeft: '14px',
  },
}));

export default useFormatStyle;

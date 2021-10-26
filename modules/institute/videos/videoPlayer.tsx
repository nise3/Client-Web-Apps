import {makeStyles} from '@mui/styles';
import {CremaTheme} from '../../../redux/types/AppContextPropsType';

const useStyle = makeStyles((theme: CremaTheme) => ({
  frame: {
    [theme.breakpoints.down('md')]: {
      maxHeight: '280px',
    },
  },
}));

const VideoPlayer = ({url}: any) => {
  const classes = useStyle();
  return (
    <>
      <iframe
        width='100%'
        height='480'
        className={classes.frame}
        src={url}
        frameBorder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
        allowFullScreen
        title='Embedded youtube'
      />
    </>
  );
};

export default VideoPlayer;

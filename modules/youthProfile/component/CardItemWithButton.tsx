import {Box, Card} from '@mui/material';
import Image from 'next/image';
import {createStyles, makeStyles} from '@mui/styles';
import {BorderColor} from '@mui/icons-material';
import CardHeader from '../CardHeader';
import {useIntl} from 'react-intl';

const useStyles = makeStyles(() =>
  createStyles({
    image: {
      width: '100%',
      height: '200px',
    },
    buttons: {
      position: 'absolute',
      right: '5%',
      top: '4%',
      zIndex: 1,
      display: 'none',
    },
    box: {
      position: 'relative',
      '&:hover $buttons': {
        display: 'block !important'
      }
    },
  }),
);

const CardItem = (item: any, key: number, onClick: any) => {
  const classes = useStyles();
  const {messages} = useIntl();

  return (
    <Box mr={6} key={key}>
      <Card>
        <Box className={classes.box}>
          <div className={classes.buttons}>
            <CardHeader
              buttons={[
                {
                  label: messages['common.edit_btn'] as string,
                  icon: <BorderColor />,
                  onclick: () => onClick(key),
                },
              ]}
            />
          </div>
          <Image
            className={classes.image}
            src={item.img}
            alt='crema-logo'
            height={50}
            width={'100%'}
            layout={'responsive'}
          />
        </Box>
      </Card>
    </Box>
  );
};

export default CardItem;
